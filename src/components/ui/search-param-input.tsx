'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { parseAsString, useQueryState } from 'nuqs';
import { usePathname } from '@/modules/i18n/utils/navigation';
import { InputSearch } from './input-search';

interface Props {
	defaultValue?: string;
	onValueChange: (value: string) => void;
	placeholder?: string;
	debounceMs?: number;
	className?: string;
}

export const SearchInput = ({
	defaultValue = '',
	onValueChange,
	placeholder = '',
	debounceMs = 500,
	className,
}: Props) => {
	const pathname = usePathname();
	const lastPathnameRef = useRef<string>(pathname);

	const inputRef = useRef<HTMLInputElement | null>(null);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleChange = useCallback(
		(val: string) => {
			if (timerRef.current) clearTimeout(timerRef.current);

			timerRef.current = setTimeout(() => {
				onValueChange(val);
			}, debounceMs);
		},
		[debounceMs, onValueChange],
	);

	useEffect(() => {
		if (pathname !== lastPathnameRef.current) {
			lastPathnameRef.current = pathname;

			if (inputRef.current) {
				const val = inputRef.current.value;
				setTimeout(() => {
					onValueChange(val);
				}, 0);
			}
		}
	}, [pathname, onValueChange]);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	return (
		<InputSearch
			ref={inputRef}
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
	const [value, setValue] = useQueryState(paramKey, parseAsString.withDefault(''));

	const handleChange = (val: string) => {
		setValue(val || null);
		onValueChange?.(paramKey, val);
	};

	return (
		<SearchInput
			defaultValue={value}
			placeholder={placeholder}
			debounceMs={debounceMs}
			className={className}
			onValueChange={handleChange}
		/>
	);
}
