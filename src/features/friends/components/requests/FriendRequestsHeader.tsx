import Kicker from '@/components/ui/kicker';
import FriendRequestDirection from '../actions/FriendRequestDirection';
import { useRequestCount } from '../../hooks/useRequestCount';
import { cn } from '@/libs/utils';
import { useTranslations } from 'next-intl';

interface FriendRequestHeaderProps
	extends
		React.HTMLAttributes<HTMLDivElement>,
		React.ComponentProps<typeof FriendRequestDirection> {
	search?: string;
}

const FriendRequestHeader = ({
	direction,
	setDirection,
	search,
	className,
	...props
}: FriendRequestHeaderProps) => {
	const { data, isLoading, isError } = useRequestCount({ direction, search });
	const t = useTranslations('friend_page.requests');

	const count = data?.count ?? 0;
	const getFriendRequestText = () => {
		if (search)
			return t(
				direction === 'incoming'
					? 'incoming_count_search'
					: 'outgoing_count_search',
				{ count },
			);
		return t(direction === 'incoming' ? 'incoming_count' : 'outgoing_count', {
			count,
		});
	};

	return (
		<header
			className={cn('flex flex-col gap-2 items-center justify-center', className)}
			{...props}>
			<h2 className='text-2xl font-bold text-center sr-only'>{t('title')}</h2>
			<FriendRequestDirection direction={direction} setDirection={setDirection} />
			{!isError &&
				(isLoading ? (
					<div className='bg-muted h-4 w-30 block animate-pulse mx-auto' />
				) : (
					<Kicker className='mx-auto text-center'>
						{getFriendRequestText()}
					</Kicker>
				))}
		</header>
	);
};

export default FriendRequestHeader;
