'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/libs/utils';

export interface ActionConfirmDialogProps {
	title: ReactNode;
	description: ReactNode;
	confirmText?: ReactNode;
	isDestructive?: boolean;
	isPending?: boolean;
	trigger: ReactNode;
	children?: ReactNode;
	childrenBoxClassName?: string;
	onConfirm: () => void;
}

export const ActionConfirmDialog = ({
	title,
	description,
	confirmText,
	isDestructive = false,
	isPending = false,
	trigger,
	children,
	childrenBoxClassName,
	onConfirm,
}: ActionConfirmDialogProps) => {
	const t = useTranslations('common');

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
			<AlertDialogContent className='p-0 bg-card gap-0'>
				<AlertDialogHeader className='p-4 space-y-2'>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>

					{children && (
						<div
							className={cn(
								'max-h-[65vh] overflow-y-auto rounded-lg border border-border/50 bg-background w-full',
								childrenBoxClassName,
							)}>
							{children}
						</div>
					)}
				</AlertDialogHeader>

				<AlertDialogFooter className='px-4 py-3 border-t border-border bg-muted flex flex-row items-center justify-end gap-4'>
					<AlertDialogCancel
						variant='outline'
						className='flex-1'
						disabled={isPending}>
						{t('cancel')}
					</AlertDialogCancel>
					<AlertDialogAction
						variant={isDestructive ? 'destructive' : 'default'}
						className='flex-1'
						disabled={isPending}
						onClick={onConfirm}>
						{confirmText ?? t('confirm')}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
