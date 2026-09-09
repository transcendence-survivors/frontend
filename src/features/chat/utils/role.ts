import { ChatMemberRole } from '../types/member';

export enum ChatMemberPermissionEnum {
	MEMBER_PROMOTE = 'MEMBER_PROMOTE',
	MEMBER_DEMOTE = 'MEMBER_DEMOTE',
	MEMBER_KICK = 'MEMBER_KICK',
}

export const ROLE_HIERARCHY: Record<ChatMemberRole, number> = {
	OWNER: 3,
	ADMIN: 2,
	MEMBER: 1,
} as const;

export const ROLE_PERMISSIONS: Record<ChatMemberRole, ChatMemberPermissionEnum[]> = {
	OWNER: [
		ChatMemberPermissionEnum.MEMBER_PROMOTE,
		ChatMemberPermissionEnum.MEMBER_DEMOTE,
		ChatMemberPermissionEnum.MEMBER_KICK,
	],
	ADMIN: [ChatMemberPermissionEnum.MEMBER_KICK],
	MEMBER: [],
};

interface CanManageParams {
	actorRole?: ChatMemberRole;
	targetRole?: ChatMemberRole;
	permission: ChatMemberPermissionEnum;
	desiredRole?: ChatMemberRole;
}

export const canManageMember = ({
	actorRole,
	targetRole,
	permission,
	desiredRole,
}: CanManageParams): boolean => {
	if (!actorRole || !targetRole) return false;

	const hasPermission = ROLE_PERMISSIONS[actorRole]?.includes(permission);
	if (!hasPermission) return false;

	const actorLevel = ROLE_HIERARCHY[actorRole] ?? 0;
	const targetLevel = ROLE_HIERARCHY[targetRole] ?? 0;

	if (actorLevel <= targetLevel) return false;

	if (desiredRole) {
		const desiredLevel = ROLE_HIERARCHY[desiredRole] ?? 0;
		if (actorLevel <= desiredLevel) return false;
	}

	return true;
};
