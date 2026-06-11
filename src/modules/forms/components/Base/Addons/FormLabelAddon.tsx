import { type FormLabelAddon } from '@/modules/forms/types/FormFieldAddons';
import FormLabelLinkAddon from './FormLabelLinkAddon';

interface FormLabelAddonProps {
	addon: FormLabelAddon;
}

const FormLabelAddon = ({ addon }: FormLabelAddonProps) => {
	switch (addon.type) {
		case 'link':
			return <FormLabelLinkAddon addon={addon} />;
		default:
			return null;
	}
};

export default FormLabelAddon;
