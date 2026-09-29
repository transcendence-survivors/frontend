import { useQuery } from '@tanstack/react-query';
import { getRelationshipStatus } from '../api/relationship';
import { relationshipKeys } from '../constants/keys';

export const useRelationshipStatus = (username: string) => {
	return useQuery({
		queryKey: relationshipKeys.status(username),
		queryFn: () => getRelationshipStatus(username),
		retry: false,
	});
};
