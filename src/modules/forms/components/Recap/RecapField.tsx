import DisplayDate from '@/components/ui/date';

export interface RecapFieldPayload {
	label: string;
	as: 'text' | 'password' | 'date';
	value: unknown;
}

interface RecapFieldProps
	extends RecapFieldPayload, React.HTMLAttributes<HTMLDivElement> {}

const RecapField = ({ label, value, as = 'text', ...props }: RecapFieldProps) => {
	const displayValue = () => {
		if (typeof value === 'boolean') {
			return value ? '✓' : '✗';
		}
		if (as === 'password') {
			return '•'.repeat(String(value).length);
		}
		if (as === 'date' && value instanceof Date) {
			return (
				<DisplayDate
					date={value}
					formatOptions={{ year: 'numeric', month: 'numeric', day: 'numeric' }}
				/>
			);
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
