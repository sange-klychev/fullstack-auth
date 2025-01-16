import {Injectable, NotFoundException} from '@nestjs/common';
import {hash} from 'argon2';

import {PrismaService} from '../prisma/prisma.service';

import {CreateUserDto} from './dto/create-user.dto';

@Injectable()
export class UserService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findById(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			},
			include: {accounts: true}
		});

		if (!user) {
			throw new NotFoundException(
				'Пользователь не найден. Пожалуйста, проверьте введенные данные'
			);
		}

		return user;
	}

	public async findByEmail(email: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				email
			},
			include: {accounts: true}
		});

		return user;
	}

	public async create(dto: CreateUserDto) {
		const user = await this.prismaService.user.create({
			data: {
				...dto,
				password: dto.password ? await hash(dto.password) : ''
			},
			include: {accounts: true}
		});

		return user;
	}
}
