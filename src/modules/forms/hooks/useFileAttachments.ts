import { useMemo, useEffect, useRef, useCallback } from 'react';
import { FieldPath, FieldValues, PathValue, UseFormSetValue } from 'react-hook-form';
import { MediaPreviewItem } from '@/components/ui/media-attachment-previews';

export interface UseFileAttachmentsOptions<
	TFieldValues extends FieldValues = FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
	attachments: File[];
	setValue: UseFormSetValue<TFieldValues>;
	fieldName?: TFieldName;
	maxFiles?: number;
	appendMode?: 'append' | 'replace';
}

export const useFileAttachments = <
	TFieldValues extends FieldValues = FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	attachments,
	setValue,
	fieldName = 'attachments' as TFieldName,
	maxFiles = 5,
	appendMode = 'append',
}: UseFileAttachmentsOptions<TFieldValues, TFieldName>) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const previews: MediaPreviewItem[] = useMemo(() => {
		return (attachments || []).map((file) => ({
			file,
			url: URL.createObjectURL(file),
			type: file.type.startsWith('video/') ? 'video' : 'image',
		}));
	}, [attachments]);

	useEffect(() => {
		return () => {
			previews.forEach((preview) => URL.revokeObjectURL(preview.url));
		};
	}, [previews]);

	const handleFileChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const selectedFiles = Array.from(e.target.files || []);
			if (selectedFiles.length === 0) return;

			const nextFiles =
				appendMode === 'append'
					? [...(attachments || []), ...selectedFiles].slice(0, maxFiles)
					: selectedFiles.slice(0, maxFiles);

			setValue(fieldName, nextFiles as PathValue<TFieldValues, TFieldName>, {
				shouldValidate: true,
				shouldDirty: true,
				shouldTouch: true,
			});

			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		},
		[attachments, appendMode, fieldName, maxFiles, setValue],
	);

	const handleRemoveAttachment = useCallback(
		(indexToRemove: number) => {
			const updatedFiles = (attachments || []).filter(
				(_, index) => index !== indexToRemove,
			);

			setValue(fieldName, updatedFiles as PathValue<TFieldValues, TFieldName>, {
				shouldValidate: true,
				shouldDirty: true,
				shouldTouch: true,
			});
		},
		[attachments, fieldName, setValue],
	);

	const handleClearAttachments = useCallback(() => {
		setValue(fieldName, [] as unknown as PathValue<TFieldValues, TFieldName>, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}, [fieldName, setValue]);

	return {
		fileInputRef,
		previews,
		handleFileChange,
		handleRemoveAttachment,
		handleClearAttachments,
	};
};
