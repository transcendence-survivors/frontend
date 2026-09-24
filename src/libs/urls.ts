export const urlDecode = (url: string): string => {
	try {
		return decodeURIComponent(url);
	} catch {
		return url;
	}
};

export const urlEncode = (url: string): string => {
	try {
		return encodeURIComponent(url);
	} catch {
		return url;
	}
};
