import Kicker from '@/components/ui/kicker';
import { cn } from '@/libs/utils';
import { useTranslations } from 'next-intl';
import { ButtonsState } from '@/components/ui/buttons-state';
import { FriendRequestDirection } from '../../friend/api/get-requests';
import { UseRequestsParams } from '../types';
import { useRequestCount } from '../hooks/useRequestCount';

interface FriendRequestHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	params: UseRequestsParams;
	setDirection: (direction: FriendRequestDirection) => void;
}

const FriendRequestHeader = ({
	params,
	setDirection,
	className,
	...props
}: FriendRequestHeaderProps) => {
	const { data, isLoading, isError } = useRequestCount(params);
	const t = useTranslations('friend_page.requests');

	const { direction, search } = params;
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
			<ButtonsState
				value={direction}
				setValue={setDirection}
				buttons={[
					{ node: t('incoming_button'), value: 'incoming' },
					{ node: t('outgoing_button'), value: 'outgoing' },
				]}
			/>
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
