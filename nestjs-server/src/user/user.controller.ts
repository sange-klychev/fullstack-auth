import {Controller, Get, HttpCode, HttpStatus, Param} from '@nestjs/common';

import {UserRole} from '../../prisma/__generated__';
import {Authorization} from '../auth/decorators/auth.decorator';
import {Authorized} from '../auth/decorators/authorized.decorator';

import {UserService} from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Get('profile')
	public async findProfile(@Authorized('id') id: string) {
		return this.userService.findById(id);
	}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Get('get/:id')
	public async findById(@Param('id') id: string) {
		return this.userService.findById(id);
	}
}
