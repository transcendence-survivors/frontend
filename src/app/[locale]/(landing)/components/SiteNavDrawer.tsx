'use client';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import LogoLink from '@/components/ui/logo-link';
import I18nLink from '@/modules/i18n/components/I18nLink';
import { KeyNavItem, navItems } from './navItems';

interface SiteNavDrawerProps {
	active: KeyNavItem;
}

export default function SiteNavDrawer({ active }: SiteNavDrawerProps) {
	const t = useTranslations('nav');

	return (
		<Drawer direction='right'>
			<DrawerTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					className='md:hidden'
					aria-label={t('menu')}>
					<Menu />
				</Button>
			</DrawerTrigger>
			<DrawerContent className='max-w-[250px]'>
				<DrawerHeader>
					<DrawerTitle className='text-lg font-semibold'>
						<LogoLink page='home' />
					</DrawerTitle>
				</DrawerHeader>
				<nav className='flex flex-col gap-1 px-4 pb-8'>
					{navItems.map(({ key, labelKey }) => (
						<DrawerClose key={key} asChild>
							<I18nLink
								href={key}
								className={
									key === active
										? 'rounded-sm px-3 py-3 text-primary font-medium'
										: 'rounded-sm px-3 py-3 text-muted-foreground hover:bg-muted hover:text-foreground'
								}>
								{t(labelKey)}
							</I18nLink>
						</DrawerClose>
					))}
				</nav>
			</DrawerContent>
		</Drawer>
	);
}
