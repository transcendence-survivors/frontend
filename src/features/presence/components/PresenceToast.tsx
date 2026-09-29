'use client';

import { BaseUser } from '@/features/user/type';
import { PresenceStatus } from '../types/status';
import { UserIdentity } from '@/features/user/components/Identity/UserIdentity';
import Kicker from '@/components/ui/kicker';
import { useTranslations } from 'next-intl';

type FriendConnectedToastProps = BaseUser & {
	status: PresenceStatus;
};

export const PresenceToast = ({
	avatarUrl,
	username,
	displayName,
	status,
}: FriendConnectedToastProps) => {
	const t = useTranslations('presence');

	return (
		<div className='flex flex-col w-[300px] h-auto max-w-full items-center gap-3 px-4'>
			<UserIdentity
				className='pt-4 w-full'
				avatar={{
					img: {
						src: avatarUrl ?? '',
						alt: displayName,
					},
					size: 'lg',
					badgeState: status,
				}}
				user={{
					displayName: displayName,
					username: username,
				}}
			/>
			<div className='py-2 w-full border-t border-t-border'>
				<Kicker className='text-[8px]'>
					{t('just_connected_displayname', { displayName })}
				</Kicker>
			</div>
		</div>
	);
};
