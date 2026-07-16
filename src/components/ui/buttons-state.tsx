import { cn } from '@/libs/utils';
import { Button } from './button';
import { ButtonGroup } from './button-group';

interface ButtonsStateProps<T> extends React.HTMLAttributes<HTMLElement> {
	value: T;
	setValue: (value: T) => void;
	buttons: {
		node: React.ReactNode;
		value: T;
	}[];
	buttonClassName?: Pick<React.ComponentProps<typeof Button>, 'className'>['className'];
}

const ButtonsState = <T extends string>({
	value,
	setValue,
	buttons,
	buttonClassName,
	...props
}: ButtonsStateProps<T>) => {
	return (
		<ButtonGroup {...props}>
			{buttons.map((button, index) => (
				<Button
					key={index}
					size='sm'
					variant={value === button.value ? 'default' : 'outline'}
					disabled={value === button.value}
					data-active={value === button.value}
					onClick={() => setValue(button.value)}
					className={cn(
						`text-[11px] ${value === button.value ? '' : 'text-muted-foreground'}`,
						buttonClassName,
					)}>
					{button.node}
				</Button>
			))}
		</ButtonGroup>
	);
};
export { ButtonsState };
