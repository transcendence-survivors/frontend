import { Spinner } from '@/components/ui/spinner';
import ProfileHeaderServer from '@/features/user/components/Profile/ProfileHeaderServer';
import { urlDecode } from '@/libs/urls';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface UserPageProps {
	params: {
		username: string;
	};
}

const fallback = (
	<div className='border-b'>
		<Spinner className='size-8 mx-auto my-40 ' />
	</div>
);

const UserPage = async ({ params }: UserPageProps) => {
	const { username } = await params;
	if (!urlDecode(username).startsWith('@')) {
		notFound();
	}

	return (
		<main>
			<Suspense fallback={fallback}>
				<ProfileHeaderServer username={username} />
			</Suspense>
			<Spinner className='mx-auto mt-12 size-8' />
		</main>
	);
};

export default UserPage;
