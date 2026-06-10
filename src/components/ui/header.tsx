import { cn } from '@/libs/utils';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
	children: React.ReactNode;
}

const Header = ({ children, className, ...props }: HeaderProps) => {
	return (
		<header
			className={cn(
				'bg-background text-foreground flex items-center justify-between px-6\
                border-b border-border',
				className,
			)}
			{...props}>
			{children}
		</header>
	);
};

export default Header;
