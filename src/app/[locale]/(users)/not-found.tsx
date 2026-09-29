import { useTranslations } from 'next-intl';

export default function NotFound() {
	const t = useTranslations('common.not_found');

	return (
		<main className='py-24 min-h-[85vh] flex items-center justify-center mx-auto w-full'>
			<div className='px-10'>
				<h1 className='text-5xl font-bold text-center'>{t('resource')}</h1>
			</div>
		</main>
	);
}
