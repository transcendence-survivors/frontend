'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FileVideo, X } from 'lucide-react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';

export interface MediaModalProps {
	src: string;
	alt: string;
	type?: 'image' | 'video';
	thumbnailClassName?: string;
	modalClassName?: string;
	thumbnailFit?: string;
	loading?: 'lazy' | 'eager';
	children?: React.ReactNode;
	fallback?: React.ReactNode;
}

export const MediaModal = ({
	src,
	alt,
	type = 'image',
	thumbnailClassName = 'w-full aspect-square',
	modalClassName = 'aspect-video max-h-[85vh]',
	thumbnailFit = 'object-cover',
	loading = 'lazy',
	children,
	fallback,
}: MediaModalProps) => {
	const [error, setError] = useState(false);

	if (error) {
		return fallback ?? null;
	}

	const isVideo = type === 'video';

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type='button'
					variant='secondary'
					className={cn(
						'relative z-10 p-0 max-h-full cursor-pointer focus:opacity-80 hover:opacity-80 transition-opacity group',
						thumbnailClassName,
					)}>
					{isVideo ? (
						<div className='size-full bg-muted'>
							<video
								src={src}
								className={cn('size-full', thumbnailFit)}
								onError={() => setError(true)}
							/>
							<div className='absolute inset-0 flex items-center justify-center bg-black/30'>
								<FileVideo className='size-5 text-white' />
							</div>
						</div>
					) : (
						<Image
							src={src}
							alt={alt}
							fill
							className={thumbnailFit}
							loading={loading}
							onError={() => setError(true)}
						/>
					)}

					{children && (
						<div
							className='
                                absolute inset-0 bg-black/20 text-white text-sm font-medium
                                opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100
                                transition-opacity flex items-center justify-center
                            '>
							{children}
						</div>
					)}
				</Button>
			</DialogTrigger>

			<DialogContent
				className='w-fit max-w-[90vw]! p-0 shadow-none ring-0 bg-card border border-border rounded overflow-clip'
				showCloseButton={false}>
				<DialogClose
					className='cursor-pointer absolute right-4 top-4 z-10 p-1 
                    text-muted-foreground bg-background transition-colors rounded
                    hover:text-foreground hover:bg-muted'>
					<X className='size-4' />
				</DialogClose>
				<div
					className={cn(
						'relative flex items-center justify-center',
						modalClassName,
					)}>
					{isVideo ? (
						<video
							src={src}
							controls
							autoPlay
							className='max-h-[85vh] max-w-full min-w-full object-contain'
							onError={() => setError(true)}
						/>
					) : (
						<Image
							src={src}
							alt={alt}
							fill
							className='object-cover'
							priority
							onError={() => setError(true)}
						/>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};
