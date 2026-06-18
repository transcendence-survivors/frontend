import { Spinner } from '@/components/ui/spinner';
import ProfileHeaderServer from '@/features/user/components/Profile/ProfileHeaderServer';
import { Suspense } from 'react';

const ProfilePage = () => {
	const fallback = (
		<div className='border-b'>
			<Spinner className='size-8 mx-auto my-40 ' />
		</div>
	);

	return (
		<main>
			<Suspense fallback={fallback}>
				<ProfileHeaderServer activeLinkKey='profile' username={'dCben335'} />
			</Suspense>
			<Spinner className='mx-auto mt-12 size-8' />
		</main>
	);
};

export default ProfilePage;
