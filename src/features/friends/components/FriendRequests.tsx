'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { FriendRequestsData } from './FriendRequestsData';
import FriendRequestHeader from './FriendRequestsHeader';

type FriendRequestsProps = React.HTMLAttributes<HTMLElement>;

const FriendRequests = ({ ...props }: FriendRequestsProps) => {
	const [direction, setDirection] = useQueryState(
		'direction',
		parseAsStringLiteral(['incoming', 'outgoing']).withDefault('incoming'),
	);

	return (
		<>
			<FriendRequestHeader
				direction={direction}
				setDirection={setDirection}
				{...props}
			/>
			<FriendRequestsData direction={direction} />
		</>
	);
};

export { FriendRequests };
