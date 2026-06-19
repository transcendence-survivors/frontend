import LogoLink from '@/components/ui/logo-link';
import AvatarProfileLink from '@/features/user/components/Avatar/AvatarProfileLink';
import UserDisplayUsername from '@/features/user/components/UserDisplayUsername';
import { cn } from '@/libs/utils';
import I18nLink from '@/modules/i18n/components/I18nLink';
import DashboardNav from './DashboardNav';
import { LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogoutButton from '@/features/auth/components/LogoutButton';

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLElement> {}

const DashboardSidebar = ({ className, ...props }: DashboardSidebarProps) => {
	return (
		<aside
			className={cn(
				'fixed max-h-dvh top-0 left-0 bottom-0 bg-sidebar text-sidebar-foreground/80 border-r border-sidebar-border flex flex-col z-40',
				className,
			)}
			{...props}>
			<div className='px-3 py-6 border-b border-sidebar-border space-y-3'>
				<LogoLink className='w-full' />
				<div className='flex items-center gap-3'>
					<AvatarProfileLink
						avatar={{
							img: { src: 'https://example.com/avatar.jpg', alt: 'test' },
						}}
						username='username'
					/>
					<UserDisplayUsername
						displayName='Elara Vélinne'
						username='elara_veil'
					/>
				</div>
			</div>

			<nav className='flex-1 overflow-y-auto py-3'>
				<DashboardNav />
			</nav>

			<div className='p-3 border-t border-sidebar-border space-y-2'>
				<Button asChild variant='outline' className='w-full justify-start '>
					<I18nLink href='settings'>
						<Settings size={16} />
						Settings
					</I18nLink>
				</Button>
				<Button variant='outline' className='w-full justify-start gap-3'>
					<LogOut size={16} />
					Sign Out
				</Button>
				<LogoutButton />
			</div>
		</aside>
	);
};

export default DashboardSidebar;
