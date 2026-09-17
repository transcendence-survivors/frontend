import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
	{
		category: 'Technical',
		question: 'Quelle est la configuration minimale ?',
		answer:
			'Une carte graphique compatible WebGPU et une connexion stable pour le mode co-op. Le jeu tourne aussi en solo hors ligne.',
	},
	{
		category: 'Technical',
		question: "Le jeu est trop sombre, je ne vois presque rien.",
		answer:
			"C'est voulu — ta lanterne est ta seule source de lumière. Si l'écran est vraiment illisible, vérifie la luminosité de ton moniteur plutôt que les réglages du jeu.",
	},
	{
		category: 'Technical',
		question: 'Ma partie a désynchronisé en co-op.',
		answer:
			"Ça arrive surtout sur une connexion instable. Quitte et rejoins la partie, la Veille reprendra là où tu l'as laissée.",
	},
	{
		category: 'Gameplay',
		question: 'Comment fonctionne la vie de la lanterne (lueur) ?',
		answer:
			"Pas de barre de vie classique : la lueur de ta lanterne EST ta vie. Pleine, tu vois loin ; faiblissante, le noir se referme autour de toi.",
	},
	{
		category: 'Gameplay',
		question: 'Pourquoi je perds de la vie en restant immobile ?',
		answer:
			"Le seul sol sûr est le faisceau de la Veille, qui ne s'arrête jamais. Rester immobile, c'est laisser le noir te rattraper.",
	},
	{
		category: 'Account',
		question: 'Comment bloquer un autre joueur ?',
		answer:
			'Depuis son profil ou une conversation, ouvre le menu et choisis "Bloquer". Il disparaîtra de ton feed, ton chat et ton matchmaking co-op.',
	},
];

export default function FaqAccordion() {
	return (
		<div className='mt-16'>
			<p className='font-mono text-xs tracking-[0.2em] text-muted-foreground mb-4 uppercase'>
				Common Questions
			</p>
			<Accordion type='single' collapsible className='border border-border rounded-sm px-6'>
				{faqItems.map((item, index) => (
					<AccordionItem key={item.question} value={`item-${index}`}>
						<AccordionTrigger>
							<div className='flex items-center gap-4'>
								<span className='font-mono text-xs border border-border rounded-sm px-2 py-0.5 text-muted-foreground'>
									{item.category}
								</span>
								<span>{item.question}</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className='pl-[calc(4.5rem)] text-muted-foreground'>
							{item.answer}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
