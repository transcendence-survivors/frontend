import { UserCard } from './UserCard';
import { BaseUserCardProps } from './UsersFeedData';

const UserSearchCard = ({ user }: BaseUserCardProps) => {
	return <UserCard user={user} />;
};

export { UserSearchCard };
