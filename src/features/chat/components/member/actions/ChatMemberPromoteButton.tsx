import { ReactNode } from 'react';
import { Slot } from 'radix-ui';
import { ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ActionConfirmDialog } from '@/components/ui/action-confirm-dialog';
import { useUpdateMemberRole } from '../../../hooks/member/useChatMemberActions';
import { UseChatMembersParams } from '../../../hooks/member/useChatMembers';

export interface PromoteMemberButtonProps extends React.ComponentProps<typeof Button> {
	roomId: string;
	targetUserId: string;
	params?: UseChatMembersParams;
	asChild?: boolean;
	children?: ReactNode;
}

export const ChatMemberPromoteButton = ({
	roomId,
	targetUserId,
	params,
	asChild = false,
	children,
	disabled,
	onClick,
	...props
}: PromoteMemberButtonProps) => {
	const t = useTranslations('chat.members');
	const { mutate, isPending } = useUpdateMemberRole(
		roomId,
		targetUserId,
		'ADMIN',
		true,
		params,
	);

	const Component = asChild ? Slot.Root : Button;

	return (
		<ActionConfirmDialog
			title={t('dialogs.promote_title')}
			description={t('dialogs.promote_description')}
			confirmText={t('promote_to_admin')}
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
							<ShieldCheck className='size-3.5 text-primary mr-1.5' />
							<span>{t('promote_to_admin')}</span>
						</>
					)}
				</Component>
			}
		/>
	);
};
