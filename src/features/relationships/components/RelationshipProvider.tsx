'use client';

import React from 'react';
import { ShieldAlert, UserX, ArrowLeft } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { useRelationshipStatus } from '../hooks/useRelationshipStatus';
import { RelationshipStatus } from '../types';
import { BlockDelete } from '../block/components/BlockDelete';
import { Unban } from '@/components/icons/unban';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { BaseUser } from '@/features/user/type';

interface RelationshipProviderProps {
	username: string;
	children: React.ReactNode;
}

export const RelationshipProvider = ({
	username,
	children,
}: RelationshipProviderProps) => {
	const { data, isLoading, isError } = useRelationshipStatus(username);

	if (isLoading) {
		return (
			<div className='max-w-3xl mx-auto p-8 h-main flex items-center justify-center'>
				<Spinner className='size-8' />
			</div>
		);
	}
	if (isError || !data) return <>{children}</>;

	if (
		data.status === RelationshipStatus.BLOCKED_BY_YOU ||
		data.status === RelationshipStatus.MUTUAL_BLOCK ||
		data.status === RelationshipStatus.BLOCKED_BY_THEM
	) {
		return (
			<main className='max-w-3xl mx-auto p-8 h-main flex items-center justify-center'>
				{data.status == RelationshipStatus.BLOCKED_BY_THEM ? (
					<BlockedByThemCard />
				) : (
					<BlockedByYouCard
						user={{
							displayName: data.displayName,
							id: data.id,
							username: data.username,
						}}
					/>
				)}
			</main>
		);
	}

	return <>{children}</>;
};

interface BlockedByYouCardProps {
	user: Omit<BaseUser, 'avatarUrl'>;
}

const BlockedByYouCard = ({ user }: BlockedByYouCardProps) => {
	const router = useRouter();
	const t = useTranslations();

	return (
		<div className='flex min-h-[360px] w-full flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center text-card-foreground shadow-xs'>
			<div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive'>
				<UserX className='h-7 w-7' />
			</div>

			<h1 className='text-lg font-semibold tracking-tight'>
				{t('relationships.gate.blocked_title')}
			</h1>

			<p className='mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground'>
				{t('relationships.gate.blocked_description')}
			</p>

			<div className='mt-6 flex items-center gap-3'>
				<Button
					variant='outline'
					onClick={() => router.back()}
					className='gap-2 rounded-xl'>
					<ArrowLeft className='h-4 w-4' />
					{t('common.back')}
				</Button>

				<BlockDelete user={user}>
					<Button variant='default' className='gap-2 rounded-xl'>
						<Unban className='size-3.5' />
						{t('relationships.blocked.remove.tooltip')}
					</Button>
				</BlockDelete>
			</div>
		</div>
	);
};

const BlockedByThemCard = () => {
	const t = useTranslations('relationships.gate');

	return (
		<div className='flex min-h-[360px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center'>
			<div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground'>
				<ShieldAlert className='h-7 w-7' />
			</div>
			<h1 className='text-lg font-semibold tracking-tight'>
				{t('unavailable_title')}
			</h1>
			<p className='mt-1.5 max-w-xs text-sm text-muted-foreground'>
				{t('unavailable_description')}
			</p>
		</div>
	);
};
