import { UserSchema } from './schemas/user.schema';

type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';
type User = Omit<UserSchema, 'password'> & {
	id: string;
	role: UserRole;
	avatarUrl?: string;
	bannerUrl?: string;
};

type BaseUser = Pick<User, 'id' | 'username' | 'displayName' | 'avatarUrl'>;

export type { User, UserRole, BaseUser };
export type { UserSchema, UserGender, UserLocale } from './schemas/user.schema';
