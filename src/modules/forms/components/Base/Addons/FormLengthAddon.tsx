import { InputGroupAddon, InputGroupText } from '@/components/ui/input-group';
import { FORM_ADDONS } from '@/modules/forms/constants/addons';
import { FormFieldLengthAddon } from '@/modules/forms/types/FormFieldAddons';
import { useTranslations } from 'next-intl';
import { ComponentProps } from 'react';

interface FormLengthAddonProps
	extends
		Omit<FormFieldLengthAddon, 'type'>,
		Omit<ComponentProps<typeof InputGroupAddon>, 'align'> {
	currentLength: number;
}

const FormLengthAddon = ({
	align = 'block-end',
	maxLength,
	currentLength,
}: FormLengthAddonProps) => {
	const t = useTranslations();

	return (
		<InputGroupAddon align={align}>
			<InputGroupText>
				{t(FORM_ADDONS.length, { current: currentLength, max: maxLength })}
			</InputGroupText>
		</InputGroupAddon>
	);
};

export default FormLengthAddon;
