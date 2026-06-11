import { Button } from '@/components/ui/button';
import { type FormLabelLinkAddon } from '@/modules/forms/types/FormFieldAddons';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { Link } from '@/modules/i18n/utils/navigation';
import { useTranslations } from 'next-intl';

interface FormLabelLinkAddonProps extends Omit<
	React.ComponentPropsWithoutRef<'a'>,
	'href'
> {
	addon: FormLabelLinkAddon;
}

const FormLabelLinkAddon = ({ addon, ...props }: FormLabelLinkAddonProps) => {
	const t = useTranslations();

	return (
		<Button
			variant={addon.as === 'text' ? 'link' : 'default'}
			size='sm'
			className='p-0 h-auto text-muted-foreground text-xs select-auto'
			asChild>
			{addon.variant === 'internal' ? (
				<I18nLink href={addon.href} {...props}>
					{t(addon.text)}
				</I18nLink>
			) : (
				<Link href={addon.href} {...props}>
					{t(addon.text)}
				</Link>
			)}
		</Button>
	);
};

export default FormLabelLinkAddon;
