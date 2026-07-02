import Kicker from '@/components/ui/kicker';
import { cn } from '@/libs/utils';
import { useTranslations } from 'next-intl';
import { useFriendsCount } from '../../hooks/friends/useFriendCount';
import { ButtonsState } from '@/components/ui/buttons-state';
import { FriendStatus } from '../../api/get-friends';

interface FriendRequestHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	search?: string;
	friendIds: string[];
	status: FriendStatus;
	setStatus: (status: FriendStatus) => void;
}

const FriendRequestHeader = ({
	search,
	friendIds,
	status,
	setStatus,
	className,
	...props
}: FriendRequestHeaderProps) => {
	const { data, isLoading, isError } = useFriendsCount({ search, status, friendIds });
	const t = useTranslations('friend_page.friends');
	const count = data?.count ?? 0;

	return (
		<header
			className={cn('flex flex-col gap-2 items-center justify-center', className)}
			{...props}>
			<h2 className='text-2xl font-bold text-center sr-only'>{t('title')}</h2>
			<ButtonsState
				value={status}
				setValue={setStatus}
				buttons={[
					{ node: t('all_button'), value: 'all' },
					{ node: t('online_button'), value: 'online' },
					{ node: t('offline_button'), value: 'offline' },
				]}
			/>
			{!isError &&
				(isLoading ? (
					<div className='bg-muted h-4 w-30 block animate-pulse mx-auto' />
				) : (
					<Kicker className='mx-auto text-center'>
						{t(search ? 'count_search' : 'count', { count })}
					</Kicker>
				))}
		</header>
	);
};

export default FriendRequestHeader;
