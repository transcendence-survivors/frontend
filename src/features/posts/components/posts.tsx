'use client';

import { useState } from 'react';
import { usePosts } from '../hook/usePosts';

export default function Posts() {
	const [page, setPage] = useState(1);
	const limit = 10;
	const { data, isLoading, error } = usePosts(page, limit);

	if (isLoading) return 'Loading';

	if (error) return 'Error loading posts';

	if (!data || data.status === 'error') return 'Nothing to display';

	const posts = data.data;

	return (
		<div className='container mx-auto px-4 py-8'>
			{posts.map((p) => (
				<div key={p.id} className='p-4 border rounded-md'>
					<div className='font-semibold'>
						{' '}
						{p.author?.displayName ?? p.authorId}
					</div>
					<div className='text-foreground'>{p.content}</div>
				</div>
			))}
		</div>
	);
}
