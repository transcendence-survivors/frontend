'use client';

import { Button } from '@/components/ui/button';
import { useUser } from '@/features/auth/stores/session';
import { ChatDMButton } from '@/features/chat/components/ChatDMButton';
import { BlockAddButton } from '@/features/relationships/block/components/BlockAdd';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { useTranslations } from 'next-intl';
import { UserFacade } from '../../type';
import { cn } from '@/libs/utils';
import { useRelationshipStatus } from '@/features/relationships/hooks/useRelationshipStatus';
import { RelationshipStatus } from '@/features/relationships/types';
import { FriendRequestDelete } from '@/features/relationships/friend-request/components/actions/FriendRequestDelete';
import { FriendDeleteButton } from '@/features/relationships/friend/components/FriendsDelete';
import { FriendRequestAccept } from '@/features/relationships/friend-request/components/actions/FriendRequestAccept';
import { FriendRequestSend } from '@/features/relationships/friend-request/components/actions/FriendRequestSend';

interface ProfileHeaderActionProps extends React.HTMLAttributes<HTMLDivElement> {
	user: Pick<UserFacade, 'id' | 'displayName' | 'username'>;
}

export const ProfileHeaderActions = ({
	user: { id, displayName, username },
	className,
	...props
}: ProfileHeaderActionProps) => {
	const currentUser = useUser();
	const { data: relationship, isLoading } = useRelationshipStatus(username);
	const t = useTranslations('profile');

	if (!currentUser) return null;

	if (currentUser.id === id) {
		return (
			<div
				className={cn('ml-auto flex items-center gap-x-2', className)}
				{...props}>
				<Button variant='default' size='lg' asChild>
					<I18nLink href='settingsProfile'>{t('edit.button')}</I18nLink>
				</Button>
			</div>
		);
	}

	if (isLoading || relationship?.status === RelationshipStatus.BLOCKED_BY_THEM) {
		return null;
	}

	const status = relationship?.status ?? RelationshipStatus.NONE;
	console.log('ProfileHeaderActions status:', status);

	const user = { id, displayName, username };
	return (
		<div className={cn('ml-auto flex items-center gap-x-2', className)} {...props}>
			<ChatDMButton targetUserId={id} />

			{(() => {
				switch (status) {
					case RelationshipStatus.FRIENDS:
						return (
							<FriendDeleteButton
								friendId={id}
								friendDisplayName={displayName}
							/>
						);

					case RelationshipStatus.REQUEST_SENT:
						return <FriendRequestDelete direction='outgoing' user={user} />;

					case RelationshipStatus.REQUEST_RECEIVED:
						return <FriendRequestAccept user={user} />;

					case RelationshipStatus.BLOCKED_BY_YOU:
					case RelationshipStatus.MUTUAL_BLOCK:
						return null;

					case RelationshipStatus.NONE:
					default:
						return <FriendRequestSend user={user} />;
				}
			})()}

			<BlockAddButton user={{ id, displayName, username }} />
		</div>
	);
};

export default ProfileHeaderActions;
