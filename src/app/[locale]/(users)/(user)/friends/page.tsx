import { Button } from '@/components/ui/button';
import Kicker from '@/components/ui/kicker';
import UserIdentity from '@/features/user/components/Identity/UserIdentity';
import { Ban, UserRoundX } from 'lucide-react';

const friends = [
	{
		id: 1,
		avatarUrl: 'https://example.com/avatar1.jpg',
		displayName: 'John Doe',
		username: 'johndoe',
		online: true,
	},
	{
		id: 2,
		avatarUrl: 'https://example.com/avatar2.jpg',
		displayName: 'Jane Smith',
		username: 'janesmith',
		online: false,
	},
];

const blockedUsers = [
	{
		id: 1,
		avatarUrl: 'https://example.com/avatar3.jpg',
		displayName: 'Blocked User 1',
		username: 'blockeduser1',
	},
	{
		id: 2,
		avatarUrl: 'https://example.com/avatar4.jpg',
		displayName: 'Blocked User 2',
		username: 'blockeduser2',
	},
];

export default function Page() {
	return (
		<main className='min-h-screen flex flex-col'>
			<div className='px-8 py-6 border-b border-border'>
				<h1 className='text-2xl font-bold'>Friends & Moderation</h1>
				<Kicker>WHO WALKS WITH YOU IN THE DARK</Kicker>
			</div>
			<section className='flex flex-col flex-1'>
				<div className='grid lg:grid-cols-[3fr_2fr] gap-x-4 lg:flex-1'>
					<div className='px-8 py-6 h-auto space-y-4'>
						<div className='flex justify-between'>
							<Kicker className='text-primary  tracking-[0.2rem]  '>
								<h2>Friends</h2>
							</Kicker>
							<Kicker>Bearers</Kicker>
						</div>
						<div>
							<ul>
								{friends.map((friend) => (
									<li key={friend.id}>
										<article className='border px-4 py-4 flex items-center gap-4 justify-between'>
											<div className='flex items-start gap-5'>
												<UserIdentity
													avatar={{
														img: {
															src: friend.avatarUrl,
															alt: friend.displayName,
														},
														size: 'md',
														badge: friend.online
															? 'online'
															: 'offline',
													}}
													user={{
														displayName: friend.displayName,
														username: friend.username,
													}}
												/>
											</div>
											<div>
												<Button variant='outline' size='icon-sm'>
													<UserRoundX />
												</Button>
											</div>
										</article>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className='px-8 py-6 lg:border-l border-border space-y-4'>
						<div className='flex justify-between'>
							<Kicker className=' tracking-[0.2rem]  '>
								<h2>BLOCKED</h2>
							</Kicker>
							<Kicker>TEST</Kicker>
						</div>
						<div>
							<ul>
								{blockedUsers.map((user) => (
									<li key={user.id}>
										<article className='border px-4 py-4 flex items-center gap-4 justify-between'>
											<div>
												<UserIdentity
													avatar={{
														img: {
															src: user.avatarUrl,
															alt: user.displayName,
														},
														size: 'md',
													}}
													user={{
														displayName: user.displayName,
														username: user.username,
													}}
												/>
											</div>
											<div>
												<Button variant='outline' size='icon-sm'>
													<Ban />
												</Button>
											</div>
										</article>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
