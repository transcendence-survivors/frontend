import Image from 'next/image';
import { cn } from '@/libs/utils';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './button';

interface ImageModalProps {
	src: string;
	alt: string;
	thumbnailClassName?: string;
	modalClassName?: string;
	thumbnailFit?: 'object-cover' | 'object-contain' | 'object-scale-down';
	children?: React.ReactNode;
}

export function ImageModal({
	src,
	alt,
	thumbnailClassName = 'w-full aspect-square',
	modalClassName = 'aspect-video max-h-[85vh]',
	thumbnailFit = 'object-cover',
	children,
}: ImageModalProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={'ghost'}
					className={cn(
						'relative  z-10 overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity group',
						thumbnailClassName,
					)}>
					<Image src={src} alt={alt} fill className={cn(thumbnailFit)} />
					<div
						className='
                        absolute inset-0 bg-black/20 text-white text-sm font-medium \
                        opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 \
                        transition-opacity flex items-center justify-center '>
						{children}
					</div>
				</Button>
			</DialogTrigger>

			<DialogContent className='w-screen !max-w-[90vw] p-0 border-none bg-transparent shadow-none ring-0 sm:rounded-none'>
				<div className={cn('relative w-full', modalClassName)}>
					<Image
						src={src}
						alt={alt}
						fill
						className='object-contain rounded-md'
						priority
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
