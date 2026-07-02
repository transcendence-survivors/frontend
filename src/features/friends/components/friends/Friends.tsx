'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';
import FriendsHeader from './FriendsHeader';
import FriendsData from './FriendsData';
import { useOnlineFriends } from '@/modules/websocket/stores/presence';

type FriendRequestsProps = React.HTMLAttributes<HTMLElement>;

const Friends = ({ ...props }: FriendRequestsProps) => {
	const [search] = useQueryState('search', { defaultValue: '' });
	const [status, setStatus] = useQueryState(
		'status',
		parseAsStringLiteral(['all', 'online', 'offline']).withDefault('all'),
	);

	const normalizedSearch = search.startsWith('@') ? search.slice(1) : search;
	const { onlineFriends, getFriendStatus } = useOnlineFriends();

	const friendIds = [...onlineFriends.keys()];

	return (
		<>
			<FriendsHeader
				friendIds={friendIds}
				search={normalizedSearch}
				status={status}
				setStatus={setStatus}
				{...props}
			/>
			<FriendsData
				getFriendStatus={getFriendStatus}
				params={{ search: normalizedSearch, status, friendIds }}
			/>
		</>
	);
};

export default Friends;
