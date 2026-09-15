'use client';

import { parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';
import { useMemo } from 'react';
import { ChatRoomFeed, ChatRoomOrderBy } from '../../types/room';

export const useChatRoomParams = () => {
	const [filters, setFilters] = useQueryStates({
		search: parseAsString.withDefault(''),
		type: parseAsStringEnum(Object.values(ChatRoomFeed)).withDefault(
			ChatRoomFeed.ALL,
		),
		orderBy: parseAsStringEnum(Object.values(ChatRoomOrderBy)).withDefault(
			ChatRoomOrderBy.ACTIVITY_DESC,
		),
	});

	const params = useMemo(
		() => ({
			...filters,
		}),
		[filters],
	);

	return {
		params,
		setFilters,
	};
};
