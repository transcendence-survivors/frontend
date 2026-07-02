import GoTop from '@/components/ui/goTop';
import Kicker from '@/components/ui/kicker';
import { SearchParamInput } from '@/components/ui/search-param-input';
import FriendAddDialog from '@/features/friends/components/FriendAddDialog';
import FriendNav from '@/features/friends/components/FriendNav';
import { getTranslations } from 'next-intl/server';

export default async function FriendsLayout({ children }: { children: React.ReactNode }) {
	const t = await getTranslations('friend_page');

	return (
		<main>
			<div className='friend-sticky-if-tall flex flex-col'>
				<header className='px-10 py-8 flex-1 border-b border-border flex items-center justify-between'>
					<div className='space-y-2'>
						<h1 className='text-3xl font-extrabold'>{t('title')}</h1>
						<Kicker className='text-xs'>{t('subtitle')}</Kicker>
					</div>
					<FriendAddDialog />
				</header>
				<div className='px-10 mt-6'>
					<div className='max-w-4xl mx-auto pb-2'>
						<FriendNav />
						<SearchParamInput
							paramKey='search'
							placeholder={t('input_placeholder')}
							className='w-full h-10'
						/>
					</div>
				</div>
			</div>
			<div className='px-10 pb-8'>{children}</div>
			<GoTop />
		</main>
	);
}
