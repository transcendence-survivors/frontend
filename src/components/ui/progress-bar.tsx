'use client';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/libs/utils';

interface ProgressBarProps {
	progress: number;
	showLabel?: boolean;
	className?: string;
}

export const ProgressBar = ({
	progress,
	showLabel = false,
	className,
}: ProgressBarProps) => (
	<div className={cn('w-full space-y-1', className)}>
		{showLabel && (
			<p className='text-xs tabular-nums text-muted-foreground text-right'>
				{progress}%
			</p>
		)}
		<Progress value={progress} className='h-1' />
	</div>
);
