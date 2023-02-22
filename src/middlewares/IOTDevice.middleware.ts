import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import formatErrors from '../utils/formatErrors';
import * as IOTDeviceValidator from '../validators/IOTDevice.validator';

class IOTDeviceMiddleware {
	public async findById(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			await IOTDeviceValidator.findById.validateAsync(req.params);
		} catch (e) {
			const formatedErrors = e.msg ? [e.msg] : formatErrors(e.details);
			const message = 'Ocorreram alguns erros ao buscar dispositivo IOT';
			logger.error(message);
			return res.status(400).json({ errors: formatedErrors, message, });
		}

		next();
	}

	public async findByName(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			await IOTDeviceValidator.findByName.validateAsync(req.params);
		} catch (e) {
			const formatedErrors = e.msg ? [e.msg] : formatErrors(e.details);
			const message = 'Ocorreram alguns erros ao buscar dispositivo IOT';
			logger.error(message);
			return res.status(400).json({ errors: formatedErrors, message, });
		}

		next();
	}

	public async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const data = req.body;

		try {
			await IOTDeviceValidator.create.validateAsync(data);
		} catch (e) {
			const formatedErrors = e.msg ? [e.msg] : formatErrors(e.details);
			const message = 'Ocorreram alguns erros ao criar dispositivo IOT';
			logger.error(message);
			return res.status(400).json({ errors: formatedErrors, message, });
		}

		next();
	}

	public async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const { id, } = req.params;
		const data = req.body;

		try {
			await IOTDeviceValidator.update.validateAsync( { id, ...data, });
		} catch (e) {
			const formatedErrors = e.msg ? [e.msg] : formatErrors(e.details);
			const message = 'Ocorreram alguns erros ao atualizar dispositivo IOT';
			logger.error(message);
			return res.status(400).json({ errors: formatedErrors, message, });
		}

		next();
	}

	public async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const { id, } = req.params;

		try {
			await IOTDeviceValidator._delete.validateAsync({ id, });
		} catch (e) {
			const formatedErrors = e.msg ? [e.msg] : formatErrors(e.details);
			const message = 'Ocorreram alguns erros ao deletar dispositivo IOT';
			logger.error(message);
			return res.status(400).json({ errors: formatedErrors, message, });
		}

		next();
	}
}

export default new IOTDeviceMiddleware();