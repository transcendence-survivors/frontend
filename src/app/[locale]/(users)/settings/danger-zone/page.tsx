'use client';

import { useTranslations } from 'next-intl';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Kicker from '@/components/ui/kicker';
import UserSettingsSidebarTrigger from '@/features/user/components/Settings/UserSettingsSidebarTrigger';
import DeleteAccountDialog from '@/features/auth/components/DeleteAccountDialog';
import { ExportUserDataCard } from '@/features/user/components/ExportUserDataCard';

export default function Page() {
	const t = useTranslations('settings.danger_zone');

	return (
		<main className='w-full h-main overflow-auto'>
			<section>
				<header className='px-10 py-8 flex-1 border-b border-border'>
					<div className='flex items-center justify-between'>
						<div className='space-y-2'>
							<h1>{t('title')}</h1>
							<Kicker className='text-xs'>{t('subtitle')}</Kicker>
						</div>
						<UserSettingsSidebarTrigger />
					</div>
				</header>

				<div className='px-10 pt-10 md:pt-14 pb-12'>
					<div className='max-w-2xl w-full mx-auto space-y-6'>
						<ExportUserDataCard />

						<Card className='border-destructive/40 bg-destructive/5'>
							<CardHeader>
								<CardTitle className='text-base font-semibold text-destructive'>
									{t('delete.title')}
								</CardTitle>
								<CardDescription>
									{t('delete.description')}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<DeleteAccountDialog />
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</main>
	);
}
