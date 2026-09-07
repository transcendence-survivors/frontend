import { BentoGrid } from '@/components/ui/bento-grid';

const features = [
	{
		name: 'La Lanterne',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		gradient: 'from-amber-500/40 via-amber-500/10 to-transparent',
	},
	{
		name: 'Les Strates',
		description:
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		gradient: 'from-yellow-500/30 via-amber-500/10 to-transparent',
	},
	{
		name: 'Les Oubliés',
		description:
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		gradient: 'from-neutral-500/30 via-stone-500/10 to-transparent',
	},
	{
		name: 'La Veille',
		description:
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		gradient: 'from-orange-400/40 via-amber-500/10 to-transparent',
	},
];

export default function FeatureSection() {
	return (
		<div className='mb-20 mt-24'>
			<p
				className={
					'font-mono text-xs tracking-[0.2em] ' +
					'text-primary mb-4 uppercase'
				}>
				Le système
			</p>
			<h2
				className={
					'text-3xl font-bold text-foreground ' + 'max-w-xl mb-10'
				}>
				Un seul mécanisme, fusionné de trois. La lumière est tout.
			</h2>
			<BentoGrid className='md:grid-cols-2 auto-rows-auto gap-px bg-border border border-border'>
				{features.map((feature) => (
					<div key={feature.name} className='bg-background p-8'>
						<div
							className={
								'h-28 mb-6 bg-gradient-to-br ' +
								feature.gradient
							}
						/>
						<h3
							className={
								'text-lg font-semibold ' +
								'text-foreground mb-2'
							}>
							{feature.name}
						</h3>
						<p
							className={
								'text-sm text-muted-foreground ' +
								'leading-relaxed'
							}>
							{feature.description}
						</p>
					</div>
				))}
			</BentoGrid>
		</div>
	);
}
