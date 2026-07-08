'use client';

import { useEffect, useRef } from 'react';
import { Input } from './input';
import { parseAsString, useQueryState } from 'nuqs';
import { usePathname } from '@/modules/i18n/utils/navigation';

interface Props {
	defaultValue?: string;
	onValueChange: (value: string) => void;
	placeholder?: string;
	debounceMs?: number;
	className?: string;
}

const SearchInput = ({
	defaultValue = '',
	onValueChange,
	placeholder = '',
	debounceMs = 500,
	className,
}: Props) => {
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	const handleChange = (val: string) => {
		if (timerRef.current) clearTimeout(timerRef.current);

		timerRef.current = setTimeout(() => {
			onValueChange(val);
		}, debounceMs);
	};

	return (
		<Input
			defaultValue={defaultValue}
			placeholder={placeholder}
			className={className}
			type='text'
			onChange={(e) => handleChange(e.target.value)}
		/>
	);
};

interface SearchParamsInputProps {
	paramKey: string;
	placeholder?: string;
	debounceMs?: number;
	className?: string;
	onValueChange?: (key: string, value: string) => void;
}

export function SearchParamsInput({
	paramKey,
	placeholder,
	debounceMs,
	className,
	onValueChange,
}: SearchParamsInputProps) {
	const pathname = usePathname();
	const [value, setValue] = useQueryState(paramKey, parseAsString.withDefault(''));

	const handleChange = (val: string) => {
		setValue(val || null);
		onValueChange?.(paramKey, val);
	};

	return (
		<SearchInput
			key={pathname}
			defaultValue={value}
			placeholder={placeholder}
			debounceMs={debounceMs}
			className={className}
			onValueChange={handleChange}
		/>
	);
}

export { SearchInput };
