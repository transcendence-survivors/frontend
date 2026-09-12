import { Cpu, Gamepad2, UserCircle } from 'lucide-react';

const categories = [
	{
		Icon: Cpu,
		name: 'Technical',
		description: 'Specs, performance, réseau',
		count: 3,
	},
	{
		Icon: Gamepad2,
		name: 'Gameplay',
		description: 'La Veille, la lueur, les armes, les strates',
		count: 3,
	},
	{
		Icon: UserCircle,
		name: 'Account',
		description: 'Connexion, pseudo, blocage, données',
		count: 3,
	},
];

export default function CategoryGrid() {
	return (
		<div className='grid md:grid-cols-3 border border-border divide-y md:divide-y-0 md:divide-x divide-border'>
			{categories.map(({ Icon, name, description, count }) => (
				<div key={name} className='bg-background p-8'>
					<Icon className='size-6 text-primary mb-6' />
					<h3 className='text-xl font-semibold text-foreground mb-2'>
						{name}
					</h3>
					<p className='text-muted-foreground mb-6'>{description}</p>
					<p className='font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase'>
						{count} articles →
					</p>
				</div>
			))}
		</div>
	);
}
