'use client';

import { usePost } from '../hook/usePost';
import { Post } from '../types/post';
import PostCard from './post-card';

interface PostDetailProps {
	post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
	const { data } = usePost(post.id, post);

	return <PostCard post={data} isDetailView={true} />;
}
