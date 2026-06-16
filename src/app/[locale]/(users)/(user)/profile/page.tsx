import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AvatarProfile from '@/features/user/components/Avatar/AvatarProfile';
import Banner from '@/features/user/components/Banner';
import UserBirthdate from '@/features/user/components/UserBirthdate';
import UserDisplayUsername from '@/features/user/components/UserDisplayUsername';
import { User } from '@/features/user/schemas/user.schema';
import { ImageProps } from '@/libs/types';

const bannerImg: ImageProps = {
	src: 'https://i.pinimg.com/736x/fc/49/f1/fc49f199b54cb6393ad246d6bb7ed95b.jpg',
	alt: 'Benoit demande une description',
};

const profileImg: ImageProps = {
	src: 'https://upload.wikimedia.org/wikipedia/fr/c/ca/Batman_logo.png',
	alt: 'BATMAN',
};

const user: User = {
	id: '1',
	username: 'batman',
	displayName: 'Bruce Wayne',
	email: 'batman@gothamcity.com',
	birthdate: new Date('1980-01-01'),
	firstName: 'Bruce',
	lastName: 'Wayne',
	gender: 'MALE',
	role: 'USER',
	bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti adipisci veniam nobis quis, maiores quae asperiores deleniti iusto impedit, earum nesciunt, dolore ullam dolor reiciendis nisi sequi nihil fugit a.',
};

const Page = () => {
	return (
		<main>
			<header>
				<section className='border-b'>
					<Banner img={bannerImg} />
					<div className='relative -mt-16 px-4 pb-8'>
						<div className=''>
							<AvatarProfile className='size-30' img={profileImg} />
						</div>
						<article className='flex justify-between'>
							<UserDisplayUsername
								username={user.username}
								displayName={user.displayName}
							/>
							<div className='-mt-10 '>
								<div className='flex items-center gap-x-2'>
									<Button variant='outline'>Edit Profile</Button>
									<Button variant='secondary'>Edit Profile</Button>
									<Button variant='default'>Edit Profile</Button>
								</div>
							</div>
						</article>
						<article className='mt-4 space-y-2'>
							<UserBirthdate
								birthdate={user.birthdate}
								className='text-sm text-muted-foreground'
							/>
							{user.bio && (
								<p className='text-muted-foreground'>{user.bio}</p>
							)}
						</article>
					</div>
				</section>
				<section>
					<Spinner className='mx-auto mt-12 size-8' />
				</section>
			</header>
		</main>
	);
};

export default Page;
