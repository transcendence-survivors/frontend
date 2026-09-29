import { Cpu, Gamepad2, UserCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const categories = [
	{ Icon: Cpu, key: 'technical', count: 3 },
	{ Icon: Gamepad2, key: 'gameplay', count: 3 },
	{ Icon: UserCircle, key: 'account', count: 3 },
] as const;

export default function CategoryGrid() {
	const t = useTranslations('landing.support');

	return (
		<div className='grid md:grid-cols-3 border border-border divide-y md:divide-y-0 md:divide-x divide-border'>
			{categories.map(({ Icon, key, count }) => (
				<div key={key} className='bg-background p-8'>
					<Icon className='size-6 text-primary mb-6' />
					<h3 className='text-xl font-semibold text-foreground mb-2'>
						{t(`categories.${key}.name`)}
					</h3>
					<p className='text-muted-foreground mb-6'>
						{t(`categories.${key}.description`)}
					</p>
					<p className='font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase'>
						{t('articles_count', { count })}
					</p>
				</div>
			))}
		</div>
	);
}
