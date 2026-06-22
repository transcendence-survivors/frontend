import { HTMLAttributes } from 'react';
import Image from 'next/image';
import { cn } from '@/libs/utils';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ImageProps } from '@/libs/types';
import { Button } from '@/components/ui/button';
import { AvatarProfileFallback } from './AvatarProfile';

interface AvatarModalProps extends HTMLAttributes<HTMLDivElement> {
	img: ImageProps;
	avatarClassName?: string;
	size?: 'default' | 'sm' | 'lg';
}

const sizeClasses = {
	default: 'size-30 p-1',
	sm: 'size-6',
	lg: 'size-10',
} satisfies Record<NonNullable<AvatarModalProps['size']>, string>;

export function AvatarModal({
	img,
	className,
	size = 'default',
	...props
}: AvatarModalProps) {
	return (
		<Dialog>
			<Avatar
				className={cn(
					'rounded-full shadow-gold-glow-lg bg-secondary text-3xl',
					className,
					sizeClasses[size],
				)}
				{...props}>
				<DialogTrigger asChild>
					<Button
						variant='ghost'
						size={'icon-lg'}
						className={
							'rounded-full z-10 cursor-pointer w-full h-full hover:opacity-80 focus-visible:opacity-80 transition-opacity empty:hidden'
						}>
						<AvatarImage
							className={`object-cover rounded-full`}
							src={img.src}
							alt={img.alt}
						/>
					</Button>
				</DialogTrigger>
				<AvatarProfileFallback username={img.alt || '??'} />
			</Avatar>

			<DialogContent className='max-w-md w-[90vw] aspect-square border-none bg-transparent p-0 shadow-none rounded-none ring-0 sm:rounded-none'>
				<div className='relative w-full h-full'>
					<Image
						src={img.src || ''}
						alt={img.alt || 'Avatar Preview'}
						fill
						className='object-contain'
						priority
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
