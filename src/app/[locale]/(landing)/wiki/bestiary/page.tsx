import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Info, Skull, ShieldAlert } from 'lucide-react';
import WikiMonsterCard from '@/features/game/components/wiki/WikiMonsterCard';
import { MONSTERS, BOSSES } from '@/features/game/data/monsters';
import { getTranslations } from 'next-intl/server';
import WikiNav from '@/features/game/components/wiki/WikiNav';

export default async function Page() {
	const t = await getTranslations('wiki');

	return (
		<main className='min-h-screen bg-background text-foreground pt-14 px-8 pb-12'>
			<div className='max-w-5xl mx-auto space-y-8'>
				<header className='space-y-4 border-b border-border pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-4'>
					<div className='space-y-2 lg:max-w-[60%]'>
						<h1 className='text-4xl font-extrabold tracking-tight text-primary flex items-center gap-3'>
							<Skull className='size-10 text-primary' />
							{t('bestiary.title')}
						</h1>
						<p className='text-muted-foreground max-w-2xl text-sm lg:text-base'>
							{t('bestiary.subtitle')}
						</p>
					</div>
					<WikiNav />
				</header>

				<section aria-label={t('notes.title')}>
					<Card className='bg-muted/30 border-border text-foreground rounded-xl'>
						<CardHeader className='flex flex-row items-center gap-3 pb-2'>
							<Info className='size-5 text-primary' />
							<CardTitle className='text-base font-semibold text-primary'>
								{t('notes.title')}
							</CardTitle>
						</CardHeader>
						<CardContent className='text-xs space-y-1.5 text-muted-foreground'>
							<p>• {t('bestiary.notes.scaling')}</p>
							<p>• {t('bestiary.notes.elites')}</p>
							<p>• {t('bestiary.notes.bosses')}</p>
							<p>• {t('bestiary.notes.knockback')}</p>
						</CardContent>
					</Card>
				</section>

				<Tabs defaultValue='horde' className='w-full space-y-6'>
					<TabsList className='bg-muted border border-border h-auto! w-full grid grid-cols-2 p-0'>
						<TabsTrigger
							value='horde'
							className='py-3 cursor-pointer flex items-center justify-center gap-2 rounded-lg '>
							<Skull className='size-4 text-primary' />
							<span>
								{t('bestiary.tabs.horde', { count: MONSTERS.length })}
							</span>
						</TabsTrigger>
						<TabsTrigger
							value='bosses'
							className='py-3 cursor-pointer flex items-center justify-center gap-2 rounded-lg'>
							<ShieldAlert className='size-4 text-destructive' />
							<span>
								{t('bestiary.tabs.bosses', { count: BOSSES.length })}
							</span>
						</TabsTrigger>
					</TabsList>

					<TabsContent value='horde'>
						<section className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{MONSTERS.map((monster) => (
								<article key={monster.id}>
									<WikiMonsterCard {...monster} />
								</article>
							))}
						</section>
					</TabsContent>

					<TabsContent value='bosses'>
						<section className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{BOSSES.map((boss) => (
								<article key={boss.id}>
									<WikiMonsterCard {...boss} />
								</article>
							))}
						</section>
					</TabsContent>
				</Tabs>
			</div>
		</main>
	);
}
