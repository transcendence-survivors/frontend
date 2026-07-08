'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';
import FriendRequestHeader from './FriendRequestsHeader';
import { FriendRequestsData } from './FriendRequestsData';

type FriendRequestsProps = React.HTMLAttributes<HTMLElement>;

const FriendRequests = ({ ...props }: FriendRequestsProps) => {
	const [search] = useQueryState('search', { defaultValue: '' });
	const [direction, setDirection] = useQueryState(
		'direction',
		parseAsStringLiteral(['incoming', 'outgoing']).withDefault('incoming'),
	);
	const params = { direction, search };

	return (
		<>
			<FriendRequestHeader params={params} setDirection={setDirection} {...props} />
			<FriendRequestsData params={params} />
		</>
	);
};

export { FriendRequests };
