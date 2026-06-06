import RecapField, { RecapFieldPayload } from './RecapField';

export interface RecapGroupPayload {
	title: string;
	fields: RecapFieldPayload[];
}

interface RecapGroupProps
	extends RecapGroupPayload, Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {}

const RecapGroup = ({ title, fields, ...props }: RecapGroupProps) => {
	return (
		<div className='space-y-2' {...props}>
			<h3 className='text-sm font-semibold text-muted-foreground'>{title}</h3>
			<div className='pl-2 border-l space-y-2 overflow-clip'>
				{fields.map((f) => (
					<RecapField key={f.label} {...f} />
				))}
			</div>
		</div>
	);
};

export default RecapGroup;
