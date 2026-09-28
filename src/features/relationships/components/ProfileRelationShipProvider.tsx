'use client';

import { useMemo } from 'react';
import { RelationshipProvider } from './RelationshipProvider';
import { useParams } from 'next/navigation';
import { urlDecode } from '@/libs/urls';

interface ProfileRelationshipProviderProps {
	children: React.ReactNode;
}

export const ProfileRelationshipProvider = ({
	children,
}: ProfileRelationshipProviderProps) => {
	const params = useParams();

	const username = useMemo(() => {
		const raw = params?.username;
		if (!raw) return '';

		const segment = Array.isArray(raw) ? raw[0] : raw;
		const decoded = urlDecode(segment);

		return decoded.startsWith('@') ? decoded.slice(1) : decoded;
	}, [params]);

	if (!username) {
		return <>{children}</>;
	}

	return <RelationshipProvider username={username}>{children}</RelationshipProvider>;
};
