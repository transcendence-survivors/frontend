import { api, isApiError } from '@/libs/api';
import { USERS_ENDPOINTS } from '../constants/endpoints';
import { PatchUserSettingsParams, UserSettings } from '../type';
import { uploadAttachments } from '@/libs/api/helpers/attachments';

export const getSettings = async () => {
	const res = await api.get<UserSettings>(`${USERS_ENDPOINTS.getMeSettings}`);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return res.data;
};

export const patchSettings = async (data: PatchUserSettingsParams) => {
	const { avatarFile, coverFile, ...restData } = data;

	let avatarUrl: string | null | undefined = undefined;
	let coverImageUrl: string | null | undefined = undefined;

	const avatarUploadTask = async () => {
		if (avatarFile === null) {
			avatarUrl = null;
		} else if (avatarFile) {
			const [url] = await uploadAttachments([avatarFile], 'user');
			avatarUrl = url;
		}
	};

	const coverUploadTask = async () => {
		if (coverFile === null) {
			coverImageUrl = null;
		} else if (coverFile) {
			const [url] = await uploadAttachments([coverFile], 'user');
			coverImageUrl = url;
		}
	};

	await Promise.all([avatarUploadTask(), coverUploadTask()]);

	const payload = {
		...restData,
		...(avatarUrl !== undefined && { avatarUrl }),
		...(coverImageUrl !== undefined && { coverImageUrl }),
	};

	if (Object.keys(payload).length === 0) {
		return;
	}

	const res = await api.patch<void>(USERS_ENDPOINTS.patchMeSettings, payload);
	if (isApiError(res)) {
		throw new Error(res.message);
	}
	return payload;
};
