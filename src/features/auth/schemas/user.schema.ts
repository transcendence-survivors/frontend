import { SignUpFormValues } from './signup.schema';

export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

type User = Omit<SignUpFormValues, 'confirmPassword'> & {
	role: UserRole;
};

export type { User };
