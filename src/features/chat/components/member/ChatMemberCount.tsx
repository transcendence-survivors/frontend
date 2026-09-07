'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from 'next-intl';
import { useChatMembersCount } from '../../hooks/member/useChatMembersCount';

interface ChatMemberCountProps {
	roomId: string;
	search?: string;
	className?: string;
}

export const ChatMemberCount = ({ roomId, search, className }: ChatMemberCountProps) => {
	const t = useTranslations('chat.members');
	const { data, isLoading, isError } = useChatMembersCount({ roomId, search });

	if (isLoading) {
		return <Skeleton className='h-5 w-24' />;
	}

	if (isError || data === undefined) {
		return null;
	}

	return (
		<span className={className}>
			{data.count} {t('count_label', { count: data.count })}
		</span>
	);
};
