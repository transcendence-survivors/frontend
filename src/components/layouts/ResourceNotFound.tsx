'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
	ArrowLeft,
	Compass,
	FileX2,
	Gamepad2,
	Home,
	MessageSquareOff,
	UserX,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ResourceNotFoundProps {
	namespace: 'user' | 'chat' | 'post' | 'main' | 'game';
	backUrl?: string;
}

const icons = {
	user: <UserX className='size-4' />,
	chat: <MessageSquareOff className='size-4' />,
	post: <FileX2 className='size-4' />,
	game: <Gamepad2 className='size-4' />,
	main: <Compass className='size-4' />,
} as const satisfies Record<ResourceNotFoundProps['namespace'], React.ReactNode>;

export const ResourceNotFound = ({ namespace, backUrl }: ResourceNotFoundProps) => {
	const t = useTranslations(`common.not_found.${namespace}`);
	const tCommon = useTranslations('common.not_found.common');
	const router = useRouter();

	return (
		<div className='h-main w-full flex items-center justify-center p-6 bg-background relative overflow-hidden rounded-xl border border-border/40'>
			<div className='absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none' />
			<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none' />

			<div className='max-w-md w-full text-center space-y-6 relative z-10'>
				<div className='space-y-3'>
					<div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider'>
						{icons[namespace]}
						{t('badge')}
					</div>

					<h2 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground'>
						{t('title')}
					</h2>

					<p className='text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto'>
						{t('description')}
					</p>
				</div>

				<div className='flex flex-col sm:flex-row items-center justify-center gap-3 pt-2'>
					<Button
						variant='outline'
						onClick={() => (backUrl ? router.push(backUrl) : router.back())}>
						<ArrowLeft className='size-4' />
						{tCommon('go_back')}
					</Button>

					<Button asChild>
						<Link href='/'>
							<Home className='size-4' />
							{tCommon('back_home')}
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};
