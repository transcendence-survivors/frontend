export default function SiteFooter() {
	return (
		<div
			className={
				'border-t border-border mt-10 ' +
				'px-4 py-6 max-w-5xl mx-auto ' +
				'flex justify-between items-center'
			}>
			<span className={'font-mono text-xs ' + 'text-muted-foreground'}>
				LANTERNAE © XLVII — VAMPIRE-SURVIVOR 3D
			</span>
			<span className={'font-mono text-xs ' + 'text-muted-foreground'}>
				BABYLON.JS
			</span>
		</div>
	);
}
