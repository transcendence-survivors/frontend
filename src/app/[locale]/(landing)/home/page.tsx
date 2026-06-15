import LogoLanding from '@/components/icons/LogoLanding';
import Header from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import BurgerLandingDrawer from '@/components/layouts/Headers/BurgerLandingDrawer';

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
		</main>
	);
}
