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
import { Field, FieldLabel, FieldError as FieldErrorComp } from '@ui/field';
import { useTranslations } from 'next-intl';
import { translateError } from '../../utils/translate/errors';
import { FormFieldParams } from '../../types/FormFieldParams';
import FormLabelAddon from './Addons/FormLabelAddon';

interface ControlledFieldProps<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
	label: FormFieldParams<T>['label'];
	isRequired?: boolean;
	layout?: 'vertical' | 'horizontal';
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
	isRequired = true,
	layout = 'vertical',
	children,
}: ControlledFieldProps<T>) => {
	const t = useTranslations();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState, formState }) => (
				<Field data-invalid={fieldState.invalid} className='gap-0 max-w-full'>
					<FieldLabel
						className={`flex w-full ${layout === 'vertical' ? 'flex-col items-start gap-2' : 'justify-between items-center gap-2'}`}>
						<div
							className={`flex justify-between ${layout === 'vertical' ? 'w-full' : ''}`}>
							<div>
								{label.text}
								{isRequired && (
									<>
										&nbsp;
										<span className='text-destructive'>*</span>
									</>
								)}
							</div>
							{label.addon && <FormLabelAddon addon={label.addon} />}
						</div>
						<div className={layout === 'vertical' ? 'w-full' : ''}>
							{children({ field, fieldState, formState })}
						</div>
					</FieldLabel>
					{fieldState.invalid && (
						<FieldErrorComp
							errors={[translateError(t, fieldState.error)]}
							className='ml-1'
						/>
					)}
				</Field>
			)}
		/>
	);
};

export default ControlledField;
