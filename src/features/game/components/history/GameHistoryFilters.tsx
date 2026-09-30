'use client';

import { useQueryState } from 'nuqs';
import { useTranslations } from 'next-intl';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { GamesHistoryOrderBy } from '../../types/game';
import { AppMessages } from '@/modules/i18n/messages/types';
import { DeepKeys } from '@/libs/types';

const orderByOptions = [
	{ value: 'created-desc', labelKey: 'created_desc' },
	{ value: 'created-asc', labelKey: 'created_asc' },
	{ value: 'survival-desc', labelKey: 'survival_desc' },
	{ value: 'survival-asc', labelKey: 'survival_asc' },
	{ value: 'kills-desc', labelKey: 'kills_desc' },
	{ value: 'kills-asc', labelKey: 'kills_asc' },
] as const satisfies {
	value: GamesHistoryOrderBy;
	labelKey: DeepKeys<AppMessages['game']['sort']>;
}[];

const GameHistoryFilters = () => {
	const t = useTranslations('game.sort');
	const [orderBy, setOrderBy] = useQueryState('orderBy', {
		parse: (value) => value as GamesHistoryOrderBy,
		defaultValue: 'created-desc',
	});

	return (
		<Tooltip>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<TooltipTrigger asChild>
						<Button variant='secondary' size='icon' aria-label={t('label')}>
							<ArrowUpDown className='size-4' />
						</Button>
					</TooltipTrigger>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end' className='w-48'>
					<DropdownMenuRadioGroup
						value={orderBy}
						onValueChange={(val) => setOrderBy(val as GamesHistoryOrderBy)}>
						{orderByOptions.map((option) => (
							<DropdownMenuRadioItem
								key={option.value}
								value={option.value}>
								{t(option.labelKey)}
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<TooltipContent side='top'>
				<p>{t('label')}</p>
			</TooltipContent>
		</Tooltip>
	);
};

export default GameHistoryFilters;
