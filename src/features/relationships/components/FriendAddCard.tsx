import { useTranslations } from 'next-intl';
import { FriendRequestSend } from '../friend-request/components/actions/FriendRequestSend';
import { UserCard } from '@/features/user/components/UserCard';
import { UseUsersParams } from '@/features/user/hooks/useUsers';

type FriendAddCardProps = Pick<React.ComponentProps<typeof UserCard>, 'user'> & {
	params: UseUsersParams;
};

const FriendAddCard = ({ user, params, ...props }: FriendAddCardProps) => {
	const t = useTranslations('relationships.add');

	return (
		<UserCard user={user} {...props}>
			<FriendRequestSend
				userId={user.id}
				ariaLabel={t('aria_label')}
				failureMessage={t('failed')}
				acceptedMessage={t('success_accepted_displayname', {
					displayName: user.displayName,
				})}
				pendingMessage={t('success_pending_displayname', {
					displayName: user.displayName,
				})}
				params={params}
			/>
		</UserCard>
	);
};

export { FriendAddCard };
