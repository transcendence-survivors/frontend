'use client';

import { ScrollContainer } from '@ui/scroll-container';
import { useDragScroll } from '@/hooks/useDragScroll';
import { useFocusScroll } from '@/hooks/useFocusScroll';
import { Button } from '@/components/ui/button';
import { capitalize, cn } from '@/libs/utils';
import { I18nLink } from '@/modules/i18n/components/I18nLink';
import { NavLink, usePathname } from '@i18n/utils/navigation';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { AppMessages } from '@/modules/i18n/messages/types';
import { resolveRouteKeyPath } from '@/modules/i18n/utils/resolve';

const getHrefParams = (username: string) => ({ username: `@${username}` });

const profileLinks = [
	{ key: 'userName', labelKey: 'stats', getHrefParams },
	{ key: 'userNameComments', labelKey: 'comments', getHrefParams },
	{ key: 'userNamePosts', labelKey: 'posts', getHrefParams },
	{ key: 'userNameLikes', labelKey: 'likes', getHrefParams },
	{ key: 'userNameFavourites', labelKey: 'favourites', getHrefParams },
] as const satisfies NavLink<AppMessages['nav']['user'], string>[];

interface ProfileNavProps extends React.HTMLAttributes<HTMLElement> {
	username: string;
}

const ProfileNav = ({ username, ...props }: ProfileNavProps) => {
	const t = useTranslations('nav.user');
	const path = usePathname();
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

	const activeLinkKey = useMemo(() => {
		const activeLink = profileLinks.find((link) => {
			const resolvedPath = resolveRouteKeyPath(path);
			return resolvedPath === link.key;
		});
		return activeLink ? activeLink.key : 'profile';
	}, [path]);

	return (
		<ScrollContainer
			ref={ref}
			isDragging={isDragging}
			canScrollLeft={canScrollLeft}
			canScrollRight={canScrollRight}
			onMouseDown={onMouseDown}
			onDragStart={preventNativeDrag}
			{...props}>
			{profileLinks.map((link) => (
				<li key={link.key} className='flex-1' onFocus={onFocus}>
					<Button
						variant={'tabs'}
						size={'lg'}
						className={cn(
							'w-full px-14 py-6 ',
							isDragging ? 'cursor-grabbing' : 'cursor-pointer',
						)}
						data-active={link.key === activeLinkKey}
						asChild>
						<I18nLink
							href={link.key}
							draggable={false}
							onClick={handleLinkClick}
							onDragStart={preventNativeDrag}
							hrefParams={link.getHrefParams(username)}>
							{capitalize(t(link.labelKey))}
						</I18nLink>
					</Button>
				</li>
			))}
		</ScrollContainer>
	);
};

export default ProfileNav;
