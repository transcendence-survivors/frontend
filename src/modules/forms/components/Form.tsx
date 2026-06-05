'use client';

import { default as FormFieldComponent, type FormFieldG } from './Base/FormField';
import { Field, FieldError } from '@ui/field';

import {
	useForm,
	type FieldValues,
	type Resolver,
	type DefaultValues,
} from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { default as SubmitButton, type SubmitButtonProps } from './Base/SubmitButton';
import { default as ResetButton, type ResetButtonProps } from './Base/ResetButton';

type Schema<TOut extends FieldValues> = z.ZodType<TOut, FieldValues>;

interface TruethyFormResetButtonProps extends Omit<ResetButtonProps, 'isDisabled'> {
	show: true;
}
interface FalsyFormResetButtonProps {
	show: false;
}
type FormResetButtonProps = TruethyFormResetButtonProps | FalsyFormResetButtonProps;

type FormSubmitButtonProps = Omit<
	SubmitButtonProps,
	'isLoading' | 'wasSubmitted' | 'isDisabled'
>;

interface FormState {
	isPending?: boolean;
	isError?: boolean;
	wasSubmitted?: boolean;
}

export interface FormProps<T extends FieldValues> {
	fields: FormFieldG<T>[];
	schema: Schema<T>;
	defaultValues: DefaultValues<T>;
	onSubmit: (data: T) => void;
	states: FormState;
	allowMultipleSubmissions?: boolean;
	resetBtn?: FormResetButtonProps;
	submitBtn: FormSubmitButtonProps;
}

export default function Form<T extends FieldValues>({
	fields,
	schema,
	defaultValues,
	onSubmit,
	states: { wasSubmitted = false },
	allowMultipleSubmissions = false,
	resetBtn = { show: false },
	submitBtn,
}: FormProps<T>) {
	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty, isSubmitting },
	} = useForm<T>({
		resolver: zodResolver(schema) as Resolver<T>,
		defaultValues,
	});

	const isFieldDisabled = isSubmitting || (wasSubmitted && !allowMultipleSubmissions);

	useEffect(() => {
		if (wasSubmitted) reset();
	}, [wasSubmitted, reset]);

	const renderResetBtn = () => {
		if (!resetBtn.show) return null;
		const { show, ...resetBtnProps } = resetBtn;
		return show ? (
			<ResetButton
				{...resetBtnProps}
				isDisabled={isFieldDisabled || !isDirty}
				onClick={() => reset()}
			/>
		) : null;
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4' noValidate>
			{fields.map((field, index) => (
				<FormFieldComponent
					key={index}
					field={field}
					control={control}
					disabled={isFieldDisabled}
				/>
			))}
			<Field>
				{renderResetBtn()}
				<SubmitButton
					{...submitBtn}
					isLoading={isSubmitting}
					wasSubmitted={wasSubmitted}
					isDisabled={isFieldDisabled}
					isEmptyFields={!isDirty}
				/>
			</Field>
		</form>
	);
}
