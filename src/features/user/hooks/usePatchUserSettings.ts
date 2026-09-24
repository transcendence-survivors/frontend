import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PatchUserSettingsParams, UserSettings } from '../type';
import { patchSettings } from '../api/me';
import { useSessionActions, useSessionStore } from '@/features/auth/stores/session';

export const usePatchUserSettings = () => {
	const queryClient = useQueryClient();
	const queryKey = ['me', 'settings'];
	const { setUser } = useSessionActions();

	return useMutation({
		mutationFn: (patchData: PatchUserSettingsParams) => patchSettings(patchData),
		onMutate: async (patchData) => {
			await queryClient.cancelQueries({ queryKey });

			const previous = queryClient.getQueryData<UserSettings>(queryKey);
			const createdUrls: Record<string, string> = {};
			if (previous) {
				const { avatarFile, coverFile, ...restData } = patchData;

				let avatarUrl: string | null | undefined = undefined;
				if (avatarFile) {
					createdUrls.avatarUrl = URL.createObjectURL(avatarFile);
					avatarUrl = createdUrls.avatarUrl;
				}

				let coverImageUrl: string | null | undefined = undefined;
				if (coverFile) {
					createdUrls.coverImageUrl = URL.createObjectURL(coverFile);
					coverImageUrl = createdUrls.coverImageUrl;
				}

				queryClient.setQueryData<UserSettings>(queryKey, {
					...previous,
					...restData,
					...(avatarUrl !== undefined && { avatarUrl }),
					...(coverImageUrl !== undefined && { coverImageUrl }),
				});
			}

			return { previous, createdUrls };
		},

		onError: (_err, _patchData, context) => {
			if (context?.previous) {
				queryClient.setQueryData(queryKey, context.previous);
			}
		},

		onSettled: (_data, _error, _variables, context) => {
			const { createdUrls } = context || {};
			if (createdUrls) {
				Object.values(createdUrls).forEach((url) => URL.revokeObjectURL(url));
			}
			queryClient.invalidateQueries({ queryKey });
		},
		onSuccess: () => {
			const currentSession = useSessionStore.getState().user;
			const updatedSettings = queryClient.getQueryData<UserSettings>(queryKey);

			if (currentSession && updatedSettings) {
				setUser({
					...currentSession,
					displayName:
						updatedSettings.displayName ?? currentSession.displayName,
					avatarUrl: updatedSettings.avatarUrl ?? undefined,
				});
			}
		},
	});
};
