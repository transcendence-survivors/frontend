'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { useMultiStep } from '../../../hooks/useMultiStep';
import { runValidators } from '../utils/mutliStep/validators';
import { MultiStepFormStep } from '../utils/mutliStep/types';
import { RecapGroupPayload } from '../components/Recap/RecapGroup';

interface WithRecap {
	on: true;
	recapTitle: string;
}
interface WithoutRecap {
	on?: false;
}

export type RecapConfig = WithRecap | WithoutRecap;

export interface UseMultiStepFormReturn<T extends FieldValues> {
	step: number;
	totalSteps: number;
	progress: number;
	isFirstStep: boolean;
	isLastStep: boolean;
	visitedSteps: ReadonlySet<number>;
	back: () => void;

	isRecapStep: boolean;
	current: MultiStepFormStep<T> | undefined;
	stepTitles: string[];
	isCurrentStepError: boolean;

	isSubmitting: boolean;
	isValidating: boolean;
	isGlobalError: boolean;

	getRecap: () => RecapGroupPayload[];
	handleGoTo: (index: number) => Promise<void>;
	handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
}

export const useMultiStepForm = <T extends FieldValues>(
	steps: MultiStepFormStep<T>[],
	form: UseFormReturn<T>,
	recap: RecapConfig,
	onSubmit: (values: T) => Promise<void> | void,
): UseMultiStepFormReturn<T> => {
	const validatedSteps = useRef<Map<number, string>>(new Map());
	const [isValidating, setIsValidating] = useState(false);
	const { totalSteps, stepTitles } = useMemo(
		() => ({
			totalSteps: steps.length + (recap.on ? 1 : 0),
			stepTitles: [
				...steps.map((s) => s.title),
				...(recap.on ? [recap.recapTitle] : []),
			],
		}),
		[steps, recap],
	);

	const { step, progress, next, back, goTo, isFirstStep, isLastStep, visitedSteps } =
		useMultiStep(totalSteps);

	const isRecapStep = recap.on ? step === steps.length : false;
	const current = isRecapStep ? undefined : steps[step];
	const currentFieldNames = useMemo(
		() => new Set(current?.fields.map((f) => String(f.name)) ?? []),
		[current],
	);
	const isCurrentStepError = Object.keys(form.formState.errors).some((key) =>
		currentFieldNames.has(key),
	);

	useEffect(() => {
		if (!current?.fields[0]) {
			return;
		}
		form.setFocus(current.fields[0].name);
	}, [step, form, current]);

	const getStepSnapshot = useCallback(
		(stepIndex: number): string => {
			const values = form.getValues();

			return JSON.stringify(
				steps[stepIndex].fields.reduce<Record<string, unknown>>((acc, field) => {
					acc[field.name as string] = values[field.name];
					return acc;
				}, {}),
			);
		},
		[form, steps],
	);

	const isStepValidated = useCallback(
		(stepIndex: number) => {
			return validatedSteps.current.get(stepIndex) === getStepSnapshot(stepIndex);
		},
		[getStepSnapshot],
	);

	const validateCurrentStep = useCallback(async (): Promise<boolean> => {
		if (!current) {
			return false;
		}
		const valid = await form.trigger(current.fields.map((f) => f.name));
		if (!valid) {
			return false;
		}

		setIsValidating(true);
		try {
			const result = await runValidators(current.validators, form.getValues());
			if (result.ok === false) {
				for (const error of result.errors) {
					form.setError(error.field as `form.${string}`, {
						message: error.message,
					});
				}
				return false;
			}

			validatedSteps.current.set(step, getStepSnapshot(step));
			return true;
		} finally {
			setIsValidating(false);
		}
	}, [current, form, step, getStepSnapshot]);

	const handleGoTo = useCallback(
		async (index: number) => {
			if (index <= step || isStepValidated(step) || (await validateCurrentStep())) {
				goTo(index);
			}
		},
		[step, goTo, validateCurrentStep, isStepValidated],
	);

	const handleSubmit = useCallback(
		async (e: React.SubmitEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (isLastStep) {
				if (!(await form.trigger())) {
					return;
				}
				return form.handleSubmit(onSubmit)();
			}
			if (isStepValidated(step) || (await validateCurrentStep())) {
				next();
			}
		},
		[isLastStep, form, onSubmit, validateCurrentStep, next, step, isStepValidated],
	);

	const getRecap = useCallback((): RecapGroupPayload[] => {
		const allValues = form.getValues();
		return steps.map((s) => ({
			title: s.title,
			fields: s.fields.map((field) => ({
				label: String(field.label),
				asPassword: field.component === 'input' && field.variant === 'password',
				value: allValues[field.name],
			})),
		}));
	}, [steps, form]);

	return {
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
		isSubmitting: form.formState.isSubmitting,
		isGlobalError: !!form.formState.errors.root,

		getRecap,
		handleGoTo,
		handleSubmit,
	};
};
