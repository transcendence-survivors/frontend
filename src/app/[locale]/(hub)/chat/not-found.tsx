import { ResourceNotFound } from '@/components/layouts/ResourceNotFound';
import { ROUTES } from '@/modules/i18n/constants/routes';

export default function ChatNotFound() {
	return <ResourceNotFound namespace='chat' backUrl={ROUTES.chat()} />;
}
