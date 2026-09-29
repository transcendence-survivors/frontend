import I18nLink from '@/modules/i18n/components/I18nLink';
import { UserCard } from './UserCard';
import { BaseUserCardProps } from './UsersFeedData';

export const UserSearchCard = ({ user }: BaseUserCardProps) => {
	return (
		<UserCard user={user} className='hover:bg-muted/40 relative'>
			<I18nLink
				href='userName'
				hrefParams={{ username: `@${user.username}` }}
				className='absolute inset-0 z-1'
			/>
		</UserCard>
	);
};
