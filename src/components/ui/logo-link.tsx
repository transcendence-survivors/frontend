import I18nLink from '@/modules/i18n/components/I18nLink';
import { Button } from './button';
import type { RoutesWithoutParams } from '@/modules/i18n/constants/routes';
import { cn } from '@/libs/utils';

interface LogoLinkProps extends React.HTMLAttributes<HTMLButtonElement> {
	page?: RoutesWithoutParams;
	size?: keyof typeof sizeClasses;
}

const LOGO_TEXT = 'LIGHT KEEPERS';

const sizeClasses = {
	xs: 'text-xs',
	sm: 'text-sm',
	md: 'text-base',
	lg: 'text-lg',
	xl: 'text-xl',
};

const iconSizeClasses = {
	xs: 'text-md',
	sm: 'text-xl',
	md: 'text-2xl',
	lg: 'text-3xl',
	xl: 'text-4xl',
};

const LogoLink = ({ page = 'feed', size = 'sm', className, ...props }: LogoLinkProps) => {
	return (
		<Button variant='ghost' className='h-auto' asChild {...props}>
			<I18nLink
				href={page}
				className={cn('inline-flex items-center gap-2 py-2', className)}>
				<span className='inline-flex items-center justify-center leading-none select-none'>
					<span
						className={`block leading-none text-primary text-shadow-glow translate-y-[-8%] ${iconSizeClasses[size]}`}>
						◈
					</span>
				</span>
				<span
					className={`font-bold tracking-[0.2em] text-foreground ${sizeClasses[size]} uppercase leading-none`}>
					{LOGO_TEXT}
				</span>
			</I18nLink>
		</Button>
	);
};

export default LogoLink;
