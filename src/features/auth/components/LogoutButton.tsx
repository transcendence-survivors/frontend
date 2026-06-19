'use client';

import { Spinner } from '@/components/ui/spinner';
import { useTranslations } from 'next-intl';
import useSignOut from '../hooks/useSignOut';
import { Button } from '@/components/ui/button';

const LogoutButton = () => {
	const t = useTranslations('auth.signout');
	const { isPending, mutate, isError } = useSignOut({
		successMessage: t('success'),
		errorMessage: t('error'),
	});

	const handleLogout = () => {
		mutate();
	};

	return (
		<Button
			variant='destructive'
			size='sm'
			className='w-full'
			onClick={handleLogout}
			disabled={isPending || isError}>
			<>{isPending ? <Spinner /> : t('label')}</>
		</Button>
	);
};

export default LogoutButton;
