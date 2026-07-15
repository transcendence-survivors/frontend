import { CursorParams } from '@/libs/api';
import { BaseUser } from '../user/type';

export const ChatRoomType = {
	DIRECT: 'DIRECT',
	GROUP: 'GROUP',
} as const;

export type ChatRoomType = (typeof ChatRoomType)[keyof typeof ChatRoomType];

export const ChatRoomOrderBy = {
	UPDATED_ASC: 'updated-asc',
	UPDATED_DESC: 'updated-desc',
	CREATED_ASC: 'created-asc',
	CREATED_DESC: 'created-desc',
} as const;

export type ChatRoomOrderBy = (typeof ChatRoomOrderBy)[keyof typeof ChatRoomOrderBy];

const ChatRoomFeed = {
	ALL: 'ALL',
	DIRECT: 'DIRECT',
	GROUP: 'GROUP',
} as const;

export type ChatRoomFeed = (typeof ChatRoomFeed)[keyof typeof ChatRoomFeed];

interface LastMessage {
	content: string;
	createdAt: string;
	senderDisplayName: string;
}

export interface ChatRoom {
	id: string;
	type: ChatRoomType;
	name: string | null;
	avatarUrl: string | null;
	lastMessage: LastMessage | null;
	otherMember?: BaseUser;
}

export type GetChatRoomSearchParams = CursorParams<ChatRoomOrderBy> & {
	type?: ChatRoomFeed;
};
