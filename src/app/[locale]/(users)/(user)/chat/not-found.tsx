import { useTranslations } from 'next-intl';

export default function NotFound() {
	const t = useTranslations('common.not_found');

	return (
		<main className='py-24 min-h-full flex items-center justify-center mx-auto w-full'>
			<div className='px-10'>
				<h1 className='text-5xl font-bold text-center'>{t('chat_room')}</h1>
			</div>
		</main>
	);
}
