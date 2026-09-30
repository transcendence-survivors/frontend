import { Spinner } from '@/components/ui/spinner';
import { RelationshipProvider } from '@/features/relationships/components/RelationshipProvider';
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
	const decodedUsername = urlDecode(username);
	if (!decodedUsername.startsWith('@')) {
		notFound();
	}
	const cleanUsername = decodedUsername.substring(1);

	return (
		<main className='flex-1 h-main flex flex-col'>
			<RelationshipProvider username={cleanUsername}>
				<Suspense fallback={fallback}>
					<ProfileHeaderServer username={cleanUsername} />
				</Suspense>
				{children}
			</RelationshipProvider>
		</main>
	);
}
