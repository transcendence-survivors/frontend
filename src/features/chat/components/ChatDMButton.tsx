'use client';

import { MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useOpenDM } from '../hooks/useOpenDM';

interface ChatDMButtonProps extends Omit<React.ComponentProps<typeof Button>, 'onClick'> {
	targetUserId: string;
}

export const ChatDMButton = ({
	targetUserId,
	variant = 'outline',
	size = 'icon',
	className = 'text-muted-foreground',
	...props
}: ChatDMButtonProps) => {
	const t = useTranslations('chat');
	const { mutate: openDM, isPending } = useOpenDM(targetUserId);

	const label = t('send_dm');

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					type='button'
					variant={variant}
					size={size}
					disabled={isPending}
					onClick={() => openDM()}
					aria-label={label}
					className={className}
					{...props}>
					<MessageSquare className='size-4' aria-hidden='true' />
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>{label}</p>
			</TooltipContent>
		</Tooltip>
	);
};
