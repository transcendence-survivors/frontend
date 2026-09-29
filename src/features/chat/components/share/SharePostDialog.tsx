'use client';

import * as React from 'react';
import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Send, Loader2, Search, X } from 'lucide-react';

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { ShareRoomList } from './ShareRoomList';
import { useSharePost } from '../../hooks/useSharePost';
import { Post } from '@/features/posts/types/post';

interface SharePostFormState {
	search: string;
	selectedRoomIds: string[];
	comment: string;
}

const initialFormState: SharePostFormState = {
	search: '',
	selectedRoomIds: [],
	comment: '',
};

interface SharePostDialogProps {
	children: React.ReactNode;
	post: Post;
}

export function SharePostDialog({ children, post }: SharePostDialogProps) {
	const t = useTranslations('chat.share');
	const [open, setOpen] = useState(false);
	const [formState, setFormState] = useState<SharePostFormState>(initialFormState);

	const { mutateAsync: sharePost, isPending } = useSharePost(post.id);

	const params = useMemo(
		() => ({ search: formState.search.trim() }),
		[formState.search],
	);

	const handleOpenChange = (newOpen: boolean) => {
		if (!newOpen) {
			setFormState(initialFormState);
		}
		setOpen(newOpen);
	};

	const toggleRoom = useCallback((roomId: string) => {
		setFormState((prev) => ({
			...prev,
			selectedRoomIds: prev.selectedRoomIds.includes(roomId)
				? prev.selectedRoomIds.filter((id) => id !== roomId)
				: [...prev.selectedRoomIds, roomId],
		}));
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (formState.selectedRoomIds.length === 0 || isPending) return;

		try {
			console.log(
				'Sharing post with rooms:',
				formState.selectedRoomIds,
				'and comment:',
				formState.comment,
			);
			await sharePost({
				roomIds: formState.selectedRoomIds,
				comment: formState.comment.trim() || undefined,
			});
			handleOpenChange(false);
		} catch {}
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent className='sm:max-w-[500px] p-0 overflow-hidden gap-0'>
				<DialogHeader className='p-5 pb-3'>
					<DialogTitle className='text-lg font-bold flex items-center gap-2'>
						<Send className='size-4 text-primary' />
						{t('title')}
					</DialogTitle>
					<DialogDescription className='text-xs'>
						{t('description')}
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className='space-y-3'>
					<div className='px-5 space-y-3'>
						<Textarea
							placeholder={t('comment_placeholder')}
							value={formState.comment}
							onChange={(e) =>
								setFormState((prev) => ({
									...prev,
									comment: e.target.value,
								}))
							}
							maxLength={2000}
							className='resize-none min-h-[60px] text-xs focus-visible:ring-1'
						/>

						<div className='relative'>
							<Search className='absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground' />
							<Input
								placeholder={t('search_placeholder')}
								value={formState.search}
								onChange={(e) =>
									setFormState((prev) => ({
										...prev,
										search: e.target.value,
									}))
								}
								className='pl-8 h-9 text-xs'
							/>
						</div>

						{formState.selectedRoomIds.length > 0 && (
							<div className='flex flex-wrap gap-1 max-h-16 overflow-y-auto pr-1'>
								{formState.selectedRoomIds.map((id) => (
									<button
										key={id}
										type='button'
										onClick={() => toggleRoom(id)}
										className='inline-flex items-center gap-1 rounded-md bg-secondary text-secondary-foreground px-2 py-0.5 text-[11px] font-medium hover:bg-secondary/80 transition-colors'>
										<span>
											{t('room_badge_fallback', {
												id: id.slice(0, 4),
											})}
										</span>
										<X className='size-3 stroke-[2.5]' />
									</button>
								))}
							</div>
						)}
						<ShareRoomList
							params={params}
							selectedRoomIds={formState.selectedRoomIds}
							onToggleRoom={toggleRoom}
						/>
					</div>

					<DialogFooter className='p-3 bg-muted/20 border-t flex items-center justify-between gap-2'>
						<span className='text-[11px] text-muted-foreground px-2'>
							{t('selected_count', {
								count: formState.selectedRoomIds.length,
							})}
						</span>

						<div className='flex items-center gap-2'>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => handleOpenChange(false)}
								disabled={isPending}
								className='h-8 text-xs'>
								{t('cancel')}
							</Button>
							<Button
								type='submit'
								size='sm'
								disabled={
									formState.selectedRoomIds.length === 0 || isPending
								}
								className='h-8 text-xs gap-1.5'>
								{isPending ? (
									<Loader2 className='size-3.5 animate-spin' />
								) : (
									<Send className='size-3.5' />
								)}
								{t('submit')}
							</Button>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
