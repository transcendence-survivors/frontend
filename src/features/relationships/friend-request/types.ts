import { CursorParams, CursorResponse } from '@/libs/api/helpers/types';
import { BaseFriendship } from '../types';

interface FriendRequest extends BaseFriendship {
	status: 'PENDING';
}

type FriendRequestOrderBy =
	| 'created-asc'
	| 'created-desc'
	| 'username-asc'
	| 'username-desc'
	| 'displayname-asc'
	| 'displayname-desc';

type FriendRequestDirection = 'incoming' | 'outgoing';

type GetFriendRequestsParams = CursorParams<FriendRequestOrderBy> & {
	direction: FriendRequestDirection;
};

type GetFriendRequests = CursorResponse<FriendRequest[]>;
type UseRequestsParams = Pick<GetFriendRequestsParams, 'direction' | 'search'>;

export type {
	GetFriendRequestsParams,
	GetFriendRequests,
	FriendRequestDirection,
	UseRequestsParams,
	FriendRequest,
};
