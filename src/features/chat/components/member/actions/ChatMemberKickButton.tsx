import { ReactNode } from 'react';
import { Slot } from 'radix-ui';
import { UserX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useKickMember } from '../../../hooks/member/useChatMemberActions';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';
import { UseChatMembersParams } from '../../../hooks/member/useChatMembers';

export interface KickMemberButtonProps extends React.ComponentProps<typeof Button> {
	roomId: string;
	targetUserId: string;
	params?: UseChatMembersParams;
	asChild?: boolean;
	children?: ReactNode;
}

export const ChatMemberKickButton = ({
	roomId,
	targetUserId,
	params,
	asChild = false,
	children,
	disabled,
	onClick,
	...props
}: KickMemberButtonProps) => {
	const t = useTranslations('chat.members');
	const { mutate, isPending } = useKickMember(roomId, targetUserId, params);
	const Component = asChild ? Slot.Root : Button;

	return (
		<ActionConfirmDialog
			title={t('dialogs.kick_title')}
			description={t('dialogs.kick_description')}
			confirmText={t('kick')}
			isDestructive
			isPending={isPending}
			onConfirm={() => mutate()}
			trigger={
				<Component
					variant='destructive'
					size='sm'
					disabled={isPending || disabled}
					onClick={onClick}
					{...props}>
					{children ?? (
						<>
							<UserX className='size-3.5 mr-1.5' />
							<span>{t('kick')}</span>
						</>
					)}
				</Component>
			}
		/>
	);
};
