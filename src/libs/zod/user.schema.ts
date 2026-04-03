import { z } from 'zod';

export const UserSchema = z.object({
	username: z.string(),
	email: z.email(),
	firstName: z.string(),
	lastName: z.string(),
	avatarUrl: z.url().optional(),
});

export const CreateUserSchema = UserSchema.extend({});

export type User = z.infer<typeof UserSchema>;
