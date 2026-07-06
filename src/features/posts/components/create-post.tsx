import { useRef, useState } from 'react';
import { useCreatePost } from '../hook/useCreatePost';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';

export default function CreatePost() {
	const fileInputRef = useRef<HTMLInputElement>(null);
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
				ref={fileInputRef}
				type='file'
				accept='image/*'
				onChange={(e) => setFile(e.target.files?.[0])}
				className='hidden'
			/>
			<div className='flex items-center justify-between'>
				<Button
					type='button'
					variant='ghost'
					onClick={() => fileInputRef.current?.click()}>
					<ImageIcon />
				</Button>
				<Button type='submit'>Poster</Button>
			</div>
		</form>
	);
}
