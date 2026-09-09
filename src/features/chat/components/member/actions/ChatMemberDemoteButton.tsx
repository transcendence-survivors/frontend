import { ReactNode } from 'react';
import { Slot } from 'radix-ui';
import { ShieldAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';
import { useUpdateMemberRole } from '../../../hooks/member/useChatMemberActions';
import { UseChatMembersParams } from '../../../hooks/member/useChatMembers';

export interface DemoteMemberButtonProps extends React.ComponentProps<typeof Button> {
	roomId: string;
	targetUserId: string;
	params?: UseChatMembersParams;
	asChild?: boolean;
	children?: ReactNode;
}

export const ChatMemberDemoteButton = ({
	roomId,
	targetUserId,
	params,
	asChild = false,
	children,
	disabled,
	onClick,
	...props
}: DemoteMemberButtonProps) => {
	const t = useTranslations('chat.members');
	const { mutate, isPending } = useUpdateMemberRole(
		roomId,
		targetUserId,
		'MEMBER',
		false,
		params,
	);

	const Component = asChild ? Slot.Root : Button;

	return (
		<ActionConfirmDialog
			title={t('dialogs.demote_title')}
			description={t('dialogs.demote_description')}
			confirmText={t('demote_to_member')}
			isDestructive
			isPending={isPending}
			onConfirm={() => mutate()}
			trigger={
				<Component
					variant='outline'
					size='sm'
					disabled={isPending || disabled}
					onClick={onClick}
					{...props}>
					{children ?? (
						<>
							<ShieldAlert className='size-3.5 text-amber-500 mr-1.5' />
							<span>{t('demote_to_member')}</span>
						</>
					)}
				</Component>
			}
		/>
	);
};
