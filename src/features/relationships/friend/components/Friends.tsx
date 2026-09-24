'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';
import FriendsHeader from './FriendsHeader';
import FriendsData from './FriendsData';
import { useOnlineFriends } from '@/features/presence/hooks/useOnlineFriends';
import { useMemo } from 'react';
import { UseFriendsParams } from '../hooks/useFriends';

type FriendsProps = React.HTMLAttributes<HTMLElement>;

const statusMap = {
	all: 'ALL',
	online: 'IN',
	offline: 'NOT_IN',
} as const satisfies Record<string, UseFriendsParams['status']>;

const urlKeys = Object.keys(statusMap) as Array<keyof typeof statusMap>;

const Friends = ({ ...props }: FriendsProps) => {
	const [search] = useQueryState('search', { defaultValue: '' });
	const [status, setStatus] = useQueryState(
		'status',
		parseAsStringLiteral(urlKeys).withDefault('all'),
	);

	const { onlineFriends, getFriendStatus } = useOnlineFriends();
	const friendIds = useMemo(() => [...onlineFriends.keys()], [onlineFriends]);
	const params = useMemo(
		() => ({
			search,
			status: statusMap[status],
			friendIds,
		}),
		[search, status, friendIds],
	);

	return (
		<>
			<FriendsHeader
				setStatus={setStatus}
				params={params}
				value={status}
				{...props}
			/>
			<FriendsData getFriendStatus={getFriendStatus} params={params} />
		</>
	);
};

export default Friends;
