import { ChatMemberRole } from '../types/member';

export const ROLE_HIERARCHY: Record<ChatMemberRole, number> = {
	OWNER: 3,
	ADMIN: 2,
	MEMBER: 1,
};

export const canManageMember = (
	currentRole: ChatMemberRole | undefined,
	targetRole: ChatMemberRole,
): boolean => {
	if (!currentRole) return false;
	return ROLE_HIERARCHY[currentRole] > ROLE_HIERARCHY[targetRole];
};
