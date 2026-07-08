import { api, buildUrlParams, isApiError } from '@/libs/api';
import { USERS_ENDPOINTS } from '../constants/endpoints';
import { GetUsers, GetUsersFeedParams, GetUsersParams } from '../type';

const getUsers = async (params: GetUsersParams) => {
	const urlParams = buildUrlParams(params);
	const res = await api.get<GetUsers>(
		`${USERS_ENDPOINTS.getUsers}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

const getFeedUsers = async (params: GetUsersFeedParams) => {
	const urlParams = buildUrlParams(params);
	urlParams.append('feed', params.feed);

	const res = await api.get<GetUsers>(
		`${USERS_ENDPOINTS.feedGetUsers}?${urlParams.toString()}`,
	);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

export { getUsers, getFeedUsers };
