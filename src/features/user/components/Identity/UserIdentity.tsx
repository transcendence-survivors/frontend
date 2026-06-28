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

const UserIdentitySkeleton = () => {
	const bgColor = 'bg-muted';
	return (
		<div className='flex items-center gap-3 h-auto overflow-x-clip whitespace-nowrap text-ellipsis max-w-full'>
			<div className={`w-12 h-12 rounded-full ${bgColor} animate-pulse`}></div>
			<div className='flex flex-col gap-2'>
				<div className={`w-32 h-4 ${bgColor} animate-pulse`}></div>
				<div className={`w-24 h-4 ${bgColor} animate-pulse`}></div>
			</div>
		</div>
	);
};

export { UserIdentity, UserIdentitySkeleton };
