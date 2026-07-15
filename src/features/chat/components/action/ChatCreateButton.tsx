'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useMutation } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { createChatRoom } from '../../api/create';
import { ChatRoomType } from '../../types';
import { isApiError } from '@/libs/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getBasePath } from '@/modules/i18n/utils/routing';
import { ROUTES } from '@/modules/i18n/constants/routes';

interface ChatCreateButtonProps extends ComponentProps<typeof Button> {
	usersIds: string[];
	groupName?: string;
	onMutationSuccess?: () => void;
}

const ChatCreateButton = ({
	usersIds,
	groupName,
	onMutationSuccess,
	...props
}: ChatCreateButtonProps) => {
	const router = useRouter();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['chat-rooms', { usersIds, groupName }],
		mutationFn: createChatRoom,
	});

	const handleClick = async () => {
		try {
			const response = await mutateAsync({
				type: usersIds.length > 1 ? ChatRoomType.GROUP : ChatRoomType.DIRECT,
				usersIds,
				name: groupName,
			});
			if (isApiError(response)) {
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
