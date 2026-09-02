import { BaseUser } from '@/features/user/type';
import { CursorParams, CursorResponse } from '@/libs/api/helpers/types';

export interface ChatMessage {
	id: string;
	roomId: string;
	content?: string;
	attachmentUrls?: string[];
	isEdited: boolean;
	isDeleted: boolean;
	replyToId?: string;
	createdAt: string;
	sender: BaseUser;
}

type ChatMessageOrderBy = 'created-asc' | 'created-desc';

export type GetChatMessagesParams = CursorParams<ChatMessageOrderBy>;
export type GetChatMessagesResponse = CursorResponse<ChatMessage[]>;
