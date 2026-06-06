'use client';

import { ProgressBar } from '@/components/ui/progress-bar';
import { StepIndicator } from '@/components/ui/step-indicator';

interface FormProgressProps {
	totalSteps: number;
	currentStep: number;
	progress: number;
	visitedSteps: ReadonlySet<number>;
	goTo: (index: number) => void;
	stepTitles: string[];
	showStepIndicator?: boolean;
}

export const FormProgress = ({
	totalSteps,
	currentStep,
	progress,
	visitedSteps,
	goTo,
	stepTitles,
	showStepIndicator = false,
}: FormProgressProps) => (
	<div className='space-y-2'>
		{showStepIndicator && (
			<nav className='flex items-center justify-between'>
				<StepIndicator
					totalSteps={totalSteps}
					currentStep={currentStep}
					visitedSteps={visitedSteps}
					goTo={goTo}
					stepTitles={stepTitles}
				/>
				<span className='text-xs tabular-nums text-muted-foreground'>
					{currentStep + 1} / {totalSteps}
				</span>
			</nav>
		)}
		<ProgressBar progress={progress} />
	</div>
);
