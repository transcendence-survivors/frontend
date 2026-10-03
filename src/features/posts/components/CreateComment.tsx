'use client';

import PostForm from './form/PostForm';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface CreateCommentProps {
	parentPostId: string;
}

export default function CreateComment({ parentPostId }: CreateCommentProps) {
	const t = useTranslations('posts.actions');

	const onPostCreated = () => {
		toast.success(t('comment_success'));
	};

	return <PostForm onSuccess={onPostCreated} parentPostId={parentPostId} />;
}
