import RecapGroup, { RecapGroupPayload } from './RecapGroup';

type RecapProps = {
	data: RecapGroupPayload[];
};

export function Recap({ data }: RecapProps) {
	return (
		<div className='space-y-6'>
			{data.map((group, i) => (
				<RecapGroup key={i} title={group.title} fields={group.fields} />
			))}
		</div>
	);
}
