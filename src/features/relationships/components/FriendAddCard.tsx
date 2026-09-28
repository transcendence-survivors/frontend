import { FriendRequestSend } from '../friend-request/components/actions/FriendRequestSend';
import { UserCard } from '@/features/user/components/UserCard';

type FriendAddCardProps = Pick<React.ComponentProps<typeof UserCard>, 'user'>;

const FriendAddCard = ({ user, ...props }: FriendAddCardProps) => {
	return (
		<UserCard user={user} {...props}>
			<FriendRequestSend
				user={{
					id: user.id,
					displayName: user.displayName,
				}}
			/>
		</UserCard>
	);
};

export { FriendAddCard };
