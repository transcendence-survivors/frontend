import { useEffect } from 'react';
import { useTypingActions } from '../stores/typingSlice';

interface UseChatFormTypingProps {
	roomId: string;
	textValue: string;
	attachments: File[];
	isEditing: boolean;
}

export const useChatFormTyping = ({
	roomId,
	textValue,
	attachments,
	isEditing,
}: UseChatFormTypingProps) => {
	const { startTyping, stopTyping } = useTypingActions();

	useEffect(() => {
		if (!roomId) return;
		if (
			!isEditing &&
			((textValue && textValue.trim().length > 0) || attachments.length > 0)
		) {
			startTyping(roomId);
		} else stopTyping(roomId);
	}, [textValue, attachments, roomId, startTyping, stopTyping, isEditing]);

	useEffect(() => {
		return () => {
			if (roomId) stopTyping(roomId);
		};
	}, [roomId, stopTyping]);

	return { stopTyping: () => roomId && stopTyping(roomId) };
};
