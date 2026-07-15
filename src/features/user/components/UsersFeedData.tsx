'use client';

import { Spinner } from '@/components/ui/spinner';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Error } from '@/features/relationships/components/error';
import { UsersLoading } from './UsersLoading';
import { useUsers, UseUsersParams } from '../hooks/useUsers';
import { useTranslations } from 'next-intl';
import { BaseUser } from '@/features/user/type';
import { cn } from '@/libs/utils';

export interface BaseUserCardProps {
	user: BaseUser;
	params: UseUsersParams;
}

interface UsersFeedProps<
	T extends BaseUserCardProps,
> extends React.HTMLAttributes<HTMLUListElement> {
	params: UseUsersParams;
	CardComponent: React.ComponentType<T>;
	extraCardProps?: Omit<T, 'user' | 'params'>;
}

const UsersFeedData = <T extends BaseUserCardProps>({
	params,
	CardComponent,
	extraCardProps,
	className,
	...props
}: UsersFeedProps<T>) => {
	const t = useTranslations('users');
	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: '0px 0px 100px 0px',
	});
	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useUsers(params);

	useEffect(() => {
		if (!inView) return;
		if (!hasNextPage) return;
		if (isFetchingNextPage) return;

		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const { search, feedParams } = params;
	const feed = feedParams?.feed;

	if (isLoading) {
		return <UsersLoading numberOfSkeletons={20} />;
	}
	if (isError || !data) {
		return <Error>{t('fetch_error')}</Error>;
	}

	const users = data.pages.flatMap((page) => page.data);
	return (
		<>
			{users.length === 0 ? (
				<Error className='text-muted-foreground py-1 '>
					{feed === 'not-friends' &&
						t(search ? 'no_befriended_users_search' : 'no_befriended_users')}
					{feed !== 'not-friends' && t(search ? 'no_users_search' : 'no_users')}
				</Error>
			) : (
				<ul className={cn('flex flex-col gap-2', className)} {...props}>
					{users.map((user) => (
						<li key={user.id}>
							<CardComponent
								{...(extraCardProps as T)}
								user={user}
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
			{!hasNextPage && users.length > 0 && (
				<div className='flex justify-center py-4 text-muted-foreground text-sm'>
					{t(
						feed === 'not-friends'
							? 'no_more_befriended_users'
							: 'no_more_users',
					)}
				</div>
			)}
		</>
	);
};

export { UsersFeedData };
