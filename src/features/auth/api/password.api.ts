import { api, ApiException, isApiError } from '@/libs/api';
import { AUTH_ENDPOINTS } from '../constants/endpoints';

interface ChangePasswordRequestBody {
	currentPassword: string;
	newPassword: string;
}

export const changePassword = async (body: ChangePasswordRequestBody) => {
	const res = await api.patch<void>(AUTH_ENDPOINTS.changePassword, body, {
		no_retry: true,
	});
	if (isApiError(res)) {
		throw new ApiException(res.code, res.message);
	}
};

interface ForgotPasswordRequestBody {
	email: string;
}

export const forgotPassword = async (body: ForgotPasswordRequestBody) => {
	const res = await api.post<void>(AUTH_ENDPOINTS.forgotPassword, body, {
		no_retry: true,
	});
	if (isApiError(res)) {
		throw new ApiException(res.code, res.message);
	}
	return res;
};

interface ResetPasswordRequestBody {
	token: string;
	newPassword: string;
}

export const resetPassword = async (body: ResetPasswordRequestBody) => {
	const res = await api.post<void>(AUTH_ENDPOINTS.resetPassword, body, {
		no_retry: true,
	});
	if (isApiError(res)) {
		throw new ApiException(res.code, res.message);
	}
	return res;
};

interface DeleteAccountRequestBody {
	password: string;
}

export const deleteAccount = async (body: DeleteAccountRequestBody) => {
	const res = await api.post<void>(AUTH_ENDPOINTS.deleteAccount, body, {
		no_retry: true,
	});
	if (isApiError(res)) {
		throw new ApiException(res.code, res.message);
	}
	return res;
};
