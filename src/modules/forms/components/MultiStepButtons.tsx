import { Button } from '@ui/button';
import { Spinner } from '@/components/ui/spinner';

export interface MutliStepButtonsPayload {
	backText: string;
	continueText: string;
	submitText: string;
	submittingText: string;
}

interface MultiStepNavProps {
	isFirstStep: boolean;
	isLastStep: boolean;
	back: () => void;
	disableSubmit?: boolean;
	isSubmitting?: boolean;
	payload: MutliStepButtonsPayload;
}

const MultiStepButtons = ({
	isFirstStep,
	isLastStep,
	back,
	disableSubmit = false,
	isSubmitting = false,
	payload: { backText, continueText, submitText, submittingText },
}: MultiStepNavProps) => (
	<nav className='flex space-x-2'>
		{!isFirstStep && (
			<Button type='button' variant='outline' onClick={back}>
				{backText}
			</Button>
		)}
		<Button
			type='submit'
			className='ml-auto'
			disabled={disableSubmit || isSubmitting}>
			{isSubmitting ? (
				<>
					<span>{submittingText}</span>
					<Spinner />
				</>
			) : isLastStep ? (
				<>{submitText}</>
			) : (
				<>{continueText}</>
			)}
		</Button>
	</nav>
);

export default MultiStepButtons;
