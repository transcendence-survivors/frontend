import { ReactNode } from 'react';
import { Slot } from 'radix-ui';
import { ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useTransferOwnership } from '../../../hooks/member/useChatMemberActions';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';
import { UseChatMembersParams } from '../../../hooks/member/useChatMembers';

export interface ChatTransferOwnershipButtonProps extends React.ComponentProps<
	typeof Button
> {
	roomId: string;
	targetUserId: string;
	params?: UseChatMembersParams;
	asChild?: boolean;
	children?: ReactNode;
}

export const ChatTransferOwnershipButton = ({
	roomId,
	targetUserId,
	params,
	asChild = false,
	children,
	disabled,
	onClick,
	...props
}: ChatTransferOwnershipButtonProps) => {
	const t = useTranslations('chat.members');
	const { mutate, isPending } = useTransferOwnership(roomId, targetUserId, params);

	const Component = asChild ? Slot.Root : Button;

	return (
		<ActionConfirmDialog
			title={t('dialogs.transfer_title')}
			description={t('dialogs.transfer_description')}
			confirmText={t('transfer_ownership')}
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
							<ShieldCheck className='size-3.5 text-emerald-500 mr-1.5' />
							<span>{t('transfer_ownership')}</span>
						</>
					)}
				</Component>
			}
		/>
	);
};
