import Kicker from '@/components/ui/kicker';
import FriendRequestDirection from './actions/FriendRequestDirection';
import { useRequestCount } from '../hooks/useRequestCount';
import { cn } from '@/libs/utils';

interface FriendRequestHeaderProps
	extends
		React.HTMLAttributes<HTMLDivElement>,
		React.ComponentProps<typeof FriendRequestDirection> {}

const FriendRequestHeader = ({
	direction,
	setDirection,
	className,
	...props
}: FriendRequestHeaderProps) => {
	const { data } = useRequestCount({ direction });

	return (
		<header
			className={cn('flex flex-col gap-2 items-center justify-center', className)}
			{...props}>
			<h2 className='text-2xl font-bold text-center sr-only'>Friend Requests</h2>

			<FriendRequestDirection direction={direction} setDirection={setDirection} />
			<Kicker className='mx-auto text-center'>
				{data?.count ?? 0} {direction === 'incoming' ? 'Incoming' : 'Outgoing'}{' '}
				Friend Requests
			</Kicker>
		</header>
	);
};

export default FriendRequestHeader;
