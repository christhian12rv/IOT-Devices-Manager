class JoiCustomError extends Error {
	private msg: string;
	
	constructor(msg) {
		super(msg);

		this.msg = msg;
	}
}

export default JoiCustomError;