'use client';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

interface FriendRequestDirectionProps {
	direction: 'incoming' | 'outgoing';
	setDirection: (direction: 'incoming' | 'outgoing') => void;
}

const FriendRequestDirection = ({
	direction,
	setDirection,
}: FriendRequestDirectionProps) => {
	return (
		<ButtonGroup>
			<Button
				size='sm'
				variant='outline'
				disabled={direction === 'incoming'}
				onClick={() => setDirection('incoming')}
				className='text-[12px] '>
				Incoming
			</Button>
			<Button
				size='sm'
				variant='outline'
				disabled={direction === 'outgoing'}
				onClick={() => setDirection('outgoing')}
				className='text-[12px] '>
				Outgoing
			</Button>
		</ButtonGroup>
	);
};

export default FriendRequestDirection;
