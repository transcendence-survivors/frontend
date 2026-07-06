import { CursorParams, CursorResponse } from '@/libs/api/helpers/types';
import { BaseFriendship } from '../types';

interface Friend extends BaseFriendship {
	status: 'ACCEPTED';
}

type FriendStatus = 'all' | 'online' | 'offline';
type FriendOrderBy =
	| 'updated-asc'
	| 'updated-desc'
	| 'username-asc'
	| 'username-desc'
	| 'displayname-asc'
	| 'displayname-desc';

type IdsParams = {
	friendIds: string[];
	status: FriendStatus;
};

type GetFriendsParams = CursorParams<FriendOrderBy>;
type GetFriendIdsParams = GetFriendsParams & IdsParams;
type GetFriendsResponse = CursorResponse<Friend[]>;

type GetFriendsCountParams = Pick<GetFriendsParams, 'search'>;
type GetFriendIdsCountParams = GetFriendsCountParams & IdsParams;
type GetFriendsCountResponse = { count: number };

export type {
	Friend,
	FriendStatus,
	GetFriendIdsParams,
	GetFriendsParams,
	GetFriendsResponse,
	GetFriendsCountParams,
	GetFriendsCountResponse,
	GetFriendIdsCountParams,
};
