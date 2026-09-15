import { BaseUser } from '@/features/user/type';
import { CursorParams, CursorResponse } from '@/libs/api/helpers/types';
import { ChatMemberRole } from './member';

export enum ChatMessageType {
	TEXT = 'TEXT',
	JOINED = 'JOINED',
	LEFT = 'LEFT',
	KICKED = 'KICKED',
	ROLE_UPDATED = 'ROLE_UPDATED',
	OWNERSHIP_TRANSFERRED = 'OWNERSHIP_TRANSFERRED',
	ROOM_CREATED = 'ROOM_CREATED',
	ROOM_RENAMED = 'ROOM_RENAMED',
	ROOM_AVATAR_CHANGED = 'ROOM_AVATAR_CHANGED',
}

type UserSummary = BaseUser & {
	role: ChatMemberRole;
};

interface BaseChatMessage {
	id: string;
	roomId: string;
	isEdited: boolean;
	isDeleted: boolean;
	createdAt: string;
}

export interface TextChatMessage extends BaseChatMessage {
	type: Extract<ChatMessageType, 'TEXT'>;
	content: string;
	attachmentUrls: string[];
	replyToId?: string | null;
	sender: UserSummary;
	metadata?: null;
}
interface LeftChatMessage extends BaseChatMessage {
	type: Extract<ChatMessageType, 'LEFT'>;
	metadata: {
		targetUser: UserSummary;
	};
}
interface JoinedChatMessage extends BaseChatMessage {
	type: Extract<ChatMessageType, 'JOINED'>;
	sender: UserSummary;
	metadata: {
		targetUser: UserSummary;
	};
}
interface RoleUpdatedChatMessage extends BaseChatMessage {
	type: Extract<ChatMessageType, 'ROLE_UPDATED'>;
	sender: UserSummary;
	metadata: {
		targetUser: UserSummary;
		oldRole: ChatMemberRole;
		newRole: ChatMemberRole;
	};
}
interface KickedChatMessage extends BaseChatMessage {
	type: Extract<ChatMessageType, 'KICKED'>;
	sender: UserSummary;
	metadata: {
		targetUser: UserSummary;
	};
}
interface NameChangedChatMessage extends BaseChatMessage {
	type: Extract<ChatMessageType, 'ROOM_RENAMED'>;
	sender: UserSummary;
	metadata: {
		oldValue: string;
		newValue: string;
	};
}
interface AvatarChangedChatMessage extends BaseChatMessage {
	type: Extract<ChatMessageType, 'ROOM_AVATAR_CHANGED'>;
	sender: UserSummary;
	metadata: {
		oldValue: string;
		newValue: string;
	};
}
interface OwnershipTransferredChatMessage extends BaseChatMessage {
	type: Extract<ChatMessageType, 'OWNERSHIP_TRANSFERRED'>;
	sender: UserSummary;
	metadata: {
		targetUser: UserSummary;
		oldRole: ChatMemberRole;
		newRole: ChatMemberRole;
	};
}
interface RoomCreatedChatMessage extends BaseChatMessage {
	type: Extract<ChatMessageType, 'ROOM_CREATED'>;
	sender: UserSummary;
}

export type ChatMessage =
	| TextChatMessage
	| LeftChatMessage
	| JoinedChatMessage
	| RoleUpdatedChatMessage
	| KickedChatMessage
	| NameChangedChatMessage
	| AvatarChangedChatMessage
	| OwnershipTransferredChatMessage
	| RoomCreatedChatMessage;

type ChatMessageOrderBy = 'created-asc' | 'created-desc';

export type GetChatMessagesParams = CursorParams<ChatMessageOrderBy>;
export type GetChatMessagesResponse = CursorResponse<ChatMessage[]>;
