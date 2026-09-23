import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
	const t = useTranslations('landing.hero');

	return (
		<>
			<div className='text-center'>
				<p className='text-xs sm:text-sm tracking-[0.3em] text-primary mb-6 uppercase font-mono'>
					{t('kicker')}
				</p>
				<h1 className='heading-1 mb-6 text-foreground uppercase'>
					Light-Keepers
				</h1>
				<p className='text-muted-foreground max-w-xl mx-auto mb-10'>
					{t('description')}
				</p>
				<div className='flex flex-col sm:flex-row gap-4 justify-center'>
					<Button size='lg' className='w-full sm:w-auto'>
						{t('play')}
					</Button>
					<Button size='lg' variant='outline' className='w-full sm:w-auto'>
						{t('trailer')}
					</Button>
				</div>
			</div>
			<div className='video-container mb-20 sm:mb-40 mt-12 sm:mt-16'>
				<video
					autoPlay
					loop
					muted
					playsInline
					controls
					className='w-full h-auto rounded-2xl border border-border'>
					<source src='/Trailer_Zelda.mp4' type='video/mp4' />
					{t('video_fallback')}
				</video>
			</div>
		</>
	);
}
