import LogoLanding from '@/components/icons/LogoLanding';
import Header from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { Menu, RocketIcon, Shield, ShieldCheckIcon } from 'lucide-react';
import BurgerLandingDrawer from '@/components/layouts/Headers/BurgerLandingDrawer';
import { GridBackgroundDemo } from '@/components/ui/grid-background';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';

const features = [
	{
		Icon: RocketIcon,
		name: 'Performance Ultime',
		description:
			"Des applications rapides comme l'éclair grâce à une optimisation poussée au millième de seconde.",
		href: '/performances',
		cta: 'En savoir plus',
		className: 'md:col-span-2 md:row-span-1',
		background: (
			<div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50' />
		),
	},
	{
		Icon: ShieldCheckIcon,
		name: 'Sécurité Maximale',
		description:
			'Vos données sont chiffrées de bout en bout avec les meilleurs standards.',
		href: '/securite',
		cta: 'Découvrir la sécurité',
		className: 'md:col-span-1 md:row-span-1',
		background: (
			<div className='absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-50' />
		),
	},
	{
		Icon: Shield,
		name: 'Entièrement Configurable',
		description: "Adaptez l'outil à vos besoins précis grâce à notre API flexible.",
		href: '/configuration',
		cta: 'Voir la doc',
		className: 'md:col-span-3 md:row-span-1',
		background: (
			<div className='absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-50' />
		),
	},
];

export default function Page() {
	return (
		<main>
			<Header className='bg-secondary'>
				<LogoLanding className='fill-foreground h-5' />
				<div className='flex gap-2 items-center'>
					<Button>Log In</Button>
					<Button>Sign up</Button>

					<BurgerLandingDrawer />
				</div>
			</Header>
			<div className='w-full max-w-4xl mx-auto'>
				<BentoGrid>
					{features.map((feature) => (
						<BentoCard key={feature.name} {...feature} />
					))}
				</BentoGrid>
			</div>
		</main>
	);
}
