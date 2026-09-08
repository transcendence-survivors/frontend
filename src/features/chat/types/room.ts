import { CursorParams } from '@/libs/api';
import { BaseUser } from '../../user/type';
import { ChatMessage } from './message';

export enum ChatRoomType {
	DIRECT = 'DIRECT',
	GROUP = 'GROUP',
}

export enum ChatRoomOrderBy {
	UPDATED_ASC = 'updated-asc',
	UPDATED_DESC = 'updated-desc',
	CREATED_ASC = 'created-asc',
	CREATED_DESC = 'created-desc',
}

export enum ChatRoomFeed {
	ALL = 'all',
	DIRECT = 'direct',
	GROUP = 'group',
}

interface ChatRoomBase {
	id: string;
	name: string | null;
	avatarUrl: string | null;
	lastMessage: ChatMessage | null;
}

export interface DirectChatRoom extends ChatRoomBase {
	type: ChatRoomType.DIRECT;
	otherMember: BaseUser;
}

export interface GroupChatRoom extends ChatRoomBase {
	type: ChatRoomType.GROUP;
	membersPreview: BaseUser[];
	memberIds: string[];
	memberCount: number;
}

export type ChatRoom = DirectChatRoom | GroupChatRoom;

export type GetChatRoomSearchParams = CursorParams<ChatRoomOrderBy> & {
	type?: ChatRoomFeed;
};
