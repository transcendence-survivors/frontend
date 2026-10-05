interface LegalHeaderProps {
	kicker: string;
	title: string;
	updated: string;
}

export default function LegalHeader({ kicker, title, updated }: LegalHeaderProps) {
	return (
		<div className='text-center mb-16'>
			<p className='text-sm tracking-[0.3em] text-primary mb-6 uppercase font-mono'>
				{kicker}
			</p>
			<h1 className='heading-1 text-foreground mb-6'>{title}</h1>
			<p className='font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase'>
				{updated}
			</p>
		</div>
	);
}
