import {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarGroupCount,
	AvatarImage,
} from '@ui/avatar';
import { ImageProps } from '@libs/types';
import { capitalize, cn, truncate } from '@/libs/utils';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { PresenceStatus } from '@/features/presence/types/status';
import { TooltipContent, TooltipTrigger, Tooltip } from '@/components/ui/tooltip';
import { BaseUser } from '../../type';
import UserDisplayName from '../Identity/UserDisplayName';
import Username from '../Identity/Username';

export type AvatarProfileSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProfileFallbackProps extends React.ComponentProps<typeof AvatarFallback> {
	username: string;
}
const AvatarProfileFallback = ({
	username,
	className,
	...props
}: AvatarProfileFallbackProps) => {
	return (
		<AvatarFallback
			className={cn('bg-gold-radial text-gold-radial-foreground ', className)}
			{...props}>
			{capitalize(truncate(username, 1))}
		</AvatarFallback>
	);
};

interface AvatarProfileBadgeProps extends React.ComponentProps<typeof AvatarBadge> {
	badgeState: PresenceStatus;
}
const badgeStateClasses = {
	[PresenceStatus.ONLINE]: 'bg-primary',
	[PresenceStatus.DO_NOT_DISTURB]: 'bg-red-500',
	[PresenceStatus.OFFLINE]: 'bg-muted',
	[PresenceStatus.INVISIBLE]: 'bg-muted',
} satisfies Record<PresenceStatus, string>;

const AvatarProfileBadge = ({
	badgeState,
	className,
	...props
}: AvatarProfileBadgeProps) => {
	return (
		<AvatarBadge
			className={cn(badgeStateClasses[badgeState], className)}
			{...props}
		/>
	);
};

export interface AvatarProfileProps extends Omit<
	React.ComponentProps<typeof Avatar>,
	'size'
> {
	img: ImageProps;
	size?: AvatarProfileSize;
	badgeState?: PresenceStatus | false;
}

const sizeClasses = {
	xs: 'size-6',
	sm: 'size-8',
	md: 'size-10',
	lg: 'size-12',
	xl: 'size-14',
} satisfies Record<AvatarProfileSize, string>;

const AvatarProfile = ({
	img,
	size = 'lg',
	className,
	badgeState = false,
	...props
}: AvatarProfileProps) => {
	return (
		<Avatar className={cn(sizeClasses[size], className)} {...props}>
			<AvatarImage src={img.src} alt={img.alt} />
			<AvatarProfileFallback username={img.alt} />
			{badgeState && <AvatarProfileBadge badgeState={badgeState} />}
		</Avatar>
	);
};

interface AvatarProfileCountProps extends React.ComponentProps<typeof AvatarGroupCount> {
	size?: AvatarProfileSize;
}

const AvatarProfileCount = ({
	className,
	size = 'lg',
	...props
}: AvatarProfileCountProps) => {
	return <AvatarGroupCount className={cn(sizeClasses[size], className)} {...props} />;
};

interface AvatarProfileLinkProps {
	avatar: AvatarProfileProps;
	username: string;
}
const AvatarProfileLink = ({ avatar, username }: AvatarProfileLinkProps) => {
	return (
		<I18nLink href='userName' hrefParams={{ username: `@${username}` }}>
			<AvatarProfile {...avatar} />
		</I18nLink>
	);
};

type AvatarProfileTooltipProps = {
	user: BaseUser;
	isLink?: boolean;
} & Pick<AvatarProfileProps, 'size' | 'badgeState'>;

const AvatarProfileTooltip = ({
	user: { displayName, username, avatarUrl },
	size = 'md',
	isLink = true,
	badgeState,
}: AvatarProfileTooltipProps) => {
	const img = {
		src: avatarUrl ?? '',
		alt: displayName,
	} as const;

	const avatarProps = {
		img,
		size,
		badgeState,
	} as const;

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<div className={`${isLink && 'cursor-pointer'}`}>
					{isLink ? (
						<AvatarProfileLink avatar={avatarProps} username={username} />
					) : (
						<AvatarProfile {...avatarProps} />
					)}
				</div>
			</TooltipTrigger>
			<TooltipContent
				className='bg-background text-foreground shadow-md'
				side='top'>
				<div className='flex flex-col items-center gap-1'>
					<UserDisplayName displayName={displayName} />
					<Username username={username} />
				</div>
			</TooltipContent>
		</Tooltip>
	);
};

export {
	AvatarProfile,
	AvatarProfileFallback,
	AvatarProfileLink,
	AvatarProfileBadge,
	AvatarProfileCount,
	AvatarProfileTooltip,
};
