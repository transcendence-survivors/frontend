import { Button } from '@/components/ui/button';
import { PresenceStatus } from '@/features/presence/types/status';
import { AvatarProfile } from '@/features/user/components/Avatar/AvatarProfile';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { ChatRoom, ChatRoomType } from '../types';

interface ChatCardProps {
	c: ChatRoom;
	isActive?: boolean;
	state: PresenceStatus;
}

const ChatRoomCard = ({
	c: { avatarUrl, lastMessage, name, type, otherMember, id },
	isActive,
	state,
}: ChatCardProps) => {
	const isDirect = type === ChatRoomType.DIRECT;

	const imgProps =
		isDirect && otherMember
			? {
					src: otherMember.avatarUrl || ``,
					alt: otherMember.displayName,
				}
			: { src: avatarUrl || ``, alt: name || 'Chat Room' };

	return (
		<Button
			variant='sidebar'
			size='lg'
			data-active={isActive}
			className={`h-auto grid w-full grid-cols-[auto_minmax(0,1fr)_auto] gap-3 px-4 py-3 text-left  ${isActive ? '' : 'border-b border-border'}`}
			asChild>
			<I18nLink href={'chatId'} hrefParams={{ id: id }}>
				<AvatarProfile size='md' img={imgProps} badgeState={state} />

				<div className='min-w-0'>
					<div className='truncate text-sm font-semibold'>
						{isDirect && otherMember
							? otherMember.displayName
							: name || 'Chat Room'}
					</div>
					<div className='truncate text-xs text-muted-foreground'>
						{lastMessage?.content || 'No messages yet'}
					</div>
				</div>

				{lastMessage && (
					<div className='flex shrink-0 flex-col items-end gap-1'>
						<span className='font-mono text-[10px] text-muted-foreground'>
							{lastMessage?.createdAt}
						</span>
						{/* {c.unread && (
							<span className='rounded-sm bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground'>
								{c.unread}
							</span>
						)} */}
					</div>
				)}
			</I18nLink>
		</Button>
	);
};

export default ChatRoomCard;
