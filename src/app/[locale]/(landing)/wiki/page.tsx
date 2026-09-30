import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';
import GameIcon from '@/features/game/components/GameIcons';
import { WeaponCard } from '@/features/game/components/WeaponCard';
import { TomeCard } from '@/features/game/components/TomeCard';
import { WEAPONS } from '@/features/game/data/weapons';
import { TOMES } from '@/features/game/data/tomes';
import { WikiSynergies } from '@/features/game/components/sections/WikiSynergies';
import { WikiMechanics } from '@/features/game/components/sections/WikiMechanics';

const tabs = [
	{ value: 'weapons', labelKey: 'tabs.weapons' },
	{ value: 'tomes', labelKey: 'tabs.tomes' },
	{ value: 'synergies', labelKey: 'tabs.synergies' },
	{ value: 'mechanics', labelKey: 'tabs.mechanics' },
] as const;

export default function WikiPage() {
	const t = useTranslations('wiki');

	return (
		<main className='min-h-screen bg-background text-foreground pt-14 px-4 max-w-5xl mx-auto space-y-8'>
			<header className='space-y-2 border-b border-border pb-6'>
				<h1 className='text-4xl font-extrabold tracking-tight text-primary flex items-center gap-3'>
					<GameIcon name='fortune' size={40} className='stroke-primary' />
					{t('title')}
				</h1>
				<p className='text-muted-foreground max-w-2xl text-sm md:text-base'>
					{t('subtitle')}
				</p>
			</header>

			<section aria-label={t('notes.title')}>
				<Card className='bg-muted/30 border-border text-foreground'>
					<CardHeader className='flex flex-row items-center gap-3 pb-2'>
						<Info className='w-5 h-5 text-primary' />
						<CardTitle className='text-base font-semibold text-primary'>
							{t('notes.title')}
						</CardTitle>
					</CardHeader>
					<CardContent className='text-xs space-y-1 text-muted-foreground'>
						<p>• {t('notes.affinity')}</p>
						<p>• {t('notes.global')}</p>
						<p>• {t('notes.weaponsLimit')}</p>
						<p>• {t('notes.limits')}</p>
					</CardContent>
				</Card>
			</section>

			<Tabs defaultValue='weapons' className='w-full space-y-6'>
				<TabsList className='bg-muted border border-border h-auto! w-full grid grid-cols-2 md:grid-cols-4 p-0 '>
					{tabs.map(({ value, labelKey }) => (
						<TabsTrigger key={value} value={value} className='py-3'>
							{t(labelKey)}
						</TabsTrigger>
					))}
				</TabsList>
				<TabsContent value='weapons'>
					<section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{WEAPONS.map((weapon) => (
							<article key={weapon.id}>
								<WeaponCard {...weapon} />
							</article>
						))}
					</section>
				</TabsContent>

				<TabsContent value='tomes'>
					<section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{TOMES.map((tome) => (
							<article key={tome.id}>
								<TomeCard {...tome} />
							</article>
						))}
					</section>
				</TabsContent>

				<TabsContent value='synergies'>
					<WikiSynergies />
				</TabsContent>

				<TabsContent value='mechanics'>
					<WikiMechanics />
				</TabsContent>
			</Tabs>
		</main>
	);
}
