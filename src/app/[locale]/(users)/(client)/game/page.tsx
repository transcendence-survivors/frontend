import SideNav from '@/components/layouts/SideNav';
import LocaleSwitcher from '@i18n/components/LocaleSwitcher';

export default async function Page() {
	return (
		<main>
			<h1>Game</h1>
			<br />
			<br />
			<SideNav />
			<LocaleSwitcher />
		</main>
	);
}
