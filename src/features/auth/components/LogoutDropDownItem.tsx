'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import useLogOut from '@/features/auth/hooks/useLogOut';
import { useTranslations } from 'next-intl';

const LogoutDropDownItem = () => {
	const t = useTranslations('nav');
	const { isPending, mutate } = useLogOut();

	const handleLogout = async () => {
		mutate();
	};

	return (
		<DropdownMenuItem
			variant='destructive'
			onClick={handleLogout}
			disabled={isPending}>
			{isPending ? <Spinner /> : t('logout')}
		</DropdownMenuItem>
	);
};

export default LogoutDropDownItem;
