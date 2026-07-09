import {
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
import { usePresenceStatus } from '../hooks/usePresenceState';
import { AppMessages } from '@/modules/i18n/messages/types';
import { DeepKeys } from '@/libs/types';
import { PresenceStatus } from '../types/status';
import { usePresenceActions } from '../hooks/usePresenceActions';
import { AvatarProfileBadge } from '@/features/user/components/Avatar/AvatarProfile';

const li = [
	{
		titleKey: 'online',
		descriptionKey: 'online_description',
		status: PresenceStatus.ONLINE,
	},
	{
		titleKey: 'do_not_disturb',
		descriptionKey: 'do_not_disturb_description',
		status: PresenceStatus.DO_NOT_DISTURB,
	},
	{
		titleKey: 'invisible',
		descriptionKey: 'invisible_description',
		status: PresenceStatus.INVISIBLE,
	},
] satisfies {
	titleKey: DeepKeys<AppMessages['presence']>;
	descriptionKey: DeepKeys<AppMessages['presence']>;
	status: PresenceStatus;
}[];

const PresenceDropDownSubMenu = () => {
	const t = useTranslations('presence');
	const status = usePresenceStatus();
	const { goStatus } = usePresenceActions();

	const currentStatus = li.find((item) => item.status === status.status);
	const handleStatusChange = (newStatus: PresenceStatus) => {
		if (newStatus !== status.status) {
			goStatus(newStatus);
		}
	};

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger className='bg-card py-2 '>
				<AvatarProfileBadge
					badgeState={status.status}
					className='mr-2 size-2 static'
				/>
				{currentStatus ? t(currentStatus.titleKey) : t('online')}
			</DropdownMenuSubTrigger>
			<DropdownMenuPortal>
				<DropdownMenuSubContent
					className='bg-background space-y-1'
					sideOffset={10}
					alignOffset={-50}>
					{li.map((item) => (
						<DropdownMenuItem
							key={item.titleKey}
							className='bg-card max-w-60 cursor-pointer'
							onClick={() => handleStatusChange(item.status)}>
							<div className='flex flex-col gap-1 max-w-60 '>
								<span className='font-semibold'>
									<AvatarProfileBadge
										badgeState={item.status}
										className='mr-2 size-2 static'
									/>
									{t(item.titleKey)}
								</span>
								<span className='text-xs text-muted-foreground text-light'>
									{t(item.descriptionKey)}
								</span>
							</div>
						</DropdownMenuItem>
					))}
				</DropdownMenuSubContent>
			</DropdownMenuPortal>
		</DropdownMenuSub>
	);
};

export default PresenceDropDownSubMenu;
