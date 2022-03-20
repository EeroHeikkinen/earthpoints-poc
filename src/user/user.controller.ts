import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminOnlyGuard } from 'src/auth/admin-only.guard';
import { EmailContentTemplate } from 'src/email-template/entities/email-content-template.entity';
import { ApiOAuth2, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { PartialType } from '@nestjs/mapped-types';
import { platform } from 'os';
import { CreatePlatformConnectionDto } from 'src/platform-connection/dto/create-platform-connection.dto';
import { UserFromExternalPlatformDataDto } from './dto/from-external-platform-data.dto';
import { PlatformConnectionService } from 'src/platform-connection/platform-connection.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly platformConnectionService: PlatformConnectionService,
  ) {}

  @Post()
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOAuth2([])
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('fromExternalPlatformData')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOAuth2([])
  @ApiResponse({
    status: 200,
    type: User,
  })
  async userFromExternalPlatformData(
    @Body() body: UserFromExternalPlatformDataDto,
  ): Promise<User> {
    // Normalise emails to array
    const { emails, profile_id: profileId, platform } = body;

    let emailsArray = emails;
    if (!Array.isArray(emails)) {
      if (emails) {
        emailsArray = [emails as unknown as string];
      } else {
        emailsArray = [];
      }
    }

    const userid = await this.userService.findOrCreateUserByEmailOrPlatform({
      emails: emailsArray,
      profileId,
      platform,
      firstName: null,
    });

    await this.platformConnectionService.create({
      userid,
      profile_id: profileId,
      platform: platform,
      auth_token: body.auth_token,
      auth_expiration: body.auth_expiration,
      emails,
    });

    const user = await this.userService.findByUserId(userid);

    return user;
  }

  @Get(':id')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findByUserId(id);
  @ApiOAuth2([])
  @ApiResponse({
    status: 201,
    type: User,
  })
  }

  @Get('byEmail/:email')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOAuth2([])
  async findOneByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email.trim());

    if (user) {
      for (const n in user.connections) {
        // censor auth tokens
        user.connections[n].authToken = undefined;
      }
    }
    return user;
  }

  @Patch(':id')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOAuth2([])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOAuth2([])
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
