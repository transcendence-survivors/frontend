import { useMemo, useEffect, useRef, useCallback } from 'react';
import { FieldPath, FieldValues, PathValue, UseFormSetValue } from 'react-hook-form';
import { MediaPreviewItem } from '@/components/ui/media-attachment-previews';

export interface UseFileAttachmentsOptions<
	TFieldValues extends FieldValues = FieldValues,
	TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
	attachments?: File[] | File | null;
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

	const filesArray = useMemo(() => {
		if (!attachments) return [];
		return Array.isArray(attachments) ? attachments : [attachments];
	}, [attachments]);

	const isSingleFileMode = useMemo(() => {
		return !Array.isArray(attachments) && maxFiles === 1;
	}, [attachments, maxFiles]);

	const previews: MediaPreviewItem[] = useMemo(() => {
		return filesArray.map((file) => ({
			file,
			url: URL.createObjectURL(file),
			type: file.type.startsWith('video/') ? 'video' : 'image',
		}));
	}, [filesArray]);

	useEffect(() => {
		return () => {
			previews.forEach((preview) => URL.revokeObjectURL(preview.url));
		};
	}, [previews]);

	const handleFileChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const selectedFiles = Array.from(e.target.files || []);
			if (selectedFiles.length === 0) return;

			let nextValue: unknown;

			if (isSingleFileMode || maxFiles === 1) {
				nextValue = selectedFiles[0];
			} else {
				nextValue =
					appendMode === 'append'
						? [...filesArray, ...selectedFiles].slice(0, maxFiles)
						: selectedFiles.slice(0, maxFiles);
			}

			setValue(fieldName, nextValue as PathValue<TFieldValues, TFieldName>, {
				shouldValidate: true,
				shouldDirty: true,
				shouldTouch: true,
			});

			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		},
		[filesArray, appendMode, fieldName, isSingleFileMode, maxFiles, setValue],
	);

	const handleRemoveAttachment = useCallback(
		(indexToRemove: number = 0) => {
			let nextValue: unknown;

			if (isSingleFileMode || maxFiles === 1) {
				nextValue = undefined;
			} else {
				nextValue = filesArray.filter((_, index) => index !== indexToRemove);
			}

			setValue(fieldName, nextValue as PathValue<TFieldValues, TFieldName>, {
				shouldValidate: true,
				shouldDirty: true,
				shouldTouch: true,
			});
		},
		[filesArray, fieldName, isSingleFileMode, maxFiles, setValue],
	);

	const handleClearAttachments = useCallback(() => {
		const nextValue = isSingleFileMode || maxFiles === 1 ? undefined : [];

		setValue(fieldName, nextValue as unknown as PathValue<TFieldValues, TFieldName>, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}, [fieldName, isSingleFileMode, maxFiles, setValue]);

	return {
		fileInputRef,
		previews,
		file: filesArray[0] as File | undefined,
		handleFileChange,
		handleRemoveAttachment,
		handleClearAttachments,
	};
};
