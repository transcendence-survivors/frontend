import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Kicker from '@/components/ui/kicker';
import { SearchParamInput } from '@/components/ui/search-param-input';
import FriendAddDialog from '@/features/friends/components/FriendAddDialog';
import { UserPlus } from 'lucide-react';

const InputUrl = () => {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		console.log('Input value:', inputValue);
	};

	return (
		<div className='bg-background h-16 pt-4 pb-2'>
			<Input
				defaultValue={'ddwad'}
				placeholder='Search for friends...'
				className='w-full h-full'
			/>
		</div>
	);
};

export default function FriendsLayout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<div className='sm:sticky top-[var(--header-height)] z-30 bg-background h-46 flex flex-col'>
				<header className='px-10 py-8 flex-1 border-b border-border flex items-center justify-between  '>
					<div className='space-y-2'>
						<h1 className='text-3xl font-extrabold'>Friends & Moderation</h1>
						<Kicker className='text-xs'>Bearers in your circle</Kicker>
					</div>
					<FriendAddDialog />
				</header>
				<div className='px-10'>
					<div className='max-w-4xl mx-auto'>
						<div className='bg-background h-16 pt-4 pb-2'>
							<SearchParamInput
								paramKey='search'
								placeholder='Search for friends...'
								className='w-full h-full'
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='px-10 pb-8'>{children}</div>
		</main>
	);
}
