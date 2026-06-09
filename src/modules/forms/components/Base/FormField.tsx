import ControlledField from './ControlledField';
import { InputGroup, InputGroupTextarea } from '@ui/input-group';
import { Input } from '@ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectLabel,
} from '@ui/select';
import type {
	Control,
	ControllerFieldState,
	ControllerRenderProps,
	FieldValues,
	Path,
} from 'react-hook-form';
import { Checkbox } from '@ui/checkbox';
import { FormFieldParams } from '../../types/FormFieldParams';
import InputPassword from '@/components/ui/input-password';
import FormLengthAddon from './Addons/FormLengthAddon';
import InputPhone from '@/components/ui/input-phone';
import DatePicker from '@/components/ui/date-picker';

interface FormFieldProps<T extends FieldValues> {
	field: FormFieldParams<T>;
	control: Control<T>;
	disabled?: boolean;
}

const FormField = <T extends FieldValues>({
	field,
	control,
	disabled = false,
}: FormFieldProps<T>) => {
	const componentType = field.component;

	const renderControl = (
		rhfField: ControllerRenderProps<T, Path<T>>,
		fieldState: ControllerFieldState,
	) => {
		const communProps = {
			...rhfField,
			'aria-invalid': fieldState.invalid,
			'disabled': disabled,
			'name': field.name,
		};
		switch (componentType) {
			case 'input':
				switch (field.variant) {
					case 'password':
						return (
							<InputPassword
								{...communProps}
								value={rhfField.value ?? ''}
								placeholder={field.placeholder}
							/>
						);
					case 'email':
						return (
							<Input
								{...communProps}
								value={rhfField.value ?? ''}
								type='email'
								placeholder={field.placeholder}
							/>
						);
					case 'phone':
						return (
							<InputPhone
								{...communProps}
								placeholder={field.placeholder}
								value={rhfField.value ?? ''}
							/>
						);
					case 'date':
						return (
							<DatePicker
								{...communProps}
								setSelectedDate={rhfField.onChange}
								selectedDate={rhfField.value}
								// other props can be passed like
								// disabledBefore or disabledAfter
							/>
						);
					default:
						return (
							<Input
								{...communProps}
								value={rhfField.value ?? ''}
								type={field?.type ?? 'text'}
								placeholder={field.placeholder}
							/>
						);
				}
			case 'textarea':
				return (
					<InputGroupTextarea
						{...communProps}
						value={rhfField.value ?? ''}
						placeholder={field.placeholder}
					/>
				);
			case 'checkbox':
				return (
					<Checkbox
						{...communProps}
						checked={!!rhfField.value}
						onCheckedChange={(checked) => rhfField.onChange(checked)}
					/>
				);
			case 'select':
				return (
					<Select {...communProps}>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder={field.placeholder} />
						</SelectTrigger>
						<SelectContent>
							{field.optionsGroups.map(({ label, options }, groupIndex) => (
								<SelectGroup key={groupIndex}>
									{label && <SelectLabel>{label}</SelectLabel>}
									{options.map((option) => (
										<SelectItem
											key={option.value}
											value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectGroup>
							))}
						</SelectContent>
					</Select>
				);
		}
	};

	const renderAddon = (rhfField: ControllerRenderProps<T, Path<T>>) => {
		if ('addon' in field && field.addon) {
			const { type, ...rest } = field.addon;
			switch (type) {
				case 'length':
					return (
						<FormLengthAddon
							{...rest}
							currentLength={rhfField.value?.toString().length || 0}
						/>
					);
				default:
					return null;
			}
		}
	};

	return (
		<ControlledField
			name={field.name}
			control={control}
			label={field.label}
			isRequired={field.required}>
			{({ field: rhfField, fieldState }) => (
				<>
					{componentType === 'checkbox' ? (
						renderControl(rhfField, fieldState)
					) : (
						<InputGroup>
							{renderControl(rhfField, fieldState)}
							{renderAddon(rhfField)}
						</InputGroup>
					)}
				</>
			)}
		</ControlledField>
	);
};

export default FormField;
