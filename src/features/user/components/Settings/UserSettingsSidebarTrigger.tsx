'use client';

import { Button } from '@/components/ui/button';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useUserSettingsSidebar } from './UserSettingsSidebarProvider';

type UserSidebarTriggerProps = React.ComponentProps<typeof Button>;

const UserSettingsSidebarTrigger = ({ ...props }: UserSidebarTriggerProps) => {
	const { isOpen, toggle } = useUserSettingsSidebar();

	return (
		<Button
			variant={isOpen ? 'secondary' : 'ghost'}
			size='icon'
			onClick={toggle}
			data-active={isOpen}
			{...props}>
			{isOpen ? (
				<PanelLeftClose className='size-4' />
			) : (
				<PanelLeftOpen className='size-4' />
			)}
		</Button>
	);
};

export default UserSettingsSidebarTrigger;
