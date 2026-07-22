'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';
import FriendsHeader from './FriendsHeader';
import FriendsData from './FriendsData';
import { useOnlineFriends } from '@/features/presence/hooks/useOnlineFriends';
import { useMemo } from 'react';

type FriendsProps = React.HTMLAttributes<HTMLElement>;

const Friends = ({ ...props }: FriendsProps) => {
	const [search] = useQueryState('search', { defaultValue: '' });
	const [status, setStatus] = useQueryState(
		'status',
		parseAsStringLiteral(['all', 'online', 'offline']).withDefault('all'),
	);

	const { onlineFriends, getFriendStatus } = useOnlineFriends();
	const friendIds = useMemo(() => [...onlineFriends.keys()], [onlineFriends]);
	const params = useMemo(
		() => ({
			search,
			status,
			friendIds,
		}),
		[search, status, friendIds],
	);

	return (
		<>
			<FriendsHeader setStatus={setStatus} params={params} {...props} />
			<FriendsData getFriendStatus={getFriendStatus} params={params} />
		</>
	);
};

export default Friends;
