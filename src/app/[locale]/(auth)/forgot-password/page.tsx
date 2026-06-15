import AuthPage from '@/components/layouts/AuthPage';
import ForgotPasswordForm from '@/features/auth/components/ForgotPasswordForm';
import { getTranslations } from 'next-intl/server';

export default async function ForgotPasswordPage() {
	const t = await getTranslations('auth.forgot_password');

	return (
		<AuthPage title={t('title')} linkText={t('login')} linkHref='login'>
			<ForgotPasswordForm />
		</AuthPage>
	);
}
