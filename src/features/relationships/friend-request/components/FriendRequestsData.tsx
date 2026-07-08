'use client';

import { Spinner } from '@/components/ui/spinner';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Error } from '../../components/error';
import { FriendRequestCard } from './FriendRequestCard';
import { useTranslations } from 'next-intl';
import { FriendRequestsLoading } from './FriendRequestsLoading';
import { useRequests } from '../hooks/useRequest';
import { UseRequestsParams } from '../types';

interface FriendRequestsProps extends React.HTMLAttributes<HTMLDivElement> {
	params: UseRequestsParams;
}

const FriendRequestsData = ({ params }: FriendRequestsProps) => {
	const t = useTranslations('relationships.requests');
	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: '0px 0px 100px 0px',
	});
	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useRequests(params);

	useEffect(() => {
		if (!inView) return;
		if (!hasNextPage) return;
		if (isFetchingNextPage) return;

		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const { direction, search } = params;

	if (isLoading) {
		return (
			<FriendRequestsLoading numberOfSkeletons={10} direction={params.direction} />
		);
	}
	if (isError || !data) {
		return <Error>{t('fetch_error')}</Error>;
	}

	const friends = data.pages.flatMap((page) => page.data);

	return (
		<>
			{friends.length === 0 ? (
				<Error className='text-muted-foreground'>
					{!search
						? direction === 'incoming'
							? t('no_incoming_requests')
							: t('no_outgoing_requests')
						: t(
								direction === 'incoming'
									? 'no_incoming_requests_search'
									: 'no_outgoing_requests_search',
							)}
				</Error>
			) : (
				<ul className='flex flex-col gap-2'>
					{friends.map(({ id, friend, since }) => (
						<li key={id}>
							<FriendRequestCard
								user={friend}
								since={since}
								params={params}
							/>
						</li>
					))}
				</ul>
			)}
			{hasNextPage && (
				<div ref={ref} className='flex justify-center py-4'>
					{isFetchingNextPage && <Spinner className='size-6' />}
				</div>
			)}
			{!hasNextPage && friends.length > 0 && (
				<div className='flex justify-center py-4 text-muted-foreground text-sm'>
					{t(
						direction === 'incoming'
							? 'no_more_incoming_requests'
							: 'no_more_outgoing_requests',
					)}
				</div>
			)}
		</>
	);
};

export { FriendRequestsData };
