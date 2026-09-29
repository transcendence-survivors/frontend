import LogoLink from '@/components/ui/logo-link';
import { cn } from '@/libs/utils';
import Kicker from '@/components/ui/kicker';
import { useTranslations } from 'next-intl';
import HubFooter from './HubFooter';
import HubNav from './HubNav';

type HubSidebarProps = React.HTMLAttributes<HTMLElement>;

const HubSidebar = ({ className, ...props }: HubSidebarProps) => {
	const t = useTranslations('nav');

	return (
		<aside
			className={cn(
				'fixed max-h-dvh top-0 left-0 bottom-0 bg-sidebar text-sidebar-foreground/80 border-r border-sidebar-border z-40 overflow-clip',
				className,
			)}
			{...props}>
			<div className='flex flex-col h-full'>
				<div className='px-3 py-3 space-y-2'>
					<div className='border-b border-sidebar-border py-2'>
						<LogoLink className='w-full py-6' />
					</div>
				</div>

				<nav className='flex-1 overflow-y-auto py-1'>
					<Kicker className='py-2 px-5'>{t('player_hub')}</Kicker>
					<HubNav />
				</nav>
				<HubFooter />
			</div>
		</aside>
	);
};

export default HubSidebar;
