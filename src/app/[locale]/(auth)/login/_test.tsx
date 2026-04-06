'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea,
} from '@/components/ui/input-group';
import ControlledField from '@/components/customs/Form/ControlledField';
import { useLogin } from '@/hooks/useLogin';
import { Spinner } from '@/components/ui/spinner';

const formSchema = z.object({
	title: z
		.string()
		.min(5, 'Bug title must be at least 5 characters.')
		.max(32, 'Bug title must be at most 32 characters.'),
	description: z
		.string()
		.min(20, 'Description must be at least 20 characters.')
		.max(100, 'Description must be at most 100 characters.'),
});

type FormSchema = z.infer<typeof formSchema>;

export function BugReportForm() {
	const { mutate, isPending, isError } = useLogin();

	const {
		handleSubmit,
		control,
		reset,
		formState: { isDirty },
	} = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
		},
	});

	const onSubmit = (data: FormSchema) => {
		mutate(data, {
			onSuccess: () => reset(),
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4' noValidate>
			<FieldGroup>
				<ControlledField name='title' control={control} label='Bug Title'>
					{({ field, fieldState }) => (
						<Input
							{...field}
							disabled={isPending                                                                                         }
							aria-invalid={fieldState.invalid}
							placeholder='Login button not working on mobile'
						/>
					)}
				</ControlledField>
				<ControlledField name='description' control={control} label='Description'>
					{({ field, fieldState }) => (
						<>
							<InputGroup>
								<InputGroupTextarea
									{...field}
									disabled={isPending || isError}
									placeholder="I'm having an issue with the login button on mobile."
									className='max-h-24 resize-none'
									aria-invalid={fieldState.invalid}
								/>
								<InputGroupAddon align='block-end'>
									<InputGroupText className='tabular-nums'>
										{field.value.length}/100 characters
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</>
					)}
				</ControlledField>
			</FieldGroup>
			<Field>
				<Button
					type='button'
					variant='outline'
					onClick={() => reset()}
					disabled={!isDirty || isPending}>
					Reset
				</Button>
				<Button type='submit' disabled={!isDirty || isPending}>
					{isPending ? <Spinner className='size-4' /> : 'Submit'}
				</Button>
				{isError && (
					<p className='text-sm text-destructive mt-2'>
						Failed to submit bug report.
					</p>
				)}
			</Field>
		</form>
	);
}
