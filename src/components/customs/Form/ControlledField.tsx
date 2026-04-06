'use client';

import * as React from 'react';
import {
	Controller,
	Control,
	FieldValues,
	Path,
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
} from 'react-hook-form';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';

interface ControlledFieldProps<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
	label: string;
	children: (props: {
		field: ControllerRenderProps<T, Path<T>>;
		fieldState: ControllerFieldState;
		formState: UseFormStateReturn<T>;
	}) => React.ReactNode;
}

const ControlledField = <T extends FieldValues>({
	name,
	control,
	label,
	children,
}: ControlledFieldProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState, formState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel className='grid gap-2'>
						<span>{label}</span>
						{children({ field, fieldState, formState })}
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</FieldLabel>
				</Field>
			)}
		/>
	);
};

export default ControlledField;
