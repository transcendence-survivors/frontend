import {
	UserIdentity,
	UserIdentitySkeleton,
} from '@/features/user/components/Identity/UserIdentity';
import { BaseUser } from '@/features/user/type';
import { cn } from '@/libs/utils';

interface FriendCardProps extends React.HtmlHTMLAttributes<HTMLElement> {
	friend: BaseUser;
	badge?: boolean;
}

const FriendCard = ({
	friend,
	badge = false,
	children,
	className,
	...props
}: FriendCardProps) => {
	return (
		<article
			className={cn(
				'border px-4 py-4 flex items-center gap-4 justify-between',
				className,
			)}
			{...props}>
			<div className='flex items-start gap-5'>
				<UserIdentity
					avatar={{
						img: {
							src: friend.avatarUrl,
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
			<div>{children}</div>
		</article>
	);
};

const FriendCardSkeleton = ({ children }: { children?: React.ReactNode }) => {
	return (
		<article className='border px-4 py-4 flex items-center gap-4 justify-between'>
			<div className='flex items-start gap-5'>
				<UserIdentitySkeleton />
			</div>
			{children && <div>{children}</div>}
		</article>
	);
};

export { FriendCard, FriendCardSkeleton };
