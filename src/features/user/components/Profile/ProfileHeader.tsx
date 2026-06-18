import { Button } from '@/components/ui/button';
import { type User } from '../../schemas/user.schema';
import Banner from './Banner';
import UserDisplayUsername from '../UserDisplayUsername';
import UserBirthdate from '../UserBirthdate';
import ProfileNav, { ProfileNavKey } from './ProfileNav';
import { AvatarModal } from '../Avatar/AvatarModal';

interface ProfileHeaderProps extends React.HTMLAttributes<HTMLElement> {
	user: Pick<
		User,
		'username' | 'displayName' | 'avatarUrl' | 'bannerUrl' | 'birthdate' | 'bio'
	>;
	activeLinkKey: ProfileNavKey;
}
const ProfileHeader = ({
	user: { username, displayName, bannerUrl, avatarUrl, birthdate, bio },
	activeLinkKey,
	...props
}: ProfileHeaderProps) => {
	return (
		<header {...props}>
			<section>
				<Banner
					img={{
						src: bannerUrl,
						alt: username,
					}}
				/>
				<div className='-mt-16 px-4 pb-8'>
					<div>
						<AvatarModal
							avatarClassName=''
							className='size-30 z-10'
							img={{
								src: avatarUrl,
								alt: username,
							}}
						/>
					</div>
					<article className='flex justify-between'>
						<div className='mt-2'>
							<UserDisplayUsername
								username={username}
								displayName={displayName}
							/>
							<UserBirthdate
								birthdate={birthdate}
								className='text-sm text-muted-foreground w-fit mt-6'
							/>
						</div>
						<div className='-mt-10 space-y-9'>
							<div className='flex items-center gap-x-2 mr-auto'>
								<Button variant='default' size={'sm'}>
									Edit Profile
								</Button>
							</div>
						</div>
					</article>
					{bio && (
						<div className='mt-6'>
							<p className='text-muted-foreground'>{bio}</p>
						</div>
					)}
				</div>
			</section>
			<ProfileNav activeLinkKey={activeLinkKey} />
		</header>
	);
};

export default ProfileHeader;
