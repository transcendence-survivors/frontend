import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getInitials = (name: string) => {
	const names = name.split(' ');
	const initials = names.map((n) => n[0]).join('');
	return initials.toUpperCase();
};

export const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncate = (str: string, maxLength: number) => {
	if (str.length <= maxLength) {
		return str;
	}
	return str.slice(0, maxLength);
};
