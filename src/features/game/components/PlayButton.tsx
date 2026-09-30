import { Button } from '@/components/ui/button';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';

type PlayButtonProps = React.ComponentProps<typeof Button> & {
	hideMobileText?: boolean;
};

const PlayButton = ({ hideMobileText = true, ...props }: PlayButtonProps) => {
	const t = useTranslations('game');

	return (
		<Button asChild {...props}>
			<I18nLink href='gamePlay' className='gap-0'>
				<Play className={`size-4 ${hideMobileText ? 'md:mr-2' : 'mr-2'}`} />
				<span className={`${hideMobileText ? 'sr-only md:not-sr-only' : ''}`}>
					{t('play')}
				</span>
			</I18nLink>
		</Button>
	);
};

export default PlayButton;
