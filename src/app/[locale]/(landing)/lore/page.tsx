import LoreHero from './components/LoreHero';
import StoryBlock from './components/StoryBlock';
import SiteHeader from '../components/SiteHeader';

export default function LorePage() {
	return (
		<main>
			<SiteHeader active='Lore' />
			<LoreHero />
			<div className='max-w-5xl mx-auto border border-border'>
				<StoryBlock
					number='01'
					label="L'EXTINCTION"
					title="L'obscurité n'est pas une absence."
					body="Ce que nous appelons les Ténèbres n'est pas l'absence de lumière — c'est de la matière vivante. Une marée qui a recouvert le monde et digère lentement tout ce qu'elle touche : la pierre, la mémoire, les noms. Là où elle passe, le monde oublie qu'il a existé."
				/>
				<StoryBlock
					number='02'
					label='LA VEILLE'
					title='Du ciel mort, un dernier rayon.'
					body="Un seul filet de lumière tombe encore — le dernier fragment du soleil mort, ou son fantôme. Les survivants l'appellent la Veille. Elle ne s'arrête jamais. On dit qu'elle cherche quelque chose à travers les terres noyées, et que tant qu'elle bouge, le monde n'est pas tout à fait mort. La suivre est la seule définition de &laquo; vivre &raquo; qui tienne encore."
					reverse
				/>
				<StoryBlock
					number='03'
					label='LES PORTE-LANTERNE'
					title="Tu n'es pas un héros."
					body="Tu es l'un des rares à porter une lanterne allumée d'une étincelle de la Veille — une braise transmise de main en main, jamais recréée. Ta lanterne ne sauve pas le monde. Elle grignote juste assez de nuit autour de toi pour tenir un pas de plus. Sa lueur, c'est ta vie : pleine, tu vois loin ; faiblissante, le noir se referme."
				/>
				<StoryBlock
					number='04'
					label='LES OUBLIÉS'
					title='Le monde, digéré puis recraché.'
					body="Ce qui sort de l'obscurité n'est pas étranger au monde — c'est le monde, dissous et recomposé en armes contre les vivants. Plus tu descends, plus les Oubliés que tu croises sont anciens : noyés depuis plus longtemps, plus profondément transformés, plus puissants."
					reverse
				/>
			</div>
		</main>
	);
}
