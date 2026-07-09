import { useEffect, useMemo, useRef, useState } from 'react';
import { useCreatePost } from '../hook/useCreatePost';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function CreatePost() {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [content, setContent] = useState('');
	const [file, setFile] = useState<File | undefined>();
	const createPost = useCreatePost();
	const previewUrl = useMemo(
		() => (file ? URL.createObjectURL(file) : undefined),
		[file],
	);
	useEffect(() => {
		if (!previewUrl) return;

		return () => URL.revokeObjectURL(previewUrl);
	}, [previewUrl]);

	function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();
		createPost.mutate({ content, file });
		setContent('');
		setFile(undefined);
	}

	function handleRemoveFile() {
		setFile(undefined);
		if (fileInputRef.current) fileInputRef.current.value = '';
	}

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-3 p-4 border-b'>
			<Textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				className='resize-none'
				placeholder='Commencer à écrire un post'
			/>
			<Input
				ref={fileInputRef}
				type='file'
				accept='image/*'
				onChange={(e) => setFile(e.target.files?.[0])}
				className='hidden'
			/>
			<div className='relative'>
				{previewUrl && (
					<>
						<Button
							className='absolute top-2 right-2'
							type='button'
							variant='ghost'
							onClick={() => handleRemoveFile()}>
							<X />
						</Button>
						<img
							src={previewUrl}
							className='mt-2 w-full aspect-square rounded 2-xl border border-border object-cover'
						/>
					</>
				)}
			</div>
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
