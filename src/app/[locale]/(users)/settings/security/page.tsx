import Kicker from '@/components/ui/kicker';
import ChangePasswordForm from '@/features/auth/components/ChangePasswordForm';
import UserSettingsSidebarTrigger from '@/features/user/components/Settings/UserSettingsSidebarTrigger';
import { useTranslations } from 'next-intl';

export default function Page() {
	const t = useTranslations('settings.security');

	return (
		<main className='w-full h-main overflow-auto'>
			<section>
				<header className='px-10 py-8 flex-1 border-b border-border '>
					<div className='flex items-center justify-between'>
						<div className='space-y-2'>
							<h1>{t('title')}</h1>
							<Kicker className='text-xs'>{t('subtitle')}</Kicker>
						</div>
						<UserSettingsSidebarTrigger />
					</div>
				</header>
				<div className='px-10 pt-10 md:pt-20'>
					<div className='max-w-2xl w-full mx-auto'>
						<ChangePasswordForm />
					</div>
				</div>
			</section>
		</main>
	);
}
