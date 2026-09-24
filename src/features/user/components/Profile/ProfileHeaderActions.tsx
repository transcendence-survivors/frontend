'use client';

import { Button } from '@/components/ui/button';
import { useUser } from '@/features/auth/stores/session';
import { ChatDMButton } from '@/features/chat/components/ChatDMButton';
import { BlockAddButton } from '@/features/relationships/block/components/BlockAdd';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { useTranslations } from 'next-intl';
import { UserFacade } from '../../type';
import { cn } from '@/libs/utils';

interface ProfileHeaderActionProps extends React.HTMLAttributes<HTMLDivElement> {
	user: Pick<UserFacade, 'id' | 'displayName'>;
}

const ProfileHeaderActions = ({
	user: { id, displayName },
	className,
	...props
}: ProfileHeaderActionProps) => {
	const user = useUser();
	const t = useTranslations('profile');

	if (!user) return null;

	return (
		<div className={cn('flex items-center gap-x-2 ml-auto', className)} {...props}>
			{user.id === id && (
				<Button variant='default' size={'lg'} asChild>
					<I18nLink href='settingsProfile'>{t('edit.button')}</I18nLink>
				</Button>
			)}
			{user.id !== id && (
				<>
					<ChatDMButton targetUserId={id} />
					<BlockAddButton blockedId={id} blockedDisplayName={displayName} />
				</>
			)}
		</div>
	);
};

export default ProfileHeaderActions;
