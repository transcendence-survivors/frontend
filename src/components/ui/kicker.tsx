import { cn } from '@/libs/utils';

type KickerProps = React.HTMLAttributes<HTMLSpanElement>;

const Kicker = ({ children, className, ...props }: KickerProps) => {
	return (
		<span
			className={cn(
				'font-mono uppercase tracking-widest font-light leading-none block text-muted-foreground text-[10px]',
				className,
			)}
			{...props}>
			{children}
		</span>
	);
};

export default Kicker;
