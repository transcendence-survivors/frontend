import { cn } from '@/libs/utils';
import { AvatarProfile } from '../Avatar/AvatarProfile';
import UserDisplayUsername from './UserDisplayUsername';

interface UserIdentityProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
	avatar: React.ComponentProps<typeof AvatarProfile>;
	user: React.ComponentProps<typeof UserDisplayUsername>;
}

const UserIdentity = ({ avatar, user, className, ...props }: UserIdentityProps) => {
	return (
		<div
			className={cn(
				'flex items-center gap-3 h-auto overflow-x-clip whitespace-nowrap text-ellipsis max-w-full',
				className,
			)}
			{...props}>
			<AvatarProfile {...avatar} />
			<UserDisplayUsername {...user} />
		</div>
	);
};

export default UserIdentity;
