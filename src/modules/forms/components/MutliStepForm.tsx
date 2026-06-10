'use client';

import { FieldValues, UseFormReturn } from 'react-hook-form';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
import FormField from './Base/FormField';
import { Recap } from './Recap/Recap';
import { FormProgress } from './FormProgress';
import MultiStepButtons, { type MutliStepButtonsPayload } from './MultiStepButtons';
import { useMultiStepForm, type RecapConfig } from '../hooks/useMultiStepForm';
import { type MultiStepFormStep } from '../utils/mutliStep/types';
import { cn } from '@/libs/utils';
import FormGlobalError from './FormToast';

interface WithProgressBar {
	on: true;
	stepIndicator: boolean;
}
interface WithoutProgressBar {
	on?: false;
}
type ProgressBarConfig = WithProgressBar | WithoutProgressBar;

type MultiStepFormProps<T extends FieldValues> = Omit<
	React.HTMLAttributes<HTMLFormElement>,
	'onSubmit'
> & {
	form: UseFormReturn<T>;
	steps: MultiStepFormStep<T>[];
	onSubmit: (values: T) => Promise<void> | void;
	progressBar?: ProgressBarConfig;
	recap?: RecapConfig;
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
	const {
		step,
		totalSteps,
		progress,
		isFirstStep,
		isLastStep,
		visitedSteps,
		back,
		isRecapStep,
		current,
		stepTitles,
		isCurrentStepError,
		isValidating,
		isSubmitting,
		isGlobalError,
		getRecap,
		handleGoTo,
		handleSubmit,
	} = useMultiStepForm(steps, form, recap, onSubmit);

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
					showStepIndicator={progressBar.stepIndicator}
				/>
			)}
			<Card>
				<CardHeader>
					<CardTitle>
						{recap.on && isRecapStep ? recap.recapTitle : current?.title}
					</CardTitle>
					{!isRecapStep && current?.description && (
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
								disabled={isSubmitting || isValidating || isGlobalError}
							/>
						))
					)}
				</CardContent>
				{form.formState.errors.form && (
					<CardFooter>
						<FormGlobalError error={form.formState.errors.form} />
					</CardFooter>
				)}
			</Card>
			<MultiStepButtons
				isFirstStep={isFirstStep}
				isLastStep={isLastStep}
				back={back}
				state={{
					disableSubmit:
						isCurrentStepError || !form.formState.isDirty || isGlobalError,
					isSubmitting,
					isValidating,
					isSubmitted: form.formState.isSubmitSuccessful,
				}}
				payload={buttons}
			/>
		</form>
	);
}
