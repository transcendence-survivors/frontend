'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Flame, Timer, Swords, Gamepad2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeaderboardOrderBy } from '../../types/leaderboard';

const filterOptions = [
	{
		value: 'highest-kills-desc',
		labelKey: 'summary.highestKills',
		icon: Flame,
	},
	{
		value: 'highest-survival-desc',
		labelKey: 'summary.highestSurvivalTime',
		icon: Timer,
	},
	{
		value: 'total-kills-desc',
		labelKey: 'summary.totalKills',
		icon: Swords,
	},
	{
		value: 'total-games-desc',
		labelKey: 'summary.gamesPlayed',
		icon: Gamepad2,
	},
] as const satisfies {
	value: LeaderboardOrderBy;
	labelKey: string;
	icon: React.ComponentType<{ className?: string }>;
}[];

interface GameLeaderboardTabsProps {
	orderBy: LeaderboardOrderBy;
	setOrderBy: (value: LeaderboardOrderBy) => void;
}

export const GameLeaderboardTabs = ({
	orderBy,
	setOrderBy,
}: GameLeaderboardTabsProps) => {
	const t = useTranslations('game');

	return (
		<Tabs
			value={orderBy}
			onValueChange={(val) => setOrderBy(val as LeaderboardOrderBy)}
			className='w-full'>
			<TabsList className='grid grid-cols-2 sm:grid-cols-4 w-full p-1 bg-muted/40 rounded-xl border border-border h-auto! p-0 gap-1'>
				{filterOptions.map((option) => {
					const Icon = option.icon;
					return (
						<TabsTrigger
							key={option.value}
							value={option.value}
							className='cursor-pointer flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'>
							<Icon className='size-3.5 text-primary shrink-0' />
							<span className='truncate'>{t(option.labelKey)}</span>
						</TabsTrigger>
					);
				})}
			</TabsList>
		</Tabs>
	);
};

export default GameLeaderboardTabs;
