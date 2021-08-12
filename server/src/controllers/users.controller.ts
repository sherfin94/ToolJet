import { Body, Controller, Post, Patch, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) { }

  @Post('set_password_from_token')
  async create(@Request() req) {
    const result = await this.usersService.setupAccountFromInvitationToken(req.body);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async update(@Request() req, @Body() body) {
    const {firstName, lastName, password } = body
    const result = await this.usersService.update(req.user.id, { firstName, lastName, password });
    await req.user.reload()
    return {
      first_name: req.user.firstName,
      last_name: req.user.lastName
    };
  }
}
