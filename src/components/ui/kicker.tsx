import { cn } from '@/libs/utils';

interface KickerProps extends React.HTMLAttributes<HTMLSpanElement> {}

const Kicker = ({ children, className, ...props }: KickerProps) => {
	return (
		<span
			className={cn(
				'font-mono uppercase tracking-widest leading-none block text-2xs text-muted-foreground text-[10px] ',
				className,
			)}
			{...props}>
			{children}
		</span>
	);
};

export default Kicker;
