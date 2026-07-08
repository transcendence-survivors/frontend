'use client';

import { UserCard } from '@/features/user/components/UserCard';
import { UsersFeedData } from '@/features/user/components/UsersFeedData';

export default function Feed() {
	return (
		<main>
			<section className='max-w-3xl mx-auto px-4 py-8'>
				<UsersFeedData
					params={{ feedParams: { feed: 'not-friends' } }}
					CardComponent={UserCard}
				/>
			</section>
		</main>
	);
}
