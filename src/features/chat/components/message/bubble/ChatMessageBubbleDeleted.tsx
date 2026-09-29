import { cn } from '@/libs/utils';
import { HTMLAttributes } from 'react';
import { useTranslations } from 'next-intl';

type ChatMessageBubbleDeletedProps = HTMLAttributes<HTMLDivElement> & {};

export const ChatMessageBubbleDeleted = ({
	className,
	...props
}: ChatMessageBubbleDeletedProps) => {
	const t = useTranslations('chat.messages.preview');

	return (
		<div
			className={cn(
				'rounded-2xl border border-dashed border-border px-4 py-2 text-xs italic text-muted-foreground',
				className,
			)}
			{...props}>
			{t('deleted_message')}
		</div>
	);
};
