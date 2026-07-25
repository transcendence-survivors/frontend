'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/modules/i18n/utils/navigation';
import { useTranslations } from 'next-intl';

export default function PostDetailHeader() {
	const t = useTranslations('posts.detail');
	const router = useRouter();

	return (
		<div className='max-w-xl mx-auto flex items-center gap-4 p-4'>
			<Button variant='ghost' onClick={() => router.back()}>
				<ArrowLeft />
				{t('back')}
			</Button>
		</div>
	);
}
