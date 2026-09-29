import { cn } from '@/libs/utils';
import { useTranslations } from 'next-intl';
import { HTMLAttributes } from 'react';

type ChatMessageBubbleDeletedProps = HTMLAttributes<HTMLDivElement> & {};

export const ChatMessageBubbleDeleted = ({
	className,
	...props
}: ChatMessageBubbleDeletedProps) => {
	const t = useTranslations('chat.messages.system');

	return (
		<div
			className={cn(
				'rounded-2xl border border-dashed border-border px-4 py-2 text-xs italic text-muted-foreground',
				className,
			)}
			{...props}>
			{t('deleted')}
		</div>
	);
};
