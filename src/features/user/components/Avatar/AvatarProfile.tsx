import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@ui/avatar';
import { ImageProps } from '@libs/types';
import { capitalize, cn, truncate } from '@/libs/utils';
import I18nLink from '@/modules/i18n/components/I18nLink';

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

type AvatarBadgeState = 'online' | 'do_not_disturb' | 'offline';
interface AvatarProfileBadgeProps extends React.ComponentProps<typeof AvatarBadge> {
	badgeState: AvatarBadgeState;
}
const badgeStateClasses = {
	online: 'bg-primary',
	do_not_disturb: 'bg-red-500',
	offline: 'bg-muted',
} satisfies Record<AvatarBadgeState, string>;

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
	badgeState?: AvatarBadgeState | false;
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

interface AvatarProfileLinkProps {
	avatar: AvatarProfileProps;
}
const AvatarProfileLink = ({ avatar }: AvatarProfileLinkProps) => {
	return (
		<I18nLink href='profile'>
			<AvatarProfile {...avatar} />
		</I18nLink>
	);
};

export { AvatarProfile, AvatarProfileFallback, AvatarProfileLink };
