import {AuthMethod} from '@prisma/__generated__';

export class CreateUserDto {
	readonly email: string;
	readonly password: string;
	readonly name: string;
	readonly picture: string;
	readonly method: AuthMethod;
	readonly isVerified: boolean;
}
