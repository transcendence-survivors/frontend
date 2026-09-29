import { useTranslations } from 'next-intl';
import LoreHero from './components/LoreHero';
import StoryBlock from './components/StoryBlock';
import SiteHeader from '../components/SiteHeader';

const stories = ['extinction', 'vigil', 'bearers', 'forgotten'] as const;

export default function LorePage() {
	const t = useTranslations('landing.lore.stories');

	return (
		<main>
			<SiteHeader active='lore' />
			<LoreHero />
			<div className='max-w-5xl mx-auto border border-border'>
				{stories.map((key, i) => (
					<StoryBlock
						key={key}
						number={String(i + 1).padStart(2, '0')}
						label={t(`${key}.label`)}
						title={t(`${key}.title`)}
						body={t(`${key}.body`)}
						reverse={i % 2 === 1}
					/>
				))}
			</div>
		</main>
	);
}
