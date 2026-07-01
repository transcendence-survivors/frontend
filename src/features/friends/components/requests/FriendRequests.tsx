'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { FriendRequestsData } from './FriendRequestsData';
import FriendRequestHeader from './FriendRequestsHeader';

type FriendRequestsProps = React.HTMLAttributes<HTMLElement>;

const FriendRequests = ({ ...props }: FriendRequestsProps) => {
	const [search] = useQueryState('search', { defaultValue: '' });
	const [direction, setDirection] = useQueryState(
		'direction',
		parseAsStringLiteral(['incoming', 'outgoing']).withDefault('incoming'),
	);
	const normalizedSearch = search.startsWith('@') ? search.slice(1) : search;

	return (
		<>
			<FriendRequestHeader
				direction={direction}
				setDirection={setDirection}
				search={normalizedSearch}
				{...props}
			/>
			<FriendRequestsData direction={direction} search={normalizedSearch} />
		</>
	);
};

export { FriendRequests };
