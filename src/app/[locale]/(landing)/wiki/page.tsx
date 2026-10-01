import { getTranslations } from 'next-intl/server';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { BookOpen, Skull, ArrowRight, Sparkles, Shield, Flame } from 'lucide-react';
import I18nLink from '@/modules/i18n/components/I18nLink';
import WikiNav from '@/features/game/components/wiki/WikiNav';

const hubCardsConfig = [
	{
		key: 'arsenal',
		href: 'wikiArsenal',
		titleKey: 'title',
		subtitleKey: 'subtitle',
		highlightKey: 'hub.arsenalHighlights',
		icon: BookOpen,
		highlightIcon: Flame,
		accentColor: 'primary',
		iconContainerClass: 'bg-primary/10 border-primary/20 text-primary',
		hoverBorderClass: 'group-hover:border-primary/50',
		hoverTextClass: 'group-hover:text-primary',
		highlightIconClass: 'text-amber-500',
	},
	{
		key: 'bestiary',
		href: 'wikiBestiary',
		titleKey: 'bestiary.title',
		subtitleKey: 'bestiary.subtitle',
		highlightKey: 'hub.bestiaryHighlights',
		icon: Skull,
		highlightIcon: Shield,
		accentColor: 'destructive',
		iconContainerClass: 'bg-destructive/10 border-destructive/20 text-destructive',
		hoverBorderClass: 'group-hover:border-destructive/50',
		hoverTextClass: 'group-hover:text-destructive',
		highlightIconClass: 'text-primary',
	},
] as const;

export default async function Page() {
	const t = await getTranslations('wiki');

	return (
		<main className=' bg-background text-foreground pt-14 px-8 space-y-8 pb-12'>
			<div className='max-w-5xl mx-auto space-y-8'>
				<header className='space-y-4 border-b border-border pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-4'>
					<div className='space-y-2 lg:max-w-[60%]'>
						<h1 className='text-4xl font-extrabold tracking-tight text-primary flex items-center gap-3'>
							<Sparkles className='size-10 text-primary' />
							{t('hub.title')}
						</h1>
						<p className='text-muted-foreground max-w-xl text-sm lg:text-base'>
							{t('hub.subtitle')}
						</p>
					</div>
					<WikiNav />
				</header>

				<section className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{hubCardsConfig.map((card) => {
						const Icon = card.icon;
						const HighlightIcon = card.highlightIcon;

						return (
							<I18nLink
								key={card.key}
								href={card.href}
								className='group block outline-none'>
								<Card
									className={`h-full bg-card/60 hover:bg-muted border-border ${card.hoverBorderClass} transition-all duration-300 shadow-sm rounded-xl overflow-hidden flex flex-col justify-between`}>
									<CardHeader className='space-y-3'>
										<div
											className={`size-12 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${card.iconContainerClass}`}>
											<Icon className='size-6' />
										</div>
										<div className='space-y-1'>
											<CardTitle
												className={`text-2xl font-bold flex items-center justify-between text-foreground ${card.hoverTextClass} transition-colors`}>
												<span>{t(card.titleKey)}</span>
												<ArrowRight
													className={`size-5 text-muted-foreground group-hover:translate-x-1 ${card.hoverTextClass} transition-all`}
												/>
											</CardTitle>
											<CardDescription className='text-sm leading-relaxed'>
												{t(card.subtitleKey)}
											</CardDescription>
										</div>
									</CardHeader>
									<CardContent className='pt-0'>
										<div className='flex items-center gap-2 pt-4 border-t border-border/60 text-xs font-semibold text-muted-foreground'>
											<HighlightIcon
												className={`size-4 ${card.highlightIconClass}`}
											/>
											<span>{t(card.highlightKey)}</span>
										</div>
									</CardContent>
								</Card>
							</I18nLink>
						);
					})}
				</section>
			</div>
		</main>
	);
}
