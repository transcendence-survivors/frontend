'use client';

import { Button } from '@/components/ui/button';
import { UserRoundPlus } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { useRequestSend } from '../../hooks/useRequestSend';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from 'next-intl';
import { BaseUser } from '@/features/user/type';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface FriendRequestSendProps {
	user: Pick<BaseUser, 'id' | 'displayName'>;
	label?: string;
}

const FriendRequestSend = ({
	user: { id, displayName },
	label,
}: FriendRequestSendProps) => {
	const t = useTranslations('relationships.add');

	const aria_label = t('aria_label');
	const { mutate, isPending, isError, isSuccess } = useRequestSend({
		userId: id,
		failureMessage: t('failed'),
		acceptedMessage: t('success_accepted_displayname', { displayName }),
		pendingMessage: t('success_pending_displayname', { displayName }),
	});

	const onClick = () => mutate();

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					onClick={onClick}
					disabled={isPending || isError || isSuccess}
					variant={'default'}
					aria-label={aria_label}
					aria-invalid={isError}>
					{isPending ? (
						<Spinner className='size-3.5' />
					) : (
						<UserRoundPlus className='size-3.5' />
					)}
					{label && <span className='hidden sm:block'>{label}</span>}
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>{aria_label}</p>
			</TooltipContent>
		</Tooltip>
	);
};

const FriendRequestSendSkeleton = () => {
	return <Skeleton className={`w-9 sm:w-23 h-9 rounded-md`} />;
};

export { FriendRequestSend, FriendRequestSendSkeleton };
