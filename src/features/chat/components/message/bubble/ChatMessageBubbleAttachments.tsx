import { MediaModal } from '@/components/ui/media-modal';

interface ChatMessageBubbleAttachmentsProps {
	attachmentUrls: string[];
}

export const ChatMessageBubbleAttachments = ({
	attachmentUrls,
}: ChatMessageBubbleAttachmentsProps) => {
	return (
		<ul className={`flex flex-wrap gap-2`}>
			{attachmentUrls.map((url, index) => {
				const isVideo = url.endsWith('.mp4') || url.endsWith('.webm');
				return (
					<li
						key={`${url}-${index}`}
						className='relative size-50 overflow-hidden rounded-lg border border-border/50 bg-muted/50'>
						<MediaModal
							src={url}
							alt={`Attachment ${index + 1}`}
							type={isVideo ? 'video' : 'image'}
							thumbnailClassName='size-full object-cover  rounded-none transition-transform duration-200 hover:scale-105'
							modalClassName='min-h-[min(800px,80vh)] min-w-[min(800px,80vw)] max-h-[85vh]'
						/>
					</li>
				);
			})}
		</ul>
	);
};
