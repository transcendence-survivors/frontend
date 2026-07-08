import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { UserPlus } from 'lucide-react';
import { FriendAddSearch } from './FriendAddSearch';
import { useTranslations } from 'next-intl';

const FriendAddDialog = () => {
	const t = useTranslations('relationships.add');

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<UserPlus className='size-3.5' />
					<span>{t('button')}</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-xl font-semibold'>
						{t('title')}
					</DialogTitle>
				</DialogHeader>
				<div className='flex flex-col gap-2 max-h-[60vh]'>
					<FriendAddSearch placeholder={t('placeholder')} />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default FriendAddDialog;
