import { Button } from './button';
import { ButtonGroup } from './button-group';

interface ButtonsStateProps<T> {
	value: T;
	setValue: (value: T) => void;
	buttons: {
		node: React.ReactNode;
		value: T;
	}[];
}

const ButtonsState = <T extends string>({
	value,
	setValue,
	buttons,
}: ButtonsStateProps<T>) => {
	return (
		<ButtonGroup>
			{buttons.map((button, index) => (
				<Button
					key={index}
					size='sm'
					variant={value === button.value ? 'default' : 'outline'}
					disabled={value === button.value}
					data-active={value === button.value}
					onClick={() => setValue(button.value)}
					className={`text-[11px] ${value === button.value ? '' : 'text-muted-foreground'}`}>
					{button.node}
				</Button>
			))}
		</ButtonGroup>
	);
};
export { ButtonsState };
