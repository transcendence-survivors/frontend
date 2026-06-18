export const urlDecode = (url: string): string => {
	try {
		return decodeURIComponent(url);
	} catch (e) {
		console.error('Error decoding URL:', e);
		return url;
	}
};

export const urlEncode = (url: string): string => {
	try {
		return encodeURIComponent(url);
	} catch (e) {
		console.error('Error encoding URL:', e);
		return url;
	}
};
