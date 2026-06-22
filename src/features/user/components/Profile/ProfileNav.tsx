'use client';

import { ScrollContainer } from '@ui/scroll-container';
import { useDragScroll } from '@/hooks/useDragScroll';
import { useFocusScroll } from '@/hooks/useFocusScroll';
import { Button } from '@/components/ui/button';
import { capitalize, cn } from '@/libs/utils';
import { I18nLink } from '@/modules/i18n/components/I18nLink';
import { createNavLinks, usePathname } from '@i18n/utils/navigation';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { getPath } from '@/modules/i18n/utils/routing';

const profileNavLinks = createNavLinks([
	{ key: 'profile', labelKey: 'profile_stats' },
	{ key: 'profileComments', labelKey: 'profile_comments' },
	{ key: 'profilePosts', labelKey: 'profile_posts' },
	{ key: 'profileLikes', labelKey: 'profile_likes' },
	{ key: 'profileFavourites', labelKey: 'profile_favourites' },
]);

export type ProfileNavKey = (typeof profileNavLinks)[number]['key'];

interface ProfileNavProps extends React.HTMLAttributes<HTMLElement> {}

const ProfileNav = ({ className, ...props }: ProfileNavProps) => {
	const t = useTranslations('nav');
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
		const activeLink = profileNavLinks.find((link) => getPath(link.key) === path);
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
			className={className}
			{...props}>
			{profileNavLinks.map((link) => (
				<li key={link.key} className='flex-1' onFocus={onFocus}>
					<Button
						variant={link.key === activeLinkKey ? 'sidebar' : 'ghost'}
						size={'lg'}
						className={cn(
							'w-full px-14 py-6 rounded-none border-y-0 border-x-muted select-none',
							isDragging ? 'cursor-grabbing' : 'cursor-pointer',
						)}
						data-active={link.key === activeLinkKey}
						asChild>
						<I18nLink
							href={link.key}
							draggable={false}
							onClick={handleLinkClick}
							onDragStart={preventNativeDrag}>
							{capitalize(t(link.labelKey))}
						</I18nLink>
					</Button>
				</li>
			))}
		</ScrollContainer>
	);
};

export default ProfileNav;
