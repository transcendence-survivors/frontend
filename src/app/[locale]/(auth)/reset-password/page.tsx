import { getTranslations } from 'next-intl/server';
import ResetPasswordForm from '@/features/auth/components/ResetPasswordForm';
import AuthPage from '@/components/layouts/AuthPage';

export default async function ResetPasswordPage() {
	const t = await getTranslations('auth.reset_password');

	return (
		<AuthPage title={t('title')} linkText={t('login')} linkHref='login'>
			<ResetPasswordForm />
		</AuthPage>
	);
}
