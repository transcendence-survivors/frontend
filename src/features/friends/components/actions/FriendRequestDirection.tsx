'use client';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { useTranslations } from 'next-intl';

interface FriendRequestDirectionProps {
	direction: 'incoming' | 'outgoing';
	setDirection: (direction: 'incoming' | 'outgoing') => void;
}

const FriendRequestDirection = ({
	direction,
	setDirection,
}: FriendRequestDirectionProps) => {
	const t = useTranslations('friend_page.requests');

	return (
		<ButtonGroup>
			<Button
				size='sm'
				variant='outline'
				disabled={direction === 'incoming'}
				onClick={() => setDirection('incoming')}
				className='text-[12px] '>
				{t('incoming_button')}
			</Button>
			<Button
				size='sm'
				variant='outline'
				disabled={direction === 'outgoing'}
				onClick={() => setDirection('outgoing')}
				className='text-[12px] '>
				{t('outgoing_button')}
			</Button>
		</ButtonGroup>
	);
};

export default FriendRequestDirection;
