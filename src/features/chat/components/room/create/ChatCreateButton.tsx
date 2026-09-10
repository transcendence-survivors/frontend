'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ComponentProps } from 'react';
import { isApiError } from '@/libs/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/modules/i18n/constants/routes';
import { useChatRoomCreate } from '@/features/chat/hooks/room/useChatRoomActions';
import { UseChatRoomsParams } from '@/features/chat/hooks/room/useChatRooms';
import { ChatRoomType } from '@/features/chat/types/room';
import { useTranslations } from 'next-intl';

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
	const t = useTranslations('chat.rooms.create');
	const router = useRouter();

	const { mutateAsync, isPending } = useChatRoomCreate({
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
					toast.error(t('dm_exists'));
					return;
				}
				throw new Error();
			}
			onMutationSuccess?.();
			toast.success(t('success'));
			const paramsString = new URLSearchParams(params).toString();
			router.push(`${ROUTES.chatId({ id: response.data.id })}?${paramsString}`);
		} catch {
			toast.error(t('failure'));
		}
	};

	return (
		<Button disabled={!usersIds.length || isPending} {...props} onClick={handleClick}>
			{isPending && <Spinner className='size-4 animate-spin' />}
			<span>{t('button')}</span>
		</Button>
	);
};

export default ChatCreateButton;
