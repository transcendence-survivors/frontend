import { HTMLAttributes } from 'react';
import Image from 'next/image';
import { capitalize, cn, truncate } from '@/libs/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ImageProps } from '@/libs/types';
import { Button } from '@/components/ui/button';

interface AvatarModalProps extends HTMLAttributes<HTMLDivElement> {
	img: ImageProps;
	avatarClassName?: string;
}

export function AvatarModal({ img, avatarClassName, ...props }: AvatarModalProps) {
	return (
		<Dialog>
			<Avatar
				className={cn(
					'w-full aspect-square h-auto rounded-full',
					avatarClassName,
				)}
				{...props}>
				<DialogTrigger asChild>
					<Button
						variant='ghost'
						size={'icon-lg'}
						className={cn(
							'rounded-full z-10 cursor-pointer w-fit h-fit hover:opacity-90 transition-opacity',
							avatarClassName,
						)}>
						<AvatarImage
							className='bg-foreground object-cover w-full aspect-square h-auto rounded-full'
							src={img.src + ''}
							alt={img.alt}
						/>
					</Button>
				</DialogTrigger>

				<AvatarFallback>
					{capitalize(truncate(img.alt || '??', 2))}
				</AvatarFallback>
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
