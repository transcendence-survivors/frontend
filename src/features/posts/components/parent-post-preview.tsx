import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import I18nLink from '@/modules/i18n/components/I18nLink';

interface ParentPostPreviewProps {
	postId: string;
	username: string;

	parent: {
		content?: string;
		author: {
			displayName: string;
			username: string;
			avatarUrl?: string;
		};
	};
}

export default function ParentPostPreview({
	postId,
	username,
	parent,
}: ParentPostPreviewProps) {
	return (
		<I18nLink
			href='userNamePostsId'
			hrefParams={{ username: `@${username}`, id: postId }}
			className='relative z-10 block mt-2 w-full rounded-2xl border border-border p-3 hover:bg-muted/30 transition-colors'>
			<div className='flex items-center gap-2'>
				<Avatar className='size-6'>
					<AvatarImage src={parent.author.avatarUrl} />
					<AvatarFallback>{parent.author.displayName.charAt(0)}</AvatarFallback>
				</Avatar>
				<span className='font-semibold text-sm'>
					{parent.author.displayName}{' '}
				</span>
				<span className='text-sm text-muted-foreground'>
					@{parent.author.username}{' '}
				</span>
			</div>
			<p className='mt-1 text-sm'>{parent.content}</p>
		</I18nLink>
	);
}
