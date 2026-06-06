export interface RecapFieldPayload {
	label: string;
	asPassword?: boolean;
	value: unknown;
}

interface RecapFieldProps
	extends RecapFieldPayload, React.HTMLAttributes<HTMLDivElement> {}

const RecapField = ({ label, value, asPassword = false, ...props }: RecapFieldProps) => {
	const displayValue = () => {
		if (typeof value === 'boolean') {
			return value ? '✓' : '✗';
		}
		if (asPassword) {
			return '•'.repeat(String(value).length);
		}
		return String(value);
	};

	const displayInline = typeof value === 'string' ? value.length <= 50 : true;

	return (
		<div
			className={`grid  text-sm ${displayInline ? 'grid-cols-2 gap-2' : ''}`}
			{...props}>
			<span className='text-muted-foreground'>{label}</span>
			<span
				className={`font-medium ${displayInline ? 'text-right' : ''} break-all`}>
				{displayValue()}
			</span>
		</div>
	);
};

export default RecapField;
