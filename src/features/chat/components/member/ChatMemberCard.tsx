'use client';

import { ReactNode } from 'react';
import {
	UserIdentity,
	UserIdentitySkeleton,
} from '@/features/user/components/Identity/UserIdentity';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
	UserX,
	User,
	Crown,
	ShieldCheck,
	Clock,
	ShieldAlert,
	UserMinus,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/libs/utils';
import { canManageMember, ChatMemberPermissionEnum } from '../../utils/role';
import { ChatMember, ChatMemberRole } from '../../types/member';
import { AppMessages } from '@/modules/i18n/messages/types';
import { DeepKeys } from '@/libs/types';
import { I18nLink } from '@/modules/i18n/components/I18nLink';
import DisplayDate from '@/components/ui/date';
import { Skeleton } from '@/components/ui/skeleton';
import { ChatMemberKickButton } from './actions/ChatMemberKickButton';
import { ChatTransferOwnershipButton } from './actions/ChatTransferOwnershipButton';
import { ChatMemberDemoteButton } from './actions/ChatMemberDemoteButton';
import { LeaveRoomButton } from './actions/ChatLeaveButton';
import { ChatMemberPromoteButton } from './actions/ChatMemberPromoteButton';
import { UseChatMembersParams } from '../../hooks/member/useChatMembers';

export interface ChatMemberCardProps {
	roomId: string;
	member: ChatMember;
	currentUserId?: string;
	currentUserRole?: ChatMemberRole;
	params: UseChatMembersParams;
}

const roleTradMap: Record<ChatMemberRole, DeepKeys<AppMessages['chat']['members']>> = {
	OWNER: 'roles.owner',
	ADMIN: 'roles.admin',
	MEMBER: 'roles.member',
} as const;

const ROLE_BADGE_STYLE: Record<ChatMemberRole, { icon?: ReactNode; className: string }> =
	{
		OWNER: {
			icon: <Crown className='size-3 text-amber-500 fill-amber-500/20' />,
			className:
				'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
		},
		ADMIN: {
			icon: <ShieldCheck className='size-3 text-indigo-500' />,
			className:
				'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
		},
		MEMBER: {
			className: 'bg-muted/60 text-muted-foreground border-border/50',
		},
	};

