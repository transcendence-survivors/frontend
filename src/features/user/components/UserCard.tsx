import { PresenceStatus } from '@/features/presence/types/status';
import {
	UserIdentity,
	UserIdentityLink,
	UserIdentitySkeleton,
} from '@/features/user/components/Identity/UserIdentity';
import { BaseUser } from '@/features/user/type';
import { cn } from '@/libs/utils';

interface FriendCardProps extends React.HtmlHTMLAttributes<HTMLElement> {
	user: BaseUser;
	badge?: PresenceStatus | false;
	bottom?: React.ReactNode;
	containerClassName?: string;
	useIdentityLink?: boolean;
}

const UserCard = ({
	user,
	badge = false,
	children,
	className,
	bottom,
	containerClassName,
	useIdentityLink = true,
	...props
}: FriendCardProps) => {
	const avatarProps = {
		img: {
			src: user.avatarUrl ?? '',
			alt: user.displayName,
		},
		size: 'lg',
		badgeState: badge,
	} as const;

	const userProps = {
		displayName: user.displayName,
		username: user.username,
	} as const;

	return (
		<article className={cn('border px-4 py-4', className)} {...props}>
			<div
				className={cn(
					'flex flex-row items-center gap-x-4 justify-between ',
					containerClassName,
				)}>
				<div className='flex flex-col gap-3 max-w-[60%]'>
					{useIdentityLink ? (
						<UserIdentityLink
							avatar={avatarProps}
							user={userProps}
							className='max-w-full'
						/>
					) : (
						<UserIdentity avatar={avatarProps} user={userProps} />
					)}
				</div>
				<div className='ml-auto'>{children}</div>
			</div>
			{bottom}
		</article>
	);
};

const UserCardSkeleton = ({
	children,
	bottom,
	containerClassName,
}: {
	children?: React.ReactNode;
	bottom?: React.ReactNode;
	containerClassName?: string;
}) => {
	return (
		<article className='border px-4 py-4'>
			<div
				className={cn(
					'flex flex-row items-center gap-x-4 justify-between ',
					containerClassName,
				)}>
				<div className='flex flex-col gap-3 max-w-[60%]'>
					<UserIdentitySkeleton />
				</div>
				<div className='ml-auto'>{children}</div>
			</div>
			{bottom && <div>{bottom}</div>}
		</article>
	);
};

export { UserCard, UserCardSkeleton };
