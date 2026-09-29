'use client';

import { useState } from 'react';
import { Download, FileJson, FileSpreadsheet, FileText, Code } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useUserSettings } from '@/features/user/hooks/useUserSettings';
import { downloadFormattedFile, ExportFormat } from '@/libs/export';

export const ExportUserDataCard = () => {
	const t = useTranslations('settings.danger_zone.export');
	const { data: userSettings, isLoading } = useUserSettings();
	const [format, setFormat] = useState<ExportFormat>('json');

	const handleExport = () => {
		if (!userSettings) return;
		const filename = `user-settings-${userSettings.username || userSettings.id}`;
		downloadFormattedFile(userSettings, filename, format);
	};

	return (
		<Card className='border-border/60 bg-card'>
			<CardHeader>
				<CardTitle className='text-base font-semibold'>{t('title')}</CardTitle>
				<CardDescription>{t('description')}</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col sm:flex-row sm:items-center gap-2'>
				<Select
					value={format}
					onValueChange={(val) => setFormat(val as ExportFormat)}>
					<SelectTrigger className='w-full sm:w-36'>
						<SelectValue placeholder={t('format_placeholder')} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='json'>
							<div className='flex items-center gap-2'>
								<FileJson className='h-4 w-4 text-blue-500' />
								<span>JSON</span>
							</div>
						</SelectItem>
						<SelectItem value='csv'>
							<div className='flex items-center gap-2'>
								<FileSpreadsheet className='h-4 w-4 text-emerald-500' />
								<span>CSV</span>
							</div>
						</SelectItem>
						<SelectItem value='txt'>
							<div className='flex items-center gap-2'>
								<FileText className='h-4 w-4 text-muted-foreground' />
								<span>Text (.txt)</span>
							</div>
						</SelectItem>
						<SelectItem value='xml'>
							<div className='flex items-center gap-2'>
								<Code className='h-4 w-4 text-orange-500' />
								<span>XML</span>
							</div>
						</SelectItem>
					</SelectContent>
				</Select>

				<Button
					variant='outline'
					onClick={handleExport}
					disabled={isLoading || !userSettings}
					className='gap-2'>
					<Download className='h-4 w-4' />
					{t('button')}
				</Button>
			</CardContent>
		</Card>
	);
};
