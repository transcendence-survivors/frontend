import { cn } from '@/libs/utils';

interface RoundedLightProps extends React.HTMLAttributes<HTMLSpanElement> {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
const sizeClasses = {
	xs: 'w-2',
	sm: 'w-3',
	md: 'w-4',
	lg: 'w-5',
	xl: 'w-6',
};

const RoundedLight = ({ className, size = 'md', ...props }: RoundedLightProps) => {
	return (
		<span
			className={cn(
				sizeClasses[size],
				'rounded-full aspect-square bg-background/30 border border-muted-foreground/20 transition origin-center',
				'data-[active=true]:bg-accent data-[active=true]:border-accent',
				'data-[active=true]:shadow-gold-glow',
				'data-[active=true]:scale-105',
				className,
			)}
			{...props}
		/>
	);
};

export default RoundedLight;
