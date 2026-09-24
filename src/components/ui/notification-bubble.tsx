import { cn } from '@/libs/utils';

interface NotificationBubbleProps extends React.HTMLAttributes<HTMLSpanElement> {
	count: number;
}

const NotificationBubble = ({ count, className, ...props }: NotificationBubbleProps) => {
	return (
		<span
			className={cn(
				'bg-primary text-primary-foreground flex items-center justify-center aspect-square rounded-md p-0.5 leading-none text-[10px] font-semibold',
				className,
			)}
			{...props}>
			{count > 99 ? '99+' : count}
		</span>
	);
};

export default NotificationBubble;
