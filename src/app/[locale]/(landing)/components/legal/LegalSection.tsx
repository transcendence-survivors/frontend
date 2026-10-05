interface LegalSectionProps {
	number: string;
	title: string;
	children: React.ReactNode;
}

export default function LegalSection({ number, title, children }: LegalSectionProps) {
	return (
		<section className='grid md:grid-cols-[120px_1fr] gap-4 p-8 sm:p-12 border-b border-border last:border-b-0'>
			<p className='font-mono text-xs tracking-[0.2em] text-muted-foreground pt-2'>
				{number}
			</p>
			<div>
				<h2 className='text-2xl font-bold text-foreground mb-4'>{title}</h2>
				<div className='text-muted-foreground leading-relaxed'>{children}</div>
			</div>
		</section>
	);
}
