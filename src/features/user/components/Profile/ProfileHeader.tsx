import { Button } from '@/components/ui/button';
import { type User } from '../../schemas/user.schema';
import Banner from './Banner';
import UserDisplayUsername from '../Identity/UserDisplayUsername';
import ProfileNav from './ProfileNav';
import { AvatarModal } from '../Avatar/AvatarModal';
import { useTranslations } from 'next-intl';
import EditProfile from './EditProfile';

interface ProfileHeaderProps extends React.HTMLAttributes<HTMLElement> {
	user: Pick<
		User,
		'username' | 'displayName' | 'avatarUrl' | 'bannerUrl' | 'birthdate' | 'bio'
	>;
}

const ProfileHeader = ({
	user: { username, displayName, bannerUrl, avatarUrl, bio },
	...props
}: ProfileHeaderProps) => {
	const t = useTranslations('profile');

	return (
		<header {...props}>
			<section>
				<Banner
					img={{
						src: bannerUrl,
						alt: username,
					}}
				/>
				<div className='-mt-14 px-6 pb-8'>
					<div className='flex flex-col sm:flex-row gap-x-6 gap-y-5 relative'>
						<AvatarModal
							className='z-10'
							img={{
								src: avatarUrl,
								alt: username,
							}}
						/>
						<div className='sm:pt-16 flex justify-between w-full flex-wrap-reverse'>
							<UserDisplayUsername
								username={username}
								displayName={displayName}
								as='main-titles'
							/>
						</div>
						<div className='py-4 absolute top-1/3 sm:top-1/2 right-0'>
							<div className='flex items-center gap-x-2 ml-auto'>
								<EditProfile>
									<Button variant='default' size={'lg'}>
										{t('edit.button')}
									</Button>
								</EditProfile>
							</div>
						</div>
					</div>
					{bio && (
						<article className='mt-8 space-y-2'>
							<h2 className='text-xl font-bold'>{t('bio')}</h2>
							<p className='text-muted-foreground max-w-xl'>{bio}</p>
						</article>
					)}
				</div>
			</section>
			<ProfileNav />
		</header>
	);
};

export default ProfileHeader;
