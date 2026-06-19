import I18nLink from '@/modules/i18n/components/I18nLink';
import { Button } from './button';

interface LogoLinkProps extends React.HTMLAttributes<HTMLButtonElement> {}

const LogoLink = (props: LogoLinkProps) => {
	return (
		<Button variant='ghost' asChild {...props}>
			<I18nLink href='home' className='flex justify-start items-center gap-2'>
				<span
					className='text-primary'
					style={{ textShadow: '0 0 12px rgba(240,163,24,0.7)' }}>
					◈
				</span>
				<span
					className='font-bold tracking-[0.2em] text-foreground text-xs'
					style={{ fontFamily: "'Cinzel', serif" }}>
					LA VEILLE
				</span>
			</I18nLink>
		</Button>
	);
};

export default LogoLink;
