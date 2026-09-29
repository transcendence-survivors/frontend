'use client';

import * as React from 'react';
import DisplayDate from '@/components/ui/date';
import I18nLink from '@/modules/i18n/components/I18nLink';

export interface PostAuthorHeaderProps {
	author: {
		username: string;
		displayName: string;
	};
	createdAt: Date | string;
	className?: string;
}

export function PostAuthorHeader({
	author,
	createdAt,
	className,
}: PostAuthorHeaderProps) {
	const authorHref = { username: `@${author.username}` };

	return (
		<div className={`flex min-w-0 items-center gap-1 text-sm ${className ?? ''}`}>
			<I18nLink
				href='userName'
				hrefParams={authorHref}
				className='group relative z-10 flex min-w-0 items-center gap-1'>
				<span className='truncate font-semibold group-hover:underline'>
					{author.displayName}
				</span>
				<span className='truncate text-muted-foreground'>@{author.username}</span>
			</I18nLink>
			<span className='text-muted-foreground'>·</span>
			<DisplayDate
				date={new Date(createdAt)}
				className='shrink-0 text-muted-foreground'
			/>
		</div>
	);
}
