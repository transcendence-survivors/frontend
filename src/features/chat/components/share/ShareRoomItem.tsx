'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { ChatRoom } from '../../types/room';
import ChatRoomAvatar from '../room/ChatRoomAvatar';
import { getRoomName } from '../../utils/room';
import { cn } from '@/libs/utils';
import { useTranslations } from 'next-intl';

interface ShareRoomItemProps {
	room: ChatRoom;
	isSelected: boolean;
	onToggle: (roomId: string) => void;
}

export const ShareRoomItem = React.memo(
	({ room, isSelected, onToggle }: ShareRoomItemProps) => {
		const t = useTranslations('chat.messages.system');
		const name = getRoomName(room) ?? t('deleted_user_fallback');

		return (
			<li>
				<button
					type='button'
					onClick={() => onToggle(room.id)}
					className={cn(
						'w-full flex items-center justify-between p-2 rounded-md transition-colors text-left text-xs cursor-pointer',
						isSelected
							? 'bg-primary/10 text-primary font-medium'
							: 'bg-muted hover:bg-card',
					)}>
					<div className='flex items-center gap-2.5 min-w-0'>
						<ChatRoomAvatar room={room} />
						<span className='truncate font-medium'>{name}</span>
					</div>

					<div
						className={cn(
							'size-4 rounded-full border flex items-center justify-center shrink-0 ml-2',
							isSelected
								? 'bg-primary border-primary text-primary-foreground'
								: 'border-muted-foreground/30',
						)}>
						{isSelected && <Check className='size-3 stroke-[3]' />}
					</div>
				</button>
			</li>
		);
	},
);

ShareRoomItem.displayName = 'ShareRoomItem';
