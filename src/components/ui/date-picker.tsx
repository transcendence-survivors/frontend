import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/libs/utils';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { getDateFormat, parseDateString, toDate } from '@/libs/date';
import useLocale from '@i18n/hooks/useLocale';

type DatePickerProps = {
	selectedDate: Date | undefined | null;
	setSelectedDate: (date: Date | undefined) => void;
	disabledBefore?: string | Date;
	disabledAfter?: string | Date;
	disabled?: boolean;
} & Omit<React.ComponentProps<typeof Button>, 'disabled'>;

interface PickerState {
	partialInput: string;
	month: Date;
	isOpen: boolean;
}

const FALLBACK_START = new Date('1900-01-01');

function DatePicker({
	selectedDate,
	setSelectedDate,
	disabledBefore,
	disabledAfter = new Date(),
	disabled = false,
	...props
}: DatePickerProps) {
	const { dateLocale } = useLocale();
	const [state, setState] = React.useState<PickerState>({
		partialInput: '',
		month: selectedDate ?? new Date(),
		isOpen: false,
	});

	const format = React.useMemo(() => getDateFormat(dateLocale), [dateLocale]);

	const disabledBeforeDate = React.useMemo(
		() => toDate(disabledBefore) ?? FALLBACK_START,
		[disabledBefore],
	);
	const disabledAfterDate = React.useMemo(
		() => toDate(disabledAfter) ?? new Date(),
		[disabledAfter],
	);

	const isDateDisabled = React.useCallback(
		(date: Date) => date < disabledBeforeDate || date > disabledAfterDate,
		[disabledBeforeDate, disabledAfterDate],
	);

	const displayValue = React.useMemo(() => {
		if (state.partialInput.length > 0) {
			return state.partialInput;
		}
		if (selectedDate) {
			return selectedDate.toLocaleDateString(format.intlLocale, {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			});
		}
		const placeholder = ['--', '--', '----'];
		const [dayIdx, monthIdx, yearIdx] = format.order;
		placeholder[dayIdx] = 'DD';
		placeholder[monthIdx] = 'MM';
		placeholder[yearIdx] = 'YYYY';

		return placeholder.join(format.separator);
	}, [state.partialInput, selectedDate, format]);

	const handleSelect = React.useCallback(
		(date: Date | undefined) => {
			if (!date) return;
			setSelectedDate(date);
			setState((prev) => ({
				...prev,
				partialInput: '',
				month: date,
				isOpen: false,
			}));
		},
		[setSelectedDate],
	);

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent) => {
			const base =
				state.partialInput ||
				(selectedDate
					? selectedDate.toLocaleDateString(format.intlLocale, {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric',
						})
					: '');

			const FULL_LENGTH = 10;
			if (e.key.match(/[0-9]/)) {
				e.preventDefault();
				let next = base + e.key;
				if (next.length === 2 || next.length === 5) next += format.separator;

				const date = parseDateString(next, format);

				if (next.length === FULL_LENGTH) {
					setSelectedDate(date);
					setState((prev) => ({ ...prev, partialInput: '', month: date }));
				} else {
					setState((prev) => ({ ...prev, partialInput: next, month: date }));
				}
				return;
			}

			if (e.key === 'Backspace' || e.key === 'Delete') {
				e.preventDefault();
				if (!base.length) return;

				const trimmed = base.endsWith(format.separator)
					? base.slice(0, -2)
					: base.slice(0, -1);
				setSelectedDate(undefined);
				setState((prev) => ({ ...prev, partialInput: trimmed }));
				return;
			}

			if (e.key === 'Enter') {
				const date = parseDateString(base, format);
				setSelectedDate(date);
				setState((prev) => ({
					...prev,
					partialInput: '',
					month: date,
					isOpen: false,
				}));
			}
		},
		[state.partialInput, selectedDate, setSelectedDate, format],
	);

	const toggleOpen = React.useCallback(
		() => setState((prev) => ({ ...prev, isOpen: !prev.isOpen })),
		[],
	);

	const handleOpenChange = React.useCallback(
		(open: boolean) => setState((prev) => ({ ...prev, isOpen: open })),
		[],
	);

	const handleMonthChange = React.useCallback(
		(month: Date) => setState((prev) => ({ ...prev, month })),
		[],
	);

	return (
		<Popover modal onOpenChange={handleOpenChange} open={state.isOpen}>
			<div className='relative w-full'>
				<PopoverTrigger asChild>
					<Button
						{...props}
						variant='outline'
						type='button'
						disabled={disabled}
						onClick={toggleOpen}
						className={cn(
							'w-full cursor-pointer pl-3 text-left font-normal justify-between',
							'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
							'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
							!selectedDate && 'text-muted-foreground',
							state.isOpen && 'ring-ring ring-2 ring-offset-2',
						)}>
						<span className='tabular-nums'>{displayValue}</span>
						<span className='flex items-center gap-1 ml-auto z-10'>
							<CalendarIcon className='w-4 h-4 opacity-50' />
						</span>
					</Button>
				</PopoverTrigger>
			</div>

			<PopoverContent
				className='w-auto p-0'
				align='start'
				onKeyDown={handleKeyDown}>
				<Calendar
					required
					mode='single'
					locale={dateLocale}
					selected={selectedDate ?? undefined}
					defaultMonth={state.month}
					month={state.month}
					onMonthChange={handleMonthChange}
					onSelect={handleSelect}
					captionLayout='dropdown'
					startMonth={disabledBeforeDate}
					endMonth={disabledAfterDate}
					disabled={isDateDisabled}
					fixedWeeks
					showOutsideDays
					autoFocus
				/>
			</PopoverContent>
		</Popover>
	);
}

export default DatePicker;
