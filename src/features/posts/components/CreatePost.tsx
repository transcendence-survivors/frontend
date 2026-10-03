'use client';

import { useRouter } from '@/modules/i18n/utils/navigation';
import PostForm from './form/PostForm';
import { ROUTES } from '@/modules/i18n/constants/routes';
import { Post } from '../types/post';
import { ApiSuccess } from '@/libs/api';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useUser } from '@/features/auth/stores/session';

export default function CreatePost() {
	const router = useRouter();
	const user = useUser();
	const t = useTranslations('posts.actions');

	const onPostCreated = (data: ApiSuccess<Post>) => {
		toast.success(t('post_success'));
		if (!user) return;
		router.push(
			ROUTES.userNamePostsId({
				id: data.data.id,
				username: `@${user?.username || ''}`,
			}),
		);
	};

	return <PostForm onSuccess={onPostCreated} />;
}
