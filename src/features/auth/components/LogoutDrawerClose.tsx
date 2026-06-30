'use client';

import { Spinner } from '@/components/ui/spinner';
import { useTranslations } from 'next-intl';
import useSignOut from '../hooks/useSignOut';
import { DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

const LogoutDrawerClose = () => {
	const t = useTranslations('auth.signout');
	const { isPending, mutate, isError } = useSignOut({
		successMessage: t('success'),
		errorMessage: t('error'),
	});

	const handleLogout = () => {
		mutate();
	};

	return (
		<DrawerClose onClick={handleLogout} disabled={isPending || isError} asChild>
			<Button variant='destructive' size='sm' className='w-full'>
				<>{isPending ? <Spinner /> : t('label')}</>
			</Button>
		</DrawerClose>
	);
};

export default LogoutDrawerClose;
