import { api, isApiError } from '@/libs/api';
import { RELATIONSHIPS_ENDPOINTS } from '../constants/endpoints';
import { RelationshipStatusResponse } from '../types';

export const getRelationshipStatus = async (username: string) => {
	const res = await api.get<RelationshipStatusResponse>(
		RELATIONSHIPS_ENDPOINTS.getStatus(username),
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};
