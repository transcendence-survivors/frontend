import { ReactNode } from 'react';
import { Slot } from 'radix-ui';
import { UserMinus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useLeaveRoom } from '../../../hooks/member/useChatMemberActions';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';
import { UseChatMembersParams } from '../../../hooks/member/useChatMembers';

export interface LeaveRoomButtonProps extends React.ComponentProps<typeof Button> {
	roomId: string;
	currentUserId: string;
	params?: UseChatMembersParams;
	asChild?: boolean;
	children?: ReactNode;
}

export const LeaveRoomButton = ({
	roomId,
	currentUserId,
	params,
	asChild = false,
	children,
	disabled,
	onClick,
	...props
}: LeaveRoomButtonProps) => {
	const t = useTranslations('chat.members');
	const { mutate, isPending } = useLeaveRoom(roomId, currentUserId, params);

	const Component = asChild ? Slot.Root : Button;

	return (
		<ActionConfirmDialog
			title={t('dialogs.leave_title')}
			description={t('dialogs.leave_description')}
			confirmText={t('leave_room')}
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
							<UserMinus className='size-3.5 mr-1.5' />
							<span>{t('leave_room')}</span>
						</>
					)}
				</Component>
			}
		/>
	);
};
