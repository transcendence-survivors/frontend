import { ChatMemberRole } from '@/features/chat/types/member';
import { ChatMessage, ChatMessageType } from '@/features/chat/types/message';
import { DeepKeys } from '@/libs/types';
import { AppMessages, RootTFunction } from '@/modules/i18n/messages/types';

export type SystemChatMessage = Exclude<ChatMessage, { type: ChatMessageType.TEXT }>;

const roleTranslationMap: Record<ChatMemberRole, DeepKeys<AppMessages['chat']>> = {
	OWNER: 'members.roles.owner',
	ADMIN: 'members.roles.admin',
	MEMBER: 'members.roles.member',
} as const;

export const getSystemMessage = (
	message: SystemChatMessage,
	t: RootTFunction,
): string | null => {
	console.log('getSystemMessage called with message:', message);
	switch (message.type) {
		case ChatMessageType.ROLE_UPDATED:
			return t('messages.system.role_updated', {
				actor: message.sender.displayName,
				target: message.metadata.targetUser.displayName,
				oldRole: t(roleTranslationMap[message.metadata.oldRole]),
				newRole: t(roleTranslationMap[message.metadata.newRole]),
			});

		case ChatMessageType.KICKED:
			return t('messages.system.kicked', {
				actor: message.sender.displayName,
				target: message.metadata.targetUser.displayName,
			});

		case ChatMessageType.JOINED:
			return t('messages.system.joined', {
				user: message.metadata.targetUser.displayName,
			});

		case ChatMessageType.LEFT:
			return t('messages.system.left', {
				user: message.metadata.targetUser.displayName,
			});

		case ChatMessageType.ROOM_RENAMED:
			return t('messages.system.room_renamed', {
				actor: message.sender.displayName,
				oldName: message.metadata.oldValue,
				newName: message.metadata.newValue,
			});

		case ChatMessageType.ROOM_AVATAR_CHANGED:
			return t('messages.system.room_avatar_changed', {
				actor: message.sender.displayName,
			});

		case ChatMessageType.OWNERSHIP_TRANSFERRED:
			return t('messages.system.ownership_transferred', {
				actor: message.sender.displayName,
				target: message.metadata?.targetUser?.displayName,
			});

		case ChatMessageType.ROOM_CREATED:
			return t('messages.system.room_created', {
				actor: message.sender.displayName,
			});

		default:
			return null;
	}
};

export const getMessagePreview = (
	lastMessage: ChatMessage | null | undefined,
	t: RootTFunction,
): string => {
	if (!lastMessage) {
		return t('messages.preview.no_messages');
	}

	if (lastMessage.isDeleted) {
		return t('messages.preview.deleted_message');
	}

	if (lastMessage.type === ChatMessageType.TEXT) {
		const attachmentCount = lastMessage.attachmentUrls?.length ?? 0;
		const senderPrefix = lastMessage.sender
			? `${lastMessage.sender.displayName}: `
			: '';

		if (lastMessage.content) {
			return `${senderPrefix}${lastMessage.content}`;
		}

		if (attachmentCount > 0) {
			return `${senderPrefix}${t('messages.preview.attachments', { count: attachmentCount })}`;
		}

		return t('messages.preview.no_messages');
	}

	return getSystemMessage(lastMessage, t) ?? t('messages.preview.no_messages');
};
