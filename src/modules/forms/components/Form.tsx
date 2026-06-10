import FormField from './Base/FormField';
import { type FieldValues, type UseFormReturn } from 'react-hook-form';
import { type FormFieldParams } from '../types/FormFieldParams';
import {
	Card,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import FormGlobalError from './FormGlobalError';
import { cn } from '@/libs/utils';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { type ReactNode } from 'react';

export type FormProps<T extends FieldValues> = Omit<
	React.HTMLAttributes<HTMLFormElement>,
	'onSubmit' | 'title'
> & {
	form: UseFormReturn<T>;
	fields: FormFieldParams<T>[];
	onSubmit: (data: T) => Promise<void> | void;
	button: {
		submitText: string;
		submittingText: string;
		submittedText: string;
	};
	title: ReactNode;
	description?: ReactNode;
	bottomDescription?: ReactNode;
};

export default function Form<T extends FieldValues>({
	form,
	fields,
	onSubmit,
	title,
	description,
	bottomDescription,
	button,
	className,
	...props
}: FormProps<T>) {
	const isSubmitting = form.formState.isSubmitting;
	const isGlobalError = !!form.formState.errors.root;

	const getText = () => {
		if (isSubmitting) return button.submittingText;
		if (form.formState.isSubmitSuccessful) return button.submittedText;
		return button.submitText;
	};

	return (
		<form
			noValidate
			className={cn('space-y-4', className)}
			onSubmit={form.handleSubmit(onSubmit)}
			{...props}>
			<Card>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
					{description && <CardDescription>{description}</CardDescription>}
				</CardHeader>
				<CardContent className='space-y-4'>
					{fields.map((field) => (
						<FormField
							key={String(field.name)}
							field={field}
							control={form.control}
							disabled={isSubmitting || isGlobalError}
						/>
					))}
				</CardContent>
				{form.formState.errors.form && (
					<CardFooter>
						<FormGlobalError error={form.formState.errors.form} />
					</CardFooter>
				)}
				{form.formState.errors.root && (
					<CardFooter>
						<FormGlobalError error={form.formState.errors.root} />
					</CardFooter>
				)}
			</Card>

			<div className='flex items-center'>
				{bottomDescription && (
					<CardDescription className='w-full'>
						{bottomDescription}
					</CardDescription>
				)}
				<Button
					type='submit'
					className='ml-auto'
					disabled={!form.formState.isDirty || isSubmitting || isGlobalError}>
					<>
						<span>{getText()}</span>
						{isSubmitting && <Spinner />}
					</>
				</Button>
			</div>
		</form>
	);
}
