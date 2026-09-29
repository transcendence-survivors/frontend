import GoTop from '@/components/ui/goTop';
import Kicker from '@/components/ui/kicker';
import { SearchParamsInput } from '@/components/ui/search-param-input';
import { getTranslations } from 'next-intl/server';
import SearchTabs from './components/SearchTabs';

export default async function Search() {
	const t = await getTranslations('search');

	return (
		<main>
			<header className='px-10 py-8 border-b border-border'>
				<div className='space-y-2'>
					<h1 className='text-3xl font-extrabold'>{t('title')}</h1>
					<Kicker className='text-xs'>{t('subtitle')}</Kicker>
				</div>
			</header>
			<div className='px-10 py-6 pb-8'>
				<div className='max-w-4xl mx-auto flex flex-col gap-6'>
					<SearchParamsInput
						paramKey='search'
						placeholder={t('input_placeholder')}
						className='w-full h-10'
					/>
					<SearchTabs />
				</div>
			</div>
			<GoTop />
		</main>
	);
}
