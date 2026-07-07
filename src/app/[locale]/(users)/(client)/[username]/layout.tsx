import { Spinner } from '@/components/ui/spinner';
import ProfileHeaderServer from '@/features/user/components/Profile/ProfileHeaderServer';
import { urlDecode } from '@/libs/urls';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface RootLayoutProps {
	children: React.ReactNode;
	params: Promise<{ username: string }>;
}

const fallback = (
	<div className='border-b'>
		<Spinner className='size-8 mx-auto my-40 ' />
	</div>
);

export default async function ProfileLayout({ params, children }: RootLayoutProps) {
	const { username } = await params;
	if (!urlDecode(username).startsWith('@')) {
		notFound();
	}
	const decodedUsername = urlDecode(username).substring(1);

	return (
		<main>
			<Suspense fallback={fallback}>
				<ProfileHeaderServer username={decodedUsername} />
			</Suspense>
			{children}
		</main>
	);
}
