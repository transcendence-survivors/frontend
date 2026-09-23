export default function SiteFooter() {
	return (
		<div
			className={
				'border-t border-border mt-10 ' +
				'px-4 py-6 max-w-5xl mx-auto ' +
				'flex flex-col sm:flex-row gap-2 justify-between items-center text-center'
			}>
			<span className={'font-mono text-xs ' + 'text-muted-foreground'}>
				LIGHT-KEEPERS © XLVII — VAMPIRE-SURVIVOR 3D
			</span>
			<span className={'font-mono text-xs ' + 'text-muted-foreground'}>
				BABYLON.JS
			</span>
		</div>
	);
}
