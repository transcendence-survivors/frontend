import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';

interface EditProfileProps extends React.HTMLAttributes<HTMLElement> {}

const EditProfile = ({ children, ...props }: EditProfileProps) => {
	const t = useTranslations('profile.edit');
	return (
		<Dialog {...props}>
			<DialogTrigger asChild>
				<Button variant='default' size={'lg'}>
					{t('button')}
				</Button>
			</DialogTrigger>
			<DialogContent className='w-full max-w-2xl'>
				<DialogHeader>
					<h2 className='text-lg font-semibold'>{t('title')}</h2>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export default EditProfile;
