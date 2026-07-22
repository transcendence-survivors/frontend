'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';
import FriendRequestHeader from './FriendRequestsHeader';
import { FriendRequestsData } from './FriendRequestsData';
import { useMemo } from 'react';

type FriendRequestsProps = React.HTMLAttributes<HTMLElement>;

const FriendRequests = ({ ...props }: FriendRequestsProps) => {
	const [search] = useQueryState('search', { defaultValue: '' });
	const [direction, setDirection] = useQueryState(
		'direction',
		parseAsStringLiteral(['incoming', 'outgoing']).withDefault('incoming'),
	);
	const params = useMemo(
		() => ({
			search,
			direction,
		}),
		[search, direction],
	);

	return (
		<>
			<FriendRequestHeader params={params} setDirection={setDirection} {...props} />
			<FriendRequestsData params={params} />
		</>
	);
};

export { FriendRequests };
