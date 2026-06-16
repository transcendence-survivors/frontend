import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/libs/utils';

interface FaqItem {
	id: string;
	question: string;
	answer: string;
	className?: string;
}

interface Faq1Props {
	heading?: string;
	items?: FaqItem[];
	className?: string;
}

const Faq1 = ({
	heading = 'Frequently asked questions',
	items = [
		{
			id: 'faq-1',
			question: 'Et sans chialer ca donne quoi ?',
			answer: 'La version sans les larmes est actuellement disponible en DLC payant. Sinon, tu peux essayer de cligner des yeux très vite, ça aide à masquer la vérité.',
		},
		{
			id: 'faq-2',
			question:
				'Une des personnes du jeu m a dit stress pas, c est pas note. Est-ce que c est vrai ? ',
			answer: 'C’est techniquement vrai, mais le jeu garde quand même une trace écrite de ton humiliation dans ses archives secrètes. Et tes ancêtres te regardent.',
		},
		{
			id: 'faq-3',
			question:
				'Suite a mes pietres performances sur le jeu, on m a conseille d allumer l ecran quand je joue. Est-ce que ca peut etre une bonne solution ? ',
			answer: 'C est une piste intéressante à explorer, en effet. Allumer l écran te permettra de voir précisément à quel point tu rates tes actions, ce qui offre un confort visuel indéniable par rapport au fait de perdre dans le noir.',
		},
		{
			id: 'faq-4',
			question:
				'Chaque PNJ que je rencontre me hurle "six seven". Est-ce que c est normal ?',
			answer: 'Tout à fait normal. C est l accent local pour te rappeler ton ratio d éliminations moyen, ou alors ils essaient simplement de t indiquer la taille en pieds de l écart qui te sépare du niveau des autres joueurs..',
		},
		{
			id: 'faq-5',
			question: 'Ce matin, j ai pleure sur le poulet. Comment faire ?',
			answer: 'Déjà, félicitations pour l assaisonnement original. Pour la suite, deux options : soit tu augmentes le temps de cuisson pour évaporer les larmes, soit tu manges le poulet frites directement dans le lit en position fœtale pour harmoniser l ambiance.',
		},
	],
	className,
}: Faq1Props) => {
	return (
		<section className={cn('py-32', className)}>
			<div className='container'>
				<div className='mx-auto max-w-3xl'>
					<h1 className='mb-4 text-3xl font-semibold md:mb-11 md:text-4xl'>
						{heading}
					</h1>
					<Accordion type='single' collapsible>
						{items.map((item, index) => (
							<AccordionItem key={index} value={`item-${index}`}>
								<AccordionTrigger className='font-semibold hover:no-underline'>
									{item.question}
								</AccordionTrigger>
								<AccordionContent className='text-muted-foreground'>
									{item.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
};

export { Faq1 };
