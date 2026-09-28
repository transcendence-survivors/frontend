import { useTranslations } from 'next-intl';
import LoreHero from './components/LoreHero';
import StoryBlock from './components/StoryBlock';
import SiteHeader from '../components/SiteHeader';

const blocks = ['awakening', 'circle', 'horde', 'keepers'] as const;

export default function LorePage() {
	const t = useTranslations('lore.blocks');

	return (
		<main>
			<SiteHeader active='lore' />
			<LoreHero />
			<div className='max-w-5xl mx-auto border border-border'>
				{blocks.map((block, index) => (
					<StoryBlock
						key={block}
						number={`0${index + 1}`}
						label={t(`${block}.label`)}
						title={t(`${block}.title`)}
						body={t(`${block}.body`)}
						reverse={index % 2 === 1}
					/>
				))}
			</div>
		</main>
	);
}
