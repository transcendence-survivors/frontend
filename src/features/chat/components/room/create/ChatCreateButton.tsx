'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ComponentProps } from 'react';
import { isApiError } from '@/libs/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/modules/i18n/constants/routes';
import { useChatRoomCreate } from '@/features/chat/hooks/useChatRoomActions';
import { UseChatRoomsParams } from '@/features/chat/hooks/useChatRooms';
import { ChatRoomType } from '@/features/chat/types';

interface ChatCreateButtonProps extends ComponentProps<typeof Button> {
	usersIds: string[];
	groupName?: string;
	params: UseChatRoomsParams;
	onMutationSuccess?: () => void;
}

const ChatCreateButton = ({
	params,
	usersIds,
	groupName,
	onMutationSuccess,
	...props
}: ChatCreateButtonProps) => {
	const router = useRouter();

	const { mutateAsync, isPending } = useChatRoomCreate({
		params,
		usersIds,
		name: groupName,
		onMutationSuccess,
	});

	const handleClick = async () => {
		try {
			const response = await mutateAsync({
				type: usersIds.length > 1 ? ChatRoomType.GROUP : ChatRoomType.DIRECT,
				usersIds,
				name: groupName,
			});
			if (isApiError(response)) {
				if (response.code == 409) {
					toast.error(
						'A direct chat with this user already exists. Please check your chat rooms.',
					);
					return;
				}
				throw new Error(`Failed to create chat: ${response.message}`);
			}
			onMutationSuccess?.();
			toast.success('Chat created successfully!');
			router.push(ROUTES.chatId({ id: response.data.id }));
		} catch {
			toast.error('Failed to create chat.');
		}
	};

	return (
		<Button disabled={!usersIds.length || isPending} {...props} onClick={handleClick}>
			{isPending && <Spinner className='size-4 animate-spin' />}
			<span>Create Chat</span>
		</Button>
	);
};

export default ChatCreateButton;
