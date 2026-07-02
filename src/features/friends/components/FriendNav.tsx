'use client';

import { Button } from '@/components/ui/button';
import { ScrollContainer } from '@/components/ui/scroll-container';
import { useDragScroll } from '@/hooks/useDragScroll';
import { useFocusScroll } from '@/hooks/useFocusScroll';
import { cn } from '@/libs/utils';
import { I18nLink } from '@/modules/i18n/components/I18nLink';
import { AppMessages } from '@/modules/i18n/messages/types';
import { NavLink, usePathname } from '@/modules/i18n/utils/navigation';
import { getPath } from '@/modules/i18n/utils/routing';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

const links = [
	{
		key: 'friends',
		labelKey: 'friends',
	},
	{
		key: 'friendsRequests',
		labelKey: 'requests',
	},
	{
		key: 'blocked',
		labelKey: 'blocked',
	},
] as const satisfies NavLink<AppMessages['nav']['friend']>[];

type FriendNavProps = React.HTMLAttributes<HTMLElement>;

const FriendNav = ({ ...props }: FriendNavProps) => {
	const t = useTranslations('nav.friend');

	const {
		ref,
		isDragging,
		canScrollLeft,
		canScrollRight,
		onMouseDown,
		handleLinkClick,
		preventNativeDrag,
	} = useDragScroll({});
	const { onFocus } = useFocusScroll({ scrollContainerRef: ref });

	const pathname = usePathname();
	const activeLinkKey = useMemo(() => {
		const activeLink = links.find((link) => getPath(link.key) === pathname);
		return activeLink ? activeLink.key : 'friends';
	}, [pathname]);

	return (
		<ScrollContainer
			ref={ref}
			isDragging={isDragging}
			canScrollLeft={canScrollLeft}
			canScrollRight={canScrollRight}
			onMouseDown={onMouseDown}
			onDragStart={preventNativeDrag}
			{...props}>
			{links.map((link) => (
				<li key={link.key} className='flex-1' onFocus={onFocus}>
					<Button
						variant='tabs'
						size='lg'
						className={cn(
							'w-full px-10 py-6 ',
							isDragging ? 'cursor-grabbing' : 'cursor-pointer',
						)}
						data-active={activeLinkKey === link.key}
						asChild>
						<I18nLink
							href={link.key}
							draggable={false}
							onClick={handleLinkClick}
							onDragStart={preventNativeDrag}>
							{t(link.labelKey)}
						</I18nLink>
					</Button>
				</li>
			))}
		</ScrollContainer>
	);
};

export default FriendNav;
