import { PresenceStatus } from '../types/status';

export const statusPriority: Record<PresenceStatus, number> = {
	[PresenceStatus.OFFLINE]: 0,
	[PresenceStatus.INVISIBLE]: 0,
	[PresenceStatus.DO_NOT_DISTURB]: 1,
	[PresenceStatus.ONLINE]: 2,
};
