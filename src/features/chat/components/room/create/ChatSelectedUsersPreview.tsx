import { AvatarGroup } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
	AvatarProfile,
	AvatarProfileCount,
} from '@/features/user/components/Avatar/AvatarProfile';
import UserDisplayName from '@/features/user/components/Identity/UserDisplayName';
import Username from '@/features/user/components/Identity/Username';
import { BaseUser } from '@/features/user/type';

const MAX_SELECTED_USERS = 5;

interface ChatSelectedUsersPreviewProps {
	users: BaseUser[];
	noUsersSelectedText: string;
}

const ChatSelectedUsersPreview = ({
	users,
	noUsersSelectedText,
}: ChatSelectedUsersPreviewProps) => {
	if (!users.length) {
		return <p className='text-sm text-muted-foreground'>{noUsersSelectedText}</p>;
	}

	const visibleUsers = users.slice(0, MAX_SELECTED_USERS);
	return (
		<AvatarGroup className='flex items-center max-w-full mx-auto'>
			{visibleUsers.map((user) => (
				<Tooltip key={user.id}>
					<TooltipTrigger asChild>
						<AvatarProfile
							img={{
								src: user.avatarUrl ?? '',
								alt: user.displayName,
							}}
							size='md'
						/>
					</TooltipTrigger>
					<TooltipContent className='bg-background flex-col gap-1 p-2 pb-4'>
						<UserDisplayName displayName={user.displayName} />
						<Username username={user.username} />
					</TooltipContent>
				</Tooltip>
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
