import { AvatarGroup } from '@/components/ui/avatar';
import {
	AvatarProfile,
	AvatarProfileCount,
} from '@/features/user/components/Avatar/AvatarProfile';
import { BaseUser } from '@/features/user/type';
import { useTranslations } from 'next-intl';

const MAX_SELECTED_USERS = 5;

interface ChatSelectedUsersPreviewProps {
	users: BaseUser[];
}

const ChatSelectedUsersPreview = ({ users }: ChatSelectedUsersPreviewProps) => {
	const t = useTranslations('chat.rooms.create');
	if (!users.length) {
		return <p className='text-sm text-muted-foreground'>{t('no_users_selected')}</p>;
	}

	const visibleUsers = users.slice(0, MAX_SELECTED_USERS);
	return (
		<AvatarGroup className='flex items-center max-w-full mx-auto'>
			{visibleUsers.map((user) => (
				<AvatarProfile
					key={user.id}
					img={{
						src: user.avatarUrl ?? '',
						alt: user.displayName,
					}}
					size='md'
				/>
			))}

			{users.length > MAX_SELECTED_USERS && (
				<AvatarProfileCount size='md'>
					+{users.length - MAX_SELECTED_USERS}
				</AvatarProfileCount>
			)}
		</AvatarGroup>
	);
};

export default ChatSelectedUsersPreview;
