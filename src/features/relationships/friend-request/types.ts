import { CursorParams, CursorResponse } from '@/libs/api/helpers/types';
import { BaseFriendship } from '../types';

interface FriendRequest extends BaseFriendship {
	status: 'PENDING';
}

type friendRequestOrderBy = 'createdAsc' | 'createdDesc';
type FriendRequestDirection = 'incoming' | 'outgoing';

type GetFriendRequestsParams = CursorParams<friendRequestOrderBy> & {
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
