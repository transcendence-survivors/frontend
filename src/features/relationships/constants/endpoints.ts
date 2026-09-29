import { Endpoint } from '@/libs/api/helpers/types';

const RELATIONSHIPS_START_PATH = '/relationships' as const;

type StartPath = typeof RELATIONSHIPS_START_PATH;

export const RELATIONSHIPS_ENDPOINTS = {
	getStatus: (username: string) => `${RELATIONSHIPS_START_PATH}/${username}`,
} as const satisfies Record<string, Endpoint<StartPath>>;
