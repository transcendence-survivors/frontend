import { CursorParams, CursorResponse } from '@/libs/api/helpers/types';
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
type UserOrderBy = 'username-asc' | 'username-desc' | 'created-asc' | 'created-desc';

type GetUserFeedEnum = 'friends' | 'not-friends' | 'all-not-blocked';

type GetUsersParams = CursorParams<UserOrderBy>;
type GetUsersFeedParams = GetUsersParams & {
	feed: GetUserFeedEnum;
};
type GetUsers = CursorResponse<BaseUser[]>;

type GetUserFeedParams =
	| {
			feedParams: {
				feed: GetUserFeedEnum;
			};
	  }
	| {
			feedParams?: never;
	  };

export type {
	User,
	UserRole,
	BaseUser,
	UserFacade,
	UserOrderBy,
	GetUserFeedEnum,
	GetUsers,
	GetUsersParams,
	GetUserFeedParams,
	GetUsersFeedParams,
};
export type { UserSchema, UserGender, UserLocale } from './schemas/user.schema';
