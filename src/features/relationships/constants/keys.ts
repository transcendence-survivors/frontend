export const relationshipKeys = {
	all: ['relationships'],
	status: (username: string) => [...relationshipKeys.all, username],
} as const;
