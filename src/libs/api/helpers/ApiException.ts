class ApiException extends Error {
	private code: number;

	constructor(code: number, message: string) {
		super(message);
		this.name = 'ApiException';
		this.code = code;
	}

	get statusCode() {
		return this.code;
	}
}

export default ApiException;