export const ChatMemberCard = ({
	roomId,
	member,
	currentUserId,
	currentUserRole,
	params,
}: ChatMemberCardProps) => {
	const t = useTranslations('chat.members');

	const isSelf = currentUserId === member.user.id;
	const isOwner = currentUserRole === 'OWNER';

	const canPromote =
		!isSelf &&
		member.role === 'MEMBER' &&
		canManageMember({
			actorRole: currentUserRole,
			targetRole: member.role,
			permission: ChatMemberPermissionEnum.MEMBER_PROMOTE,
			desiredRole: 'ADMIN',
		});

	const canDemote =
		!isSelf &&
		member.role === 'ADMIN' &&
		canManageMember({
			actorRole: currentUserRole,
			targetRole: member.role,
			permission: ChatMemberPermissionEnum.MEMBER_DEMOTE,
			desiredRole: 'MEMBER',
		});

	const canKick =
		!isSelf &&
		canManageMember({
			actorRole: currentUserRole,
			targetRole: member.role,
			permission: ChatMemberPermissionEnum.MEMBER_KICK,
		});

	const canTransfer = isOwner && !isSelf;
	const hasAnyManagementAction = canPromote || canDemote || canTransfer || canKick;
	const roleStyle = ROLE_BADGE_STYLE[member.role];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='sidebar'
					data-active={isSelf}
					className={cn(
						'h-auto max-w-full w-full overflow-clip justify-between gap-x-3 p-3',
					)}>
					<UserIdentity
						avatar={{
							img: {
								src: member.user.avatarUrl ?? '',
								alt: member.user.displayName,
							},
							size: 'md' as const,
							badgeState: false as const,
						}}
						user={{
							displayName: member.user.displayName,
							username: member.user.username,
						}}
						className='min-w-0 flex-1'
					/>

					<div className='flex items-center gap-x-2 ml-auto shrink-0'>
						<span
							className={cn(
								'inline-flex items-center gap-0.5 rounded-md border p-1 text-[9px] leading-none tracking-tight',
								roleStyle.className,
							)}>
							{roleStyle.icon}
							<strong>
								{t(roleTradMap[member.role], {
									defaultValue: member.role,
								})}
							</strong>
						</span>
					</div>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='end' className='w-56'>
				{member.joinedAt && (
					<>
						<DropdownMenuLabel className='font-normal text-muted-foreground text-xs flex items-center gap-2 py-1.5'>
							<Clock className='size-3.5 shrink-0 text-muted-foreground' />
							<strong className='truncate font-medium text-[10px] text-muted-foreground'>
								{t('joined_at')}{' '}
								<DisplayDate
									date={new Date(member.joinedAt)}
									formatOptions={{
										year: 'numeric',
										month: 'short',
										day: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
									}}
								/>
							</strong>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
					</>
				)}

				<DropdownMenuItem asChild>
					<I18nLink
						href='userName'
						hrefParams={{ username: `@${member.user.username}` }}
						className='flex items-center gap-2 text-xs cursor-pointer'>
						<User className='size-3.5 text-muted-foreground' />
						<span>{t('view_profile')}</span>
					</I18nLink>
				</DropdownMenuItem>

				{isSelf && !isOwner && (
					<>
						<DropdownMenuSeparator />
						<LeaveRoomButton
							roomId={roomId}
							currentUserId={currentUserId}
							params={params}
							asChild>
							<DropdownMenuItem
								onSelect={(e) => e.preventDefault()}
								className='text-xs'>
								<UserMinus className='size-3.5' />
								<span>{t('leave_room')}</span>
							</DropdownMenuItem>
						</LeaveRoomButton>
					</>
				)}

				{hasAnyManagementAction && (
					<>
						<DropdownMenuSeparator />

						{canPromote && (
							<ChatMemberPromoteButton
								roomId={roomId}
								targetUserId={member.user.id}
								params={params}
								asChild>
								<DropdownMenuItem
									onSelect={(e) => e.preventDefault()}
									className='text-xs'>
									<ShieldCheck className='size-3.5 text-primary' />
									<span>{t('promote_to_admin')}</span>
								</DropdownMenuItem>
							</ChatMemberPromoteButton>
						)}

						{canDemote && (
							<ChatMemberDemoteButton
								roomId={roomId}
								targetUserId={member.user.id}
								params={params}
								asChild>
								<DropdownMenuItem
									onSelect={(e) => e.preventDefault()}
									className='text-xs'>
									<ShieldAlert className='size-3.5 text-amber-500' />
									<span>{t('demote_to_member')}</span>
								</DropdownMenuItem>
							</ChatMemberDemoteButton>
						)}

						{canTransfer && (
							<ChatTransferOwnershipButton
								roomId={roomId}
								targetUserId={member.user.id}
								params={params}
								asChild>
								<DropdownMenuItem
									onSelect={(e) => e.preventDefault()}
									className='text-xs'>
									<ShieldCheck className='size-3.5 text-emerald-500' />
									<span>{t('transfer_ownership')}</span>
								</DropdownMenuItem>
							</ChatTransferOwnershipButton>
						)}

						{canKick && (
							<>
								{(canPromote || canDemote || canTransfer) && (
									<DropdownMenuSeparator />
								)}
								<ChatMemberKickButton
									roomId={roomId}
									targetUserId={member.user.id}
									params={params}
									asChild>
									<DropdownMenuItem
										onSelect={(e) => e.preventDefault()}
										className='text-xs'>
										<UserX className='size-3.5' />
										<span>{t('kick')}</span>
									</DropdownMenuItem>
								</ChatMemberKickButton>
							</>
						)}
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const ChatMemberCardSkeleton = () => {
	return (
		<div className='flex items-center justify-between gap-x-2 rounded-lg border bg-card px-3 py-2'>
			<div className='flex items-center gap-x-2.5 min-w-0 max-w-[60%]'>
				<UserIdentitySkeleton />
			</div>
			<div className='flex items-center gap-x-2 ml-auto shrink-0'>
				<Skeleton className='h-5 w-14 rounded-md' />
			</div>
		</div>
	);
};
