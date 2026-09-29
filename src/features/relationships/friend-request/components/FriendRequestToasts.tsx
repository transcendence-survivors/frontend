'use client';

import { BaseUser } from '@/features/user/type';
import Kicker from '@/components/ui/kicker';
import { UserIdentity } from '@/features/user/components/Identity/UserIdentity';
import { useTranslations } from 'next-intl';

interface FriendToastProps {
	user: BaseUser;
}

export const FriendRequestReceivedToast = ({ user }: FriendToastProps) => {
	const t = useTranslations('relationships.requests.toast');

	return (
		<div className='flex w-[300px] max-w-full flex-col items-center gap-3 px-4'>
			<UserIdentity
				className='w-full pt-4'
				avatar={{
					img: {
						src: user.avatarUrl ?? 'placeholder.png',
						alt: user.displayName,
					},
					size: 'lg',
				}}
				user={{
					displayName: user.displayName,
					username: user.username,
				}}
			/>
			<div className='w-full border-t border-t-border py-2'>
				<Kicker className='text-[8px]'>
					{t('received_displayname', { displayName: user.displayName })}
				</Kicker>
			</div>
		</div>
	);
};

export const FriendRequestAcceptedToast = ({ user }: FriendToastProps) => {
	const t = useTranslations('relationships.requests.toast');

	return (
		<div className='flex w-[300px] max-w-full flex-col items-center gap-3 px-4'>
			<UserIdentity
				className='w-full pt-4'
				avatar={{
					img: {
						src: user.avatarUrl ?? '',
						alt: user.displayName,
					},
					size: 'lg',
				}}
				user={{
					displayName: user.displayName,
					username: user.username,
				}}
			/>
			<div className='w-full border-t border-t-border py-2'>
				<Kicker className='text-[8px]'>
					{t('accepted_displayname', { displayName: user.displayName })}
				</Kicker>
			</div>
		</div>
	);
};
