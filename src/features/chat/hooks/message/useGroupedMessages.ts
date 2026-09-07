import { useMemo } from 'react';
import { ChatMessage } from '../../types/message';

interface PageData {
	data: ChatMessage[];
}

export const useGroupedMessages = (pages?: PageData[]) => {
	return useMemo(() => {
		if (!pages) return { messages: [], messagePerDay: {} };

		const reversedPages = [...pages].reverse();
		const messages = reversedPages.flatMap((page) => [...page.data].reverse());

		const messagePerDay = messages.reduce<Record<string, ChatMessage[]>>(
			(acc, message) => {
				const dateKey = new Date(message.createdAt).toLocaleDateString('en-CA');
				if (!acc[dateKey]) acc[dateKey] = [];
				acc[dateKey].push(message);
				return acc;
			},
			{},
		);

		return { messages, messagePerDay };
	}, [pages]);
};
