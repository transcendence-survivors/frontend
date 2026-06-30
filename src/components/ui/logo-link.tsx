import I18nLink from '@/modules/i18n/components/I18nLink';
import { Button } from './button';
import type { RoutesWithoutParams } from '@/modules/i18n/constants/routes';

interface LogoLinkProps extends React.HTMLAttributes<HTMLButtonElement> {
	page?: RoutesWithoutParams;
}

const LOGO_TEXT = 'LA VEILLE';

const LogoLink = ({ page = 'feed', ...props }: LogoLinkProps) => {
	return (
		<Button variant='ghost' className='h-auto' asChild {...props}>
			<I18nLink href={page} className='flex justify-start items-center gap-2 py-6'>
				<span className='text-primary text-shadow-glow'>◈</span>
				<span className='font-bold font- tracking-[0.2em] text-foreground text-xs uppercase'>
					{LOGO_TEXT}
				</span>
			</I18nLink>
		</Button>
	);
};

export default LogoLink;
