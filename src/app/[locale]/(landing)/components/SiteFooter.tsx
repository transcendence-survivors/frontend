import { useTranslations } from 'next-intl';
import I18nLink from '@/modules/i18n/components/I18nLink';

export default function SiteFooter() {
	const t = useTranslations('landing.footer');
	const tNav = useTranslations('nav');

	return (
		<div
			className={
				'border-t border-border mt-10 ' +
				'px-4 py-6 max-w-5xl mx-auto ' +
				'flex flex-col sm:flex-row gap-2 justify-between items-center text-center'
			}>
			<span className={'font-mono text-xs ' + 'text-muted-foreground'}>
				{t('copyright')}
			</span>
			<I18nLink
				href='legalNotice'
				className={
					'font-mono text-xs uppercase ' +
					'text-muted-foreground hover:text-foreground'
				}>
				{tNav('legal')}
			</I18nLink>
			<span className={'font-mono text-xs ' + 'text-muted-foreground'}>
				{t('engine')}
			</span>
		</div>
	);
}
