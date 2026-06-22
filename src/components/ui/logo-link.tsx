import I18nLink from '@/modules/i18n/components/I18nLink';
import { Button } from './button';

interface LogoLinkProps extends React.HTMLAttributes<HTMLButtonElement> {}

const LOGO_TEXT = 'LA VEILLE';

const LogoLink = ({ ...props }: LogoLinkProps) => {
	return (
		<Button variant='ghost' className='h-auto' asChild {...props}>
			<I18nLink href='home' className='flex justify-start items-center gap-2 py-6'>
				<span className='text-primary text-shadow-glow'>◈</span>
				<span className='font-bold font- tracking-[0.2em] text-foreground text-xs uppercase '>
					{LOGO_TEXT}
				</span>
			</I18nLink>
		</Button>
	);
};

export default LogoLink;
