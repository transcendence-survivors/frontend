import { ImageProps } from '@/libs/types';
import { cn } from '@/libs/utils';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

interface BannerProps extends HTMLAttributes<HTMLDivElement> {
	img: ImageProps;
}

const Banner = ({ img, className, ...props }: BannerProps) => {
	return (
		<div
			className={cn(
				'relative w-full aspect-3/1 border-b overflow-hidden',
				className,
			)}
			{...props}>
			<Image src={img.src} alt={img.alt} fill className='object-cover' />
		</div>
	);
};

export default Banner;
