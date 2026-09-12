interface StoryBlockProps {
	number: string;
	label: string;
	title: string;
	body: string;
	reverse?: boolean;
}

export default function StoryBlock({
	number,
	label,
	title,
	body,
	reverse,
}: StoryBlockProps) {
	return (
		<div className='grid md:grid-cols-2 border-b border-border last:border-b-0'>
			<div
				className={
					reverse
						? 'md:order-2 p-12 flex flex-col justify-center'
						: 'p-12 flex flex-col justify-center'
				}>
				<p className='font-mono text-xs tracking-[0.2em] text-muted-foreground mb-4'>
					{number} — {label}
				</p>
				<h3 className='text-2xl font-bold text-foreground mb-4'>{title}</h3>
				<p className='text-muted-foreground leading-relaxed'>{body}</p>
			</div>
			<div
				className={
					reverse
						? 'md:order-1 min-h-[280px] bg-gradient-to-br from-amber-500/20 via-background to-background'
						: 'min-h-[280px] bg-gradient-to-br from-amber-500/20 via-background to-background'
				}
			/>
		</div>
	);
}
