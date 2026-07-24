import { BaseUser } from '@/features/user/type';

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
