'use client';

import { UserMinus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useLeaveRoom } from '../../../hooks/member/useChatMemberActions';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';
import { UseChatMembersParams } from '../../../hooks/member/useChatMembers';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

export interface LeaveRoomButtonProps extends React.ComponentProps<typeof Button> {
	roomId: string;
	params?: UseChatMembersParams;
}

export const ChatLeaveButton = ({
	roomId,
	params,
	children,
	disabled,
	onClick,
	...props
}: LeaveRoomButtonProps) => {
	const t = useTranslations('chat.members');
	const { mutate, isPending } = useLeaveRoom(roomId, params);

	const defaultTrigger = (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant='ghost'
						size='icon'
						disabled={isPending || disabled}
						onClick={onClick}
						{...props}>
						<UserMinus className='size-3.5' />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{t('leave_room')}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);

	const finalTrigger = children ?? defaultTrigger;

	return (
		<ActionConfirmDialog
			title={t('dialogs.leave_title')}
			description={t('dialogs.leave_description')}
			confirmText={t('leave_room')}
			isDestructive
			isPending={isPending}
			onConfirm={() => mutate()}
			trigger={finalTrigger}
		/>
	);
};
