'use client';

import { useEffect, useRef } from 'react';
import { useQueryState } from 'nuqs';
import { Input } from './input';

type Props = {
	paramKey: string;
	placeholder?: string;
	debounceMs?: number;
	className?: string;
};

export function SearchParamInput({
	paramKey,
	placeholder = 'Search...',
	debounceMs = 500,
	className,
}: Props) {
	const [value, setValue] = useQueryState(paramKey);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	const debouncedSet = (val: string) => {
		if (timerRef.current) clearTimeout(timerRef.current);

		timerRef.current = setTimeout(() => {
			setValue(val || null);
		}, debounceMs);
	};

	return (
		<Input
			defaultValue={value || ''}
			placeholder={placeholder}
			className={className}
			type='text'
			onChange={(e) => debouncedSet(e.target.value)}
		/>
	);
}
