export const urlDecode = (url: string): string => {
	try {
		return decodeURIComponent(url);
	} catch (e) {
		return url;
	}
};

export const urlEncode = (url: string): string => {
	try {
		return encodeURIComponent(url);
	} catch (e) {
		return url;
	}
};
