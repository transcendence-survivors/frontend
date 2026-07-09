'use client';

import RoundedLight from '@/components/icons/RoundedLight';
import { usePresenceState } from '../hooks/usePresenceState';
import { useTranslations } from 'next-intl';

const PresenceCounter = () => {
	const { globalOnlineCount, onlineFriendsCount } = usePresenceState();
	const t = useTranslations();

	return (
		<ul className='flex flex-col gap-1 text-xs text-muted-foreground font-light font-mono tracking-tighter'>
			<li className='flex items-center gap-2'>
				<RoundedLight size='xs' data-active={globalOnlineCount > 0} />
				<span>{t('presence.count_online', { count: globalOnlineCount })}</span>
			</li>
			<li className='flex items-center gap-2'>
				<RoundedLight size='xs' data-active={onlineFriendsCount > 0} />
				<span>
					{t('presence.count_online_friends', { count: onlineFriendsCount })}
				</span>
			</li>
		</ul>
	);
};

export default PresenceCounter;
