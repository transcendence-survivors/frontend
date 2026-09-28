import { Cpu, Gamepad2, UserCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const categories = [
	{ key: 'technical', Icon: Cpu, count: 2 },
	{ key: 'gameplay', Icon: Gamepad2, count: 3 },
	{ key: 'account', Icon: UserCircle, count: 1 },
] as const;

export default function CategoryGrid() {
	const t = useTranslations('support');

	return (
		<div className='grid md:grid-cols-3 border border-border divide-y md:divide-y-0 md:divide-x divide-border'>
			{categories.map(({ key, Icon, count }) => (
				<div key={key} className='bg-background p-8'>
					<Icon className='size-6 text-primary mb-6' />
					<h3 className='text-xl font-semibold text-foreground mb-2'>
						{t(`categories.${key}.name`)}
					</h3>
					<p className='text-muted-foreground mb-6'>
						{t(`categories.${key}.description`)}
					</p>
					<p className='font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase'>
						{t('articles', { count })}
					</p>
				</div>
			))}
		</div>
	);
}
