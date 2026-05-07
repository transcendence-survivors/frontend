import { z } from 'zod';

enum ERROR_KEYS {
	ERR_EMPTY = 'ERR_EMPTY',
	ERR_MIN_LENGTH = 'ERR_MIN_LENGTH',
	ERR_MAX_LENGTH = 'ERR_MAX_LENGTH',
	ERR_IS_STRING = 'ERR_IS_STRING',
	ERR_IS_DATE = 'ERR_IS_DATE',
	ERR_IS_EMAIL = 'ERR_IS_EMAIL',
	ERR_UNDEFINED = 'ERR_UNDEFINED',
}

export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

const userIdSchema = z.uuid({ message: ERROR_KEYS.ERR_IS_STRING });

const userEmailSchema = z.email({ message: ERROR_KEYS.ERR_IS_EMAIL });
const userNameSchema = z
	.string()
	.min(3, { message: ERROR_KEYS.ERR_MIN_LENGTH })
	.max(20, { message: ERROR_KEYS.ERR_MAX_LENGTH });

const userDisplayNameSchema = z
	.string({ message: ERROR_KEYS.ERR_IS_STRING })
	.min(3, { message: ERROR_KEYS.ERR_MIN_LENGTH })
	.max(50, { message: ERROR_KEYS.ERR_MAX_LENGTH });

const userFirstNameSchema = z
	.string({ message: ERROR_KEYS.ERR_IS_STRING })
	.min(3, { message: ERROR_KEYS.ERR_MIN_LENGTH })
	.max(50, { message: ERROR_KEYS.ERR_MAX_LENGTH });

const userLastNameSchema = z
	.string({ message: ERROR_KEYS.ERR_IS_STRING })
	.min(3, { message: ERROR_KEYS.ERR_MIN_LENGTH })
	.max(50, { message: ERROR_KEYS.ERR_MAX_LENGTH });

const userPasswordSchema = z
	.string({ message: ERROR_KEYS.ERR_IS_STRING })
	.min(6, { message: ERROR_KEYS.ERR_MIN_LENGTH })
	.max(100, { message: ERROR_KEYS.ERR_MAX_LENGTH });

const userBirthdaySchema = z.date({ message: ERROR_KEYS.ERR_IS_DATE });

type UserCreateInput = z.infer<typeof userCreateSchema>;
const userCreateSchema = z.object({
	email: userEmailSchema,
	username: userNameSchema,
	displayName: userDisplayNameSchema,
	firstName: userFirstNameSchema,
	lastName: userLastNameSchema,
	birthday: userBirthdaySchema,
	password: userPasswordSchema,
	confirmPassword: userPasswordSchema,
});

type UserLoginInput = z.infer<typeof userLoginSchema>;
const userLoginSchema = z.object({
	email: userEmailSchema,
	password: userPasswordSchema,
});

type UserUpdateInput = z.infer<typeof userUpdateSchema>;
const userUpdateSchema = z.object({
	email: userEmailSchema.optional(),
	username: userNameSchema.optional(),
	displayName: userDisplayNameSchema.optional(),
	firstName: userFirstNameSchema.optional(),
	lastName: userLastNameSchema.optional(),
});

type User = z.infer<typeof userSchema> & {
	role: UserRole;
	createdAt: Date;
	updatedAt: Date;
};
const userSchema = z.object({
	id: userIdSchema,
	email: userEmailSchema,
	username: userNameSchema,
	displayName: userDisplayNameSchema,
	firstName: userFirstNameSchema,
	lastName: userLastNameSchema,
	birthday: userBirthdaySchema,
});

export type { User, UserCreateInput, UserLoginInput, UserUpdateInput };
export { userSchema, userCreateSchema, userLoginSchema, userUpdateSchema };
