'use client';

import { useSessionStore } from '@/features/auth/stores/session';

export default function ProfilePage() {
	const { user } = useSessionStore();
	return (
		<div>
			<h1>Profile Page</h1>
			<p>This is the profile page.</p>
			{user ? (
				<div>
					<strong>Username: {user.username}</strong>
					<h2>Welcome, {user.username}!</h2>
					<p>Email: {user.email}</p>
					<p>Role: {user.role}</p>
				</div>
			) : (
				<p>You are not logged in.</p>
			)}
		</div>
	);
}
