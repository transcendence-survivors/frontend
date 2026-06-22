import { cn } from '@/libs/utils';
import DisplayName, { DisplayNameProps } from './UserDisplayName';
import Username, { UsernameProps } from './Username';

export interface UserDisplayUsernameProps extends React.HTMLAttributes<HTMLDivElement> {
	username: string;
	displayName: string;
	layout?: 'horizontal' | 'vertical';
	as?: 'main-titles' | 'sub-titles' | 'base';
}

const layoutClassNames: Record<
	NonNullable<UserDisplayUsernameProps['layout']>,
	string
> = {
	horizontal: 'flex items-center gap-x-2',
	vertical: 'flex flex-col',
};

const displayNameTag: Record<
	NonNullable<UserDisplayUsernameProps['as']>,
	DisplayNameProps['tag']
> = {
	'main-titles': 'h1',
	'sub-titles': 'h2',
	'base': 'span',
};

const usernameTag: Record<
	NonNullable<UserDisplayUsernameProps['as']>,
	UsernameProps['tag']
> = {
	'main-titles': 'h2',
	'sub-titles': 'h3',
	'base': 'span',
};

const UserDisplayUsername = ({
	username,
	displayName,
	layout = 'vertical',
	as = 'base',
	className,
	...props
}: UserDisplayUsernameProps) => {
	return (
		<div
			className={cn(layoutClassNames[layout], 'text-left min-w-0', className)}
			{...props}>
			<DisplayName displayName={displayName} tag={displayNameTag[as]} />
			<Username
				username={username}
				tag={usernameTag[as]}
				className={layout === 'horizontal' ? 'order-first' : ''}
			/>
		</div>
	);
};

export default UserDisplayUsername;
