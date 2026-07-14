import Kicker from '@/components/ui/kicker';
import CreatePost from '@/features/posts/components/create-post';
import Posts from '@/features/posts/components/posts';
import PresenceCounter from '@/features/presence/components/PresenceCounter';
import { getTranslations } from 'next-intl/server';

export default async function Feed() {
	const t = await getTranslations('feed');

	return (
		<main>
			<header className='px-10 py-8 flex-1 border-b border-border '>
				<section className='flex items-center justify-between'>
					<div className='space-y-2'>
						<h1>{t('title')}</h1>
						<Kicker className='text-xs'>{t('subtitle')}</Kicker>
					</div>
					<PresenceCounter />
				</section>
			</header>
			<div className='max-w-xl mx-auto px-4 py-8'>
				<section>
					<CreatePost />
				</section>
				<section>
					<Posts />
				</section>
			</div>
		</main>
	);
}
