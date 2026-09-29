export type ExportFormat = 'json' | 'csv' | 'txt' | 'xml';

export const downloadFormattedFile = (
	data: Record<string, unknown>,
	filename: string,
	format: ExportFormat,
) => {
	let content = '';
	let mimeType = '';
	const fileExtension = format;

	switch (format) {
		case 'json':
			content = JSON.stringify(data, null, 2);
			mimeType = 'application/json';
			break;

		case 'csv': {
			const headers = Object.keys(data).join(',');
			const values = Object.values(data)
				.map((val) => `"${String(val ?? '').replace(/"/g, '""')}"`)
				.join(',');
			content = `${headers}\n${values}`;
			mimeType = 'text/csv';
			break;
		}

		case 'txt':
			content = Object.entries(data)
				.map(([key, val]) => `${key}: ${val ?? 'N/A'}`)
				.join('\n');
			mimeType = 'text/plain';
			break;

		case 'xml': {
			const xmlNodes = Object.entries(data)
				.map(([key, val]) => `  <${key}>${val ?? ''}</${key}>`)
				.join('\n');
			content = `<?xml version="1.0" encoding="UTF-8"?>\n<user>\n${xmlNodes}\n</user>`;
			mimeType = 'application/xml';
			break;
		}
	}

	const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = `${filename}.${fileExtension}`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};
