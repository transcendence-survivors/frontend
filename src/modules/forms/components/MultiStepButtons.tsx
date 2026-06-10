import { Button } from '@ui/button';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/libs/utils';

export interface MutliStepButtonsPayload {
	backText: string;
	continueText: string;
	validatingText: string;
	submitText: string;
	submittingText: string;
	submittedText: string;
}

export interface MutliStepButtonsState {
	isValidating: boolean;
	isSubmitting: boolean;
	isSubmitted: boolean;
	disableSubmit: boolean;
}

interface MultiStepNavProps extends React.HTMLAttributes<HTMLElement> {
	isFirstStep: boolean;
	isLastStep: boolean;
	back: () => void;
	payload: MutliStepButtonsPayload;
	state: MutliStepButtonsState;
}

const MultiStepButtons = ({
	isFirstStep,
	isLastStep,
	back,
	state: { isValidating, isSubmitting, isSubmitted, disableSubmit },
	payload: {
		backText,
		continueText,
		submitText,
		submittingText,
		validatingText,
		submittedText,
	},
	className,
	...props
}: MultiStepNavProps) => {
	const isLoading = isValidating || isSubmitting;

	const getText = () => {
		if (isValidating) return validatingText;
		if (isSubmitting) return submittingText;
		if (isValidating) return validatingText;
		if (isSubmitted) return submittedText;
		if (isLastStep) return submitText;
		return continueText;
	};

	return (
		<nav className={cn('flex space-x-2', className)} {...props}>
			{!isFirstStep && (
				<Button type='button' variant='outline' onClick={back}>
					{backText}
				</Button>
			)}
			<Button
				type='submit'
				className='ml-auto'
				disabled={disableSubmit || isLoading}>
				<>
					<span>{getText()}</span>
					{isLoading && <Spinner />}
				</>
			</Button>
		</nav>
	);
};

export default MultiStepButtons;
