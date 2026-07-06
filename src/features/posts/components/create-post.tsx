import { useState } from 'react';
import { useCreatePost } from '../hook/useCreatePost';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function CreatePost() {
	const [content, setContent] = useState('');
	const [file, setFile] = useState<File | undefined>();
	const createPost = useCreatePost();

	function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();
		createPost.mutate({ content, file });
		setContent('');
		setFile(undefined);
	}

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-3 p-4 border-b'>
			<Textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder='Commencer à écrire un post'
			/>
			<input
				type='file'
				accept='image/*'
				onChange={(e) => setFile(e.target?.files?.[0])}
			/>
			<Button type='submit'>Poster</Button>
		</form>
	);
}
