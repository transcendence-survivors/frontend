import { HTMLAttributes } from 'react';
import { cn } from '@/libs/utils';
import { ImageModal } from '@ui/image-modal';
import { ImageProps } from '@/libs/types';
import { Search } from 'lucide-react';

interface BannerProps extends HTMLAttributes<HTMLDivElement> {
	img: ImageProps;
}

const Banner = ({ img: { src = '', alt }, className, ...props }: BannerProps) => {
	console.log('Banner component rendered with src:', src, 'and alt:', alt);

	return (
		<div
			className={cn(
				'relative w-full aspect-3/1 border-b overflow-hidden bg-secondary text-secondary-foreground',
				className,
			)}
			{...props}>
			<ImageModal
				src={src}
				alt={alt}
				thumbnailClassName='w-full h-full absolute inset-0 rounded-none'
				thumbnailFit='object-cover'
				modalClassName='aspect-3/1 max-h-[85vh] h-auto rounded-none'>
				<Search className='size-10 stroke-white/70' />
			</ImageModal>
		</div>
	);
};

export default Banner;
