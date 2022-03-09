import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findByUserId(id);
  }

  @Get('byEmail/:email')
  async findOneByEmail(@Param('email') email: string) {
    const trimmedEmail = email.trim();
    const users = await (await this.userService.findAll()).toArray();
    for (const user of users) {
      if (user.email == trimmedEmail) {
        const detailedUser: any = await this.userService.findByUserId(
          user.userid,
        );
        for (const n in detailedUser.connections) {
          // Ad hoc censor
          detailedUser.connections[n].authToken = undefined;
          detailedUser.connections[n].profileId = undefined;
        }
        return detailedUser;
      }
    }
    return null;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
