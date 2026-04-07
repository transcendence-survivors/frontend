import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export interface SubmitButtonProps {
	onSubmitedText: string;
	onDisabledText: string;
	text: string;
	wasSubmitted: boolean;
	isDisabled: boolean;
	isLoading?: boolean;
}

export const SubmitBtn = ({
	text,
	onDisabledText,
	onSubmitedText,
	wasSubmitted,
	isDisabled,
	isLoading = false,
}: SubmitButtonProps) => {
	const display = () => {
		if (isLoading) return <Spinner />;
		if (isDisabled) return onDisabledText;
		if (wasSubmitted) return onSubmitedText;
		return text;
	};

	return (
		<Button type='submit' disabled={isDisabled}>
			{display()}
		</Button>
	);
};

export default SubmitBtn;
