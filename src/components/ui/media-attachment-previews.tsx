import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { MediaModal } from '@/components/ui/media-modal';
import { X } from 'lucide-react';

export interface MediaPreviewItem {
	file: File;
	url: string;
	type: 'image' | 'video';
}

interface MediaAttachmentPreviewsProps {
	previews: MediaPreviewItem[];
	onRemove: (index: number) => void;
	className?: string;
	itemClassName?: string;
}

export const MediaAttachmentPreviews = memo(
	({
		previews,
		onRemove,
		className = 'flex flex-wrap gap-2 border-b border-border py-3',
		itemClassName = 'size-20',
	}: MediaAttachmentPreviewsProps) => {
		if (previews.length === 0) return null;

		return (
			<div aria-live='polite' className={className}>
				{previews.map(({ file, url, type }, index) => (
					<div
						key={`${file.name}-${file.lastModified}-${index}`}
						className={`group relative overflow-hidden rounded-md border border-border bg-muted ${itemClassName}`}>
						<MediaModal
							src={url}
							alt={file.name}
							type={type}
							thumbnailClassName='size-full rounded-none object-cover'
							modalClassName='min-w-[300px] min-h-[300px] max-h-[85vh]'
						/>

						<Button
							type='button'
							variant='destructive'
							size='icon'
							className='absolute right-1 top-1 z-20 size-5 rounded-full p-0 shadow-sm'
							onClick={() => onRemove(index)}
							aria-label={`Remove ${file.name}`}>
							<X className='size-3' aria-hidden='true' />
						</Button>
					</div>
				))}
			</div>
		);
	},
);

MediaAttachmentPreviews.displayName = 'MediaAttachmentPreviews';
