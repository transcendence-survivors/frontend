'use client';

import { useCallback, useState } from 'react';

export interface UseMultiStepReturn {
	step: number;
	max: number;
	progress: number;
	isFirstStep: boolean;
	isLastStep: boolean;
	visitedSteps: ReadonlySet<number>;
	next: () => void;
	back: () => void;
	goTo: (index: number) => void;
}

export function useMultiStep(totalSteps: number): UseMultiStepReturn {
	const lastIndex = totalSteps - 1;
	const [step, setStep] = useState(0);
	const [visitedSteps, setVisitedSteps] = useState<Set<number>>(() => new Set([0]));
	const progress = totalSteps === 1 ? 100 : Math.round((step / lastIndex) * 100);

	const markVisited = useCallback((index: number) => {
		setVisitedSteps((prev) => {
			if (prev.has(index)) {
				return prev;
			}
			const next = new Set(prev);
			next.add(index);
			return next;
		});
	}, []);

	const next = useCallback(() => {
		setStep((s) => {
			const nextStep = Math.min(s + 1, lastIndex);
			markVisited(nextStep);
			return nextStep;
		});
	}, [lastIndex, markVisited]);

	const back = useCallback(() => {
		setStep((s) => Math.max(s - 1, 0));
	}, []);

	const goTo = useCallback(
		(index: number) => {
			const clamped = Math.max(0, Math.min(index, lastIndex));
			markVisited(clamped);
			setStep(clamped);
		},
		[lastIndex, markVisited],
	);

	return {
		step,
		max: totalSteps,
		progress,
		isFirstStep: step === 0,
		isLastStep: step === lastIndex,
		visitedSteps,
		next,
		back,
		goTo,
	};
}
