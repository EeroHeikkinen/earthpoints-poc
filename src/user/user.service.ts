import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PlatformConnectionService } from 'src/platform-connection/platform-connection.service';
import { UserRepository } from './user.repository';
import { EmailTemplateService } from 'src/email-template/email-template.service';
import { PointEventService } from 'src/point-event/point-event.service';
import { QueueService } from 'src/queue/queue.service';
import { User } from './entities/user.entity';
import { use } from 'passport';
import { UserOwnedListsV2Paginator } from 'twitter-api-v2';
import { types } from 'cassandra-driver';

@Injectable()
export class UserService {
  async findOrCreateUserByEmailOrPlatform({
    emails,
    profileId,
    firstName,
    platform,
  }) {
    const emailValues = emails.map((v: any) => v.value.trim().toLowerCase());

    let userid;
    const existingCredentials =
      await this.platformConnectionService.findByProfileIdAndPlatform(
        profileId,
        platform,
      );

    if (existingCredentials.length) {
      userid = existingCredentials[0].userid;
      return userid;
    }

    if (emailValues.length) {
      // Check out if we already have user with the same email
      const existingUsers = await this.findByEmails(emailValues);
      if (existingUsers.length > 1) {
        console.error(
          'Found multiple users when searching with emails: ' + emailValues,
        );
      }
      if (existingUsers.length > 0) {
        return existingUsers[0].userid;
      }
    }

    userid = types.Uuid.random().toString();

    await this.create({
      userid,
      firstName,
      email: emailValues.length ? emailValues[0] : undefined,
      emails: emailValues,
    });

    return userid;
  }

  async addEmailsToUser(userid: string, emails: any) {
    if (!emails.length) {
      return;
    }
    const user = await this.findByUserId(userid);
    if (!user) {
      console.error('Tried to add emails to non-existent user ' + userid);
      return;
    }

    const emailValues = emails.flatMap((email) => {
      return email.value;
    });

    let email;
    if (emailValues && emailValues[0]) {
      email = emailValues[0].toLowerCase().trim();
    }

    // Save email to user if not yet set
    if (email) {
      if (!user.email) {
        await this.update({ userid, email });
      }
      const userHasAllEmails = emailValues.every((v) =>
        user.emails.includes(v),
      );

      if (!userHasAllEmails) {
        await this.update({
          userid,
          emails: user.emails.concat(emailValues),
        });
      }
    }
  }

  addEmailToUser(emailValues: any) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private readonly platformConnectionService: PlatformConnectionService,
    private readonly userRepository: UserRepository,
    private readonly emailTemplateService: EmailTemplateService,
    private readonly pointEventService: PointEventService,
    private readonly queueService: QueueService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.createdAt) {
      createUserDto.createdAt = new Date();
    }
    const createdUser = await this.userRepository.create(createUserDto);
    this.queueService.addUserIdToQueue(createUserDto.userid, new Date());
    return createdUser;
  }

  async findByEmails(emails: string[]): Promise<User[]> {
    const trimmedEmails = emails.map((v) => v.trim().toLowerCase());
    const users = await (await this.findAll()).toArray();
    const foundUsers = [];
    if (!(emails.length > 0)) {
      return foundUsers;
    }

    for (const user of users) {
      let userEmailsIncludeSearched;
      if (user.emails) {
        userEmailsIncludeSearched = trimmedEmails.every((v) =>
          user.emails.includes(v),
        );
      }
      if (user.email == trimmedEmails[0] || userEmailsIncludeSearched) {
        const detailedUser: any = await this.findByUserId(user.userid);
        foundUsers.push(detailedUser);
      }
    }
    return foundUsers;
  }

  async findByEmail(email: string): Promise<User | null> {
    const trimmedEmail = email.trim().toLowerCase();
    const users = await (await this.findAll()).toArray();
    for (const user of users) {
      if (
        user.email == trimmedEmail ||
        (user.emails && user.emails.includes(trimmedEmail))
      ) {
        const detailedUser: any = await this.findByUserId(user.userid);
        return detailedUser;
      }
    }
    return null;
  }

  async findByUserId(userid: string) {
    const user = await this.userRepository.get(userid);
    if (!user) {
      return undefined;
    }
    user.events = await this.pointEventService.findAllForUser(userid);
    user.connections = await this.platformConnectionService.findByUserId(
      userid,
    );
    user.points = user.events
      .map((event) => event.points)
      .reduce((previous, current) => previous + current, 0);

    return user;
  }

  async findAll() {
    const users = await this.userRepository.getAll();

    return users;
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async syncPoints(userid) {
    await this.platformConnectionService.syncAllForUser(userid);
  }

  async triggerScheduledEmails(userid: string, currentCallDate: Date) {
    const user = await this.findByUserId(userid);
    this.emailTemplateService.processScheduled(user, currentCallDate);
  }
}
