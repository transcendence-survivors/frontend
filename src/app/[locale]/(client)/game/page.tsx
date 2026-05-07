import Nav from '@/components/layouts/Nav';
import { LocaleSwitcher } from '@i18n';

export default async function Page() {
	return (
		<main>
			<h1>Game</h1>
			<br />
			<br />
			<Nav />
			<LocaleSwitcher />
		</main>
	);
}
