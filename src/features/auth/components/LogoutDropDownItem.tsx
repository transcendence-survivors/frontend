'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import { useTranslations } from 'next-intl';
import useSignOut from '../hooks/useSignOut';

const LogoutDropDownItem = () => {
	const t = useTranslations('auth.signout');
	const { isPending, mutate, isError } = useSignOut({
		successMessage: t('success'),
		errorMessage: t('error'),
	});

	const handleLogout = () => {
		mutate();
	};

	return (
		<DropdownMenuItem
			variant='destructive'
			onClick={handleLogout}
			disabled={isPending || isError}>
			{isPending ? <Spinner /> : t('label')}
		</DropdownMenuItem>
	);
};

export default LogoutDropDownItem;
