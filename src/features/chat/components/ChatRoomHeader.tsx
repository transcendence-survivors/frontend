import { Button } from '@/components/ui/button';
import { AvatarProfile } from '@/features/user/components/Avatar/AvatarProfile';
import { BaseUser } from '@/features/user/type';
import { cn } from '@/libs/utils';
import { ArrowLeft, MoreHorizontal, Settings2 } from 'lucide-react';

interface ChatRoomHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	id: string;
	user: BaseUser;
}

const ChatRoomHeader = ({ id, user, className, ...props }: ChatRoomHeaderProps) => {
	return (
		<header
			className={cn(
				'grid grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-4 py-3 md:px-6 md:py-4',
				className,
			)}
			{...props}>
			<button className='md:hidden'>
				<ArrowLeft className='h-5 w-5' />
			</button>
			<AvatarProfile
				size='md'
				img={{
					src: user.avatarUrl ?? `https://avatarssinitials.ssvg`,
					alt: user.displayName,
				}}
			/>

			<div className='min-w-0'>
				<div className='truncate font-semibold'>{user.displayName}</div>
				<div className='truncate font-mono text-[11px] text-muted-foreground'>
					Online · in the dark together
				</div>
			</div>
			<div className='flex gap-1 text-muted-foreground'>
				<Button
					variant='ghost'
					size='icon'
					className='rounded p-2 hover:bg-muted hover:text-foreground'>
					<Settings2 className='size-4' />
				</Button>
				<Button
					variant='ghost'
					size='icon'
					className='rounded p-2 hover:bg-muted hover:text-foreground'>
					<MoreHorizontal className='size-4' />
				</Button>
			</div>
		</header>
	);
};

export default ChatRoomHeader;
