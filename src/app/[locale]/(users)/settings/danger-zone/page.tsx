'use client';

import Kicker from '@/components/ui/kicker';
import { Spinner } from '@/components/ui/spinner';
import { ProfileSettingsForm } from '@/features/user/components/Settings/ProfileSettingsForm';
import UserSettingsSidebarTrigger from '@/features/user/components/Settings/UserSettingsSidebarTrigger';
import { useUserSettings } from '@/features/user/hooks/useUserSettings';
import { useTranslations } from 'next-intl';

export default function Page() {
	const { data: user, isError, isLoading } = useUserSettings();
	const t = useTranslations('settings');

	if (isLoading) {
		return <Spinner />;
	}

	if (isError || !user) {
		return <p className='text-red-500'>{t('error_loading')}</p>;
	}

	return (
		<main className='w-full h-main overflow-auto'>
			<section>
				<header className='px-10 py-8 flex-1 border-b border-border '>
					<div className='flex items-center justify-between'>
						<div className='space-y-2'>
							<h1>{t('profile.title')}</h1>
							<Kicker className='text-xs'>{t('profile.subtitle')}</Kicker>
						</div>
						<UserSettingsSidebarTrigger />
					</div>
				</header>
				<div className='px-10 pt-10 md:pt-20'>
					<div className='max-w-2xl w-full mx-auto'>
						<ProfileSettingsForm user={user} />
					</div>
				</div>
			</section>
		</main>
	);
}
