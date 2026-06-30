'use client';

import { usePosts } from '../hook/usePosts';

export default function Posts() {
	const limit = 10;
	const page = 1;
	const { data, isLoading, isError } = usePosts(page, limit);

	if (isLoading) return 'Loading';
	if (isError) return 'Error loading posts';
	if (!data || data?.data.data.length === 0) return 'Pas de data';
	const posts = data.data.data;

	return (
		<div className='container mx-auto px-4 py-8'>
			{posts.map((p) => (
				<div key={p.id} className='p-4 border rounded-md'>
					<div className='font-semibold'>
						{' '}
						{p.author?.displayName ?? p.author.id}
					</div>
					<div className='text-foreground'>{p.content}</div>
					<div className='text-foreground'>
						<br />
						{new Date(p.createdAt).toLocaleString('fr-FR', {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})}
					</div>
				</div>
			))}
		</div>
	);
}
