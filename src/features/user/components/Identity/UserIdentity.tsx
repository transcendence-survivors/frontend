import { cn } from '@/libs/utils';
import { AvatarProfile } from '../Avatar/AvatarProfile';
import UserDisplayUsername from './UserDisplayUsername';
import I18nLink from '@/modules/i18n/components/I18nLink';

interface UserIdentityBaseProps {
	avatar: React.ComponentProps<typeof AvatarProfile>;
	user: React.ComponentProps<typeof UserDisplayUsername>;
}
type UserIdentityProps = UserIdentityBaseProps & React.HTMLAttributes<HTMLDivElement>;

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

type UserIdentityLinkProps = UserIdentityBaseProps &
	Omit<React.ComponentProps<typeof I18nLink>, 'href' | 'params' | 'children'>;

const UserIdentityLink = ({
	avatar,
	user,
	className,
	...props
}: UserIdentityLinkProps) => {
	return (
		<I18nLink
			{...props}
			href='userName'
			hrefParams={{ username: `@${user.username}` }}
			className={cn(
				'flex items-center gap-3 h-auto px-2 overflow-x-clip whitespace-nowrap text-ellipsis outline-0 max-w-full group/identity hover:underline focus-within:underline',
				className,
			)}>
			<AvatarProfile
				{...avatar}
				className='
                        transition-transform duration-200 ease-in-out
                        ring-0 ring-offset-0
                        group-hover/identity:scale-105
                        group-focus/identity:scale-105
                        group-hover/identity:ring-1
                        group-focus/identity:ring-1
                        group-hover/identity:ring-primary
                        group-focus/identity:ring-primary
                        group-hover/identity:ring-offset-2
                        group-focus/identity:ring-offset-2
                        group-hover/identity:ring-offset-background
                        group-focus/identity:ring-offset-background'
			/>
			<UserDisplayUsername {...user} />
		</I18nLink>
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

export { UserIdentity, UserIdentityLink, UserIdentitySkeleton };
