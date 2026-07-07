import { UserSchema } from './schemas/user.schema';

type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';
type User = Omit<UserSchema, 'password'> & {
	id: string;
	avatarUrl?: string;
	coverImageUrl?: string;
	role: UserRole;
};

type BaseUser = Pick<User, 'id' | 'username' | 'displayName' | 'avatarUrl'>;

type UserFacade = Pick<
	User,
	| 'id'
	| 'username'
	| 'displayName'
	| 'coverImageUrl'
	| 'avatarUrl'
	| 'birthdate'
	| 'bio'
>;

export type { User, UserRole, BaseUser, UserFacade };
export type { UserSchema, UserGender, UserLocale } from './schemas/user.schema';
