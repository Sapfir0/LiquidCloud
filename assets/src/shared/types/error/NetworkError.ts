import { ServerResponse } from '../ServerResponse';

export class NetworkError extends Error {
	response?: ServerResponse;

	public constructor(_response?: ServerResponse) {
		super('NetworkError');

		this.response = _response;
	}
}
