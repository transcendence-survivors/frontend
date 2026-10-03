import { ResourceNotFound } from '@/components/layouts/ResourceNotFound';
import { ROUTES } from '@/modules/i18n/constants/routes';

export default function GameNotFound() {
	return <ResourceNotFound namespace='game' backUrl={ROUTES.game()} />;
}
