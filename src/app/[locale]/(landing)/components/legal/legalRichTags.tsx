import I18nLink from '@/modules/i18n/components/I18nLink';

const GITHUB_URL = 'https://github.com/transcendence-survivors';

export const legalRichTags = {
	support: (chunks: React.ReactNode) => (
		<I18nLink href='support' className='text-primary hover:underline'>
			{chunks}
		</I18nLink>
	),
	github: (chunks: React.ReactNode) => (
		<a
			href={GITHUB_URL}
			target='_blank'
			rel='noopener noreferrer'
			className='text-primary hover:underline'>
			{chunks}
		</a>
	),
};
