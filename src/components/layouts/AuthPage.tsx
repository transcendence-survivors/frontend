import { Button } from '@/components/ui/button';
import { I18nLink } from '@/modules/i18n/components/I18nLink';
import { RouteKey } from '@/modules/i18n/constants/routes';

interface AuthPageProps {
	title: string;
	linkText: string;
	linkHref: RouteKey;
	children: React.ReactNode;
}

const AuthPage = ({ title, linkText, linkHref, children }: AuthPageProps) => {
	return (
		<main className='flex flex-col min-h-[85vh] py-12 items-center justify-center'>
			<section className='w-full max-w-lg px-8 space-y-4'>
				<div>
					<h1>{title}</h1>
					<Button
						variant='link'
						size='sm'
						className='p-0 select-auto h-auto text-sm text-muted-foreground'
						asChild>
						<I18nLink href={linkHref}>{linkText}</I18nLink>
					</Button>
				</div>
				{children}
			</section>
		</main>
	);
};

export default AuthPage;
