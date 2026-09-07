import { Button } from '@/components/ui/button';

export default function HeroSection() {
	return (
		<>
			<div className='text-center'>
				<p className='text-sm tracking-[0.3em] text-primary mb-6 uppercase font-mono'>
					Suis la lumière · ou sois oublié
				</p>
				<h1 className='heading-1 mb-6 text-foreground uppercase'>
					Lanternae
				</h1>
				<p className='text-muted-foreground max-w-xl mx-auto mb-10'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
					enim ad minim veniam, quis nostrud exercitation ullamco.
				</p>
				<div className='flex gap-4 justify-center'>
					<Button size='lg'>Jouer maintenant</Button>
					<Button size='lg' variant='outline'>
						Voir la bande-annonce
					</Button>
				</div>
			</div>
			<div className='video-container mb-40 mt-16'>
				<video
					autoPlay
					loop
					muted
					playsInline
					controls
					className='w-full h-auto rounded-2xl border border-border'>
					<source src='/Trailer_Zelda.mp4' type='video/mp4' />
					Votre navigateur ne supporte pas la lecture de cette vidéo.
				</video>
			</div>
		</>
	);
}
