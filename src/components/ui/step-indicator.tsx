'use client';

import { cn } from '@/libs/utils';

interface StepIndicatorProps {
	totalSteps: number;
	currentStep: number;
	visitedSteps: ReadonlySet<number>;
	goTo: (index: number) => void;
	stepTitles: string[];
}

export const StepIndicator = ({
	totalSteps,
	currentStep,
	visitedSteps,
	goTo,
	stepTitles,
}: StepIndicatorProps) => (
	<ul aria-label='Form steps' className='flex items-center gap-2'>
		{Array.from({ length: totalSteps }).map((_, i) => {
			const isActive = i === currentStep;
			const isVisited = visitedSteps.has(i);

			return (
				<li key={i}>
					<button
						type='button'
						aria-label={stepTitles[i] ?? `Step ${i + 1}`}
						aria-current={isActive ? 'step' : undefined}
						disabled={!isVisited}
						onClick={() => {
							if (isVisited) goTo(i);
						}}
						className={cn(
							'h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
							isActive
								? 'w-6 bg-primary hover:bg-primary/70 focus-visible:bg-primary/70'
								: isVisited
									? 'w-2 bg-primary/40 hover:bg-primary/70 focus-visible:bg-primary/70 cursor-pointer'
									: 'w-2 bg-muted cursor-not-allowed',
						)}
					/>
				</li>
			);
		})}
	</ul>
);
