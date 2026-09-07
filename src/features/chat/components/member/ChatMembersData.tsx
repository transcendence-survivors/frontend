'use client';

import { Spinner } from '@/components/ui/spinner';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Error } from '@/features/relationships/components/error';
import { useTranslations } from 'next-intl';
import { cn } from '@/libs/utils';
import { LoadingList } from '@/components/ui/loading-list';
import { ChatMemberCard, ChatMemberCardSkeleton } from './ChatMemberCard';
import { useChatMembers, UseChatMembersParams } from '../../hooks/member/useChatMembers';
import { ChatMemberRole } from '../../types/member';

interface ChatMemberProps extends React.HTMLAttributes<HTMLDivElement> {
	params: UseChatMembersParams;
	currentUserId?: string;
	currentUserRole?: ChatMemberRole;
	onKick?: (memberId: string) => void;
}

const ChatMembersData = ({
	params,
	currentUserId,
	currentUserRole,
	onKick,
	className,
	...props
}: ChatMemberProps) => {
	const t = useTranslations('chat.members');
	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: '0px 0px 100px 0px',
	});
	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useChatMembers(params);

	useEffect(() => {
		if (!inView) return;
		if (!hasNextPage) return;
		if (isFetchingNextPage) return;

		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const { search } = params;

	if (isLoading) {
		return (
			<LoadingList
				numberOfSkeletons={10}
				className={className}
				SkeletonComponent={ChatMemberCardSkeleton}
			/>
		);
	}

	if (isError || !data) {
		return <Error>{t('fetch_error')}</Error>;
	}

	const members = data.pages.flatMap((page) => page.data);

	return (
		<div className={cn('flex flex-col flex-1 overflow-auto', className)} {...props}>
			{members.length === 0 ? (
				<Error className='text-muted-foreground py-4'>
					{t(search ? 'no_members_search' : 'no_members')}
				</Error>
			) : (
				<ul className={'flex flex-col'}>
					{members.map((member) => (
						<li key={member.id}>
							<ChatMemberCard
								member={member}
								currentUserId={currentUserId}
								currentUserRole={currentUserRole}
								onKick={onKick}
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
			{!hasNextPage && members.length > 0 && (
				<div className='flex justify-center py-4 text-muted-foreground text-sm'>
					{t('no_more_members')}
				</div>
			)}
		</div>
	);
};

export default ChatMembersData;
