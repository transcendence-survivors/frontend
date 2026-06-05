'use client';

import { FieldValues, UseFormReturn } from 'react-hook-form';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import FormField from './Base/FormField';
import { Recap } from './Recap/Recap';
import { FormProgress } from './FormProgress';
import { useMultiStep } from '../hooks/useMultiStep';
import { runValidators } from '../utils/mutliStep/validators';
import { MultiStepFormStep } from '../utils/mutliStep/types';
import { cn } from '@/libs/utils';
import MultiStepButtons, { MutliStepButtonsPayload } from './MultiStepButtons';
import { useMemo } from 'react';

type Recap = WithRecap | WithoutRecap;
interface WithRecap {
	on: true;
	recapTitle: string;
}
interface WithoutRecap {
	on?: false;
}

type ProgressBar = WithProgressBar | WithoutProgressBar;
interface WithProgressBar {
	on: true;
}
interface WithoutProgressBar {
	on?: false;
}

type MultiStepFormProps<T extends FieldValues> = Omit<
	React.HTMLAttributes<HTMLFormElement>,
	'onSubmit'
> & {
	form: UseFormReturn<T>;
	steps: MultiStepFormStep<T>[];
	onSubmit: (values: T) => Promise<void> | void;
	progressBar?: ProgressBar;
	recap?: Recap;
	buttons: MutliStepButtonsPayload;
};

export function MultiStepForm<T extends FieldValues>({
	form,
	steps,
	onSubmit,
	recap = { on: false },
	progressBar = { on: false },
	buttons,
	className,
	...props
}: MultiStepFormProps<T>) {
	const { totalSteps, stepTitles } = useMemo(() => {
		return {
			totalSteps: steps.length + (recap.on ? 1 : 0),
			stepTitles: [
				...steps.map((s) => s.title),
				...(recap.on ? [recap.recapTitle] : []),
			],
		};
	}, [steps, recap]);

	const { step, progress, next, back, goTo, isFirstStep, isLastStep, visitedSteps } =
		useMultiStep(totalSteps);

	const isRecapStep = recap.on && step === steps.length;
	const current = isRecapStep ? undefined : steps[step];
	const allValues = form.getValues();
	const currentFieldNames = new Set(current?.fields.map((f) => String(f.name)) ?? []);
	const isCurrentStepError = Object.keys(form.formState.errors).some((key) =>
		currentFieldNames.has(key),
	);

	const getRecap = () => {
		return steps.map((s) => ({
			title: s.title,
			fields: s.fields.map((field) => ({
				label: String(field.label),
				value: allValues[field.name],
			})),
		}));
	};

	const validateCurrentStep = async () => {
		if (!current) {
			return false;
		}
		const valid = await form.trigger(current.fields.map((f) => f.name));
		if (!valid) {
			return false;
		}
		const result = await runValidators(current.validators, allValues);
		if (result?.ok === false) {
			if (result.field) {
				form.setError(result.field as `form.${string}`, {
					message: result.message,
				});
			}
			return false;
		}
		return true;
	};

	const handleGoTo = async (index: number) => {
		if (index <= step) {
			goTo(index);
			return;
		}
		if (!(await validateCurrentStep())) {
			return;
		}
		goTo(index);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isLastStep) {
			if (!(await form.trigger())) {
				return;
			}
			return await form.handleSubmit(onSubmit)();
		}
		if (!(await validateCurrentStep())) {
			return;
		}
		next();
	};

	return (
		<form
			noValidate
			className={cn('space-y-4', className)}
			{...props}
			onSubmit={handleSubmit}>
			{progressBar.on && (
				<FormProgress
					totalSteps={totalSteps}
					currentStep={step}
					progress={progress}
					visitedSteps={visitedSteps}
					goTo={handleGoTo}
					stepTitles={stepTitles}
				/>
			)}
			<Card>
				<CardHeader>
					<CardTitle>
						{isRecapStep ? recap.recapTitle : current?.title}
					</CardTitle>
					{current?.description && !isRecapStep && (
						<CardDescription>{current.description}</CardDescription>
					)}
				</CardHeader>
				<CardContent className='space-y-4'>
					{recap.on && isRecapStep ? (
						<Recap data={getRecap()} />
					) : (
						current?.fields.map((field) => (
							<FormField
								key={String(field.name)}
								field={field}
								control={form.control}
							/>
						))
					)}
				</CardContent>
			</Card>
			<MultiStepButtons
				isFirstStep={isFirstStep}
				isLastStep={isLastStep}
				back={back}
				disableSubmit={isCurrentStepError || !form.formState.isDirty}
				isSubmitting={form.formState.isSubmitting}
				payload={buttons}
			/>
			{form.formState.errors.form && (
				<p className='mt-2 text-sm text-red-500'>
					{form.formState.errors.form.message}
				</p>
			)}
		</form>
	);
}
