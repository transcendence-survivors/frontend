'use client';

import { Spinner } from '@/components/ui/spinner';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { BlocksLoading } from './BlocksLoading';
import { BlockCard } from './BlockCard';
import { Error } from '../../components/error';
import { useBlocks, UseBlocksParams } from '../hooks/useBlocks';

interface BlocksDataProps extends React.HTMLAttributes<HTMLDivElement> {
	params: UseBlocksParams;
}

const BlocksData = ({ params }: BlocksDataProps) => {
	const t = useTranslations('relationships.blocked');
	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: '0px 0px 100px 0px',
	});
	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useBlocks(params);

	useEffect(() => {
		if (!inView) return;
		if (!hasNextPage) return;
		if (isFetchingNextPage) return;

		fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading) {
		return <BlocksLoading numberOfSkeletons={10} />;
	}
	if (isError || !data) {
		return <Error>{t('fetch_error')}</Error>;
	}

	const blocked = data.pages.flatMap((page) => page.data);
	return (
		<>
			{blocked.length === 0 ? (
				<Error className='text-muted-foreground'>
					{!params.search ? t('no_blocked') : t('no_blocked_search')}
				</Error>
			) : (
				<ul className='flex flex-col gap-2'>
					{blocked.map(({ id, blocked }) => (
						<li key={id}>
							<BlockCard user={blocked} params={params} />
						</li>
					))}
				</ul>
			)}
			{hasNextPage && (
				<div ref={ref} className='flex justify-center py-4'>
					{isFetchingNextPage && <Spinner className='size-6' />}
				</div>
			)}
			{!hasNextPage && blocked.length > 0 && (
				<div className='flex justify-center py-4 text-muted-foreground text-sm'>
					{t('no_more_blocked')}
				</div>
			)}
		</>
	);
};

export default BlocksData;
