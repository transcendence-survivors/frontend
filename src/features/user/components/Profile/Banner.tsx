import { HTMLAttributes } from 'react';
import { cn } from '@/libs/utils';
import { ImageModal } from '@ui/image-modal';
import { ImageProps } from '@/libs/types';
import { Search } from 'lucide-react';

interface BannerProps extends HTMLAttributes<HTMLDivElement> {
	img: ImageProps;
}

{
	/* <div class="absolute inset-0" style="background: radial-gradient(70% 100% at 60% 50%, rgba(240, 163, 24, 0.15) 0%, transparent 60%);" data-fg-d3bl265="0.8:3.65464:/src/app/App.tsx:803:9:37666:201:e:div" data-fgid-d3bl265=":r759:"></div> */
}
// bg-[radial-gradient(70% 100% at 60% 50%, rgba(240, 163, 24, 0.15) 0%, transparent 60%)]
const Banner = ({ img: { src = '', alt }, className, ...props }: BannerProps) => {
	return (
		<div
			className={cn(
				'relative w-full  aspect-3/1 border-b bg-[radial-gradient(70%_100%_at_60%_50%,rgba(240,163,24,0.15)_0%,transparent_60%)] overflow-hidden text-secondary-foreground',
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
