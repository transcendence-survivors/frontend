import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Zap, ShieldAlert, Crosshair } from 'lucide-react';

const synergies = [
	{ key: 'axeSize', Icon: Zap },
	{ key: 'staffRange', Icon: Crosshair },
	{ key: 'bowHaste', Icon: ShieldAlert },
] as const;

export const WikiSynergies = () => {
	const t = useTranslations('wiki');

	return (
		<section className='grid grid-cols-1 md:grid-cols-2 gap-6'>
			{synergies.map(({ key, Icon }) => (
				<article key={key}>
					<Card className='bg-card border-border text-card-foreground h-full'>
						<CardHeader className='flex flex-row items-center gap-3'>
							<Icon className='text-primary w-5 h-5' />
							<CardTitle className='text-base'>
								{t(`synergies.${key}.title`)}
							</CardTitle>
						</CardHeader>
						<CardContent className='text-xs text-muted-foreground'>
							<p>{t(`synergies.${key}.description`)}</p>
						</CardContent>
					</Card>
				</article>
			))}
		</section>
	);
};
