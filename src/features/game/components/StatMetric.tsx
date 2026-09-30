import React from 'react';
import { cn } from '@/libs/utils';
import Kicker from '@/components/ui/kicker';

interface StatMetricCardProps {
	label: string;
	value: React.ReactNode;
	variant?: 'primary' | 'destructive' | 'chart-2' | 'chart-3' | 'default';
	className?: string;
	size?: 'xs' | 'base';
}

const variantStyles: Record<NonNullable<StatMetricCardProps['variant']>, string> = {
	'default': 'text-foreground',
	'primary': 'text-primary',
	'destructive': 'text-destructive',
	'chart-2': 'text-chart-2',
	'chart-3': 'text-chart-3',
};

const strongSizeStyles: Record<NonNullable<StatMetricCardProps['size']>, string> = {
	xs: 'text-base md:text-lg',
	base: 'text-2xl md:text-3xl',
};
const kickerSizeStyles: Record<NonNullable<StatMetricCardProps['size']>, string> = {
	xs: 'text-[10px]',
	base: 'text-xs',
};

export const StatMetric = ({
	label,
	value,
	variant = 'default',
	size = 'base',
	className,
}: StatMetricCardProps) => {
	return (
		<div
			className={cn(
				'flex-1 text-center flex flex-col justify-center px-4 space-y-1',
				className,
			)}>
			<Kicker
				className={cn(
					'font-semibold uppercase tracking-wider',
					kickerSizeStyles[size],
				)}>
				{label}
			</Kicker>
			<strong
				className={cn(
					'block font-black tracking-tight',
					strongSizeStyles[size],
					variantStyles[variant],
				)}>
				{value}
			</strong>
		</div>
	);
};
