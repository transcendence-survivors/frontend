import {
	UserIdentityLink,
	UserIdentitySkeleton,
} from '@/features/user/components/Identity/UserIdentity';
import { BaseUser } from '@/features/user/type';
import { cn } from '@/libs/utils';

interface FriendCardProps extends React.HtmlHTMLAttributes<HTMLElement> {
	friend: BaseUser;
	badge?: boolean;
	bottom?: React.ReactNode;
	containerClassName?: string;
}

const FriendCard = ({
	friend,
	badge = false,
	children,
	className,
	bottom,
	containerClassName,
	...props
}: FriendCardProps) => {
	return (
		<article className={cn('border px-4 py-4', className)} {...props}>
			<div
				className={cn(
					'flex flex-row items-center gap-x-4 justify-between ',
					containerClassName,
				)}>
				<div className='flex flex-col gap-3 max-w-[60%]'>
					<UserIdentityLink
						avatar={{
							img: {
								src: friend.avatarUrl ?? '',
								alt: friend.displayName,
							},
							size: 'lg',
							badgeState: badge ? 'online' : false,
						}}
						user={{
							displayName: friend.displayName,
							username: friend.username,
						}}
					/>
				</div>
				<div className='ml-auto'>{children}</div>
			</div>
			{bottom}
		</article>
	);
};

const FriendCardSkeleton = ({
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

export { FriendCard, FriendCardSkeleton };
