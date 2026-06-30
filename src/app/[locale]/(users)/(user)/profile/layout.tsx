import { Spinner } from '@/components/ui/spinner';
import ProfileHeaderServer from '@/features/user/components/Profile/ProfileHeaderServer';
import { Suspense } from 'react';

interface RootLayoutProps {
	children: React.ReactNode;
}
const fallback = (
	<div className='border-b'>
		<Spinner className='size-8 mx-auto my-40 ' />
	</div>
);

export default async function ProfileLayout({ children }: RootLayoutProps) {
	return (
		<main className='min-h-screen'>
			<Suspense fallback={fallback}>
				<ProfileHeaderServer username={'dCben335'} />
			</Suspense>
			{children}
		</main>
	);
}
