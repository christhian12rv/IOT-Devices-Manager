import { Request, Response } from 'express';
import logger from '../config/logger';
import iotDeviceService from '../services/IOTDevice.service';

class IOTDevice {
	public async findAll(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando findAll de ${req.originalUrl}`);

		try {
			const iotDevices = await iotDeviceService.findAll();
			
			const message = 'Dispositivos IOT buscados com sucesso';
			logger.info(message);

			return res.status(200).send({ message, iotDevices, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao buscar dispositivos IOT';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async findById(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando findById de ${req.originalUrl}`);

		const { id, } = req.params;

		try {
			const iotDevice = await iotDeviceService.findById(id);
			const message = 'Dispositivo IOT buscado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, iotDevice, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao buscar dispositivo IOT';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async findByName(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando findByName de ${req.originalUrl}`);

		const { name, } = req.params;

		try {
			const iotDevice = await iotDeviceService.findByName(name);
			
			const message = 'Dispositivo IOT buscado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, iotDevice, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao buscar dispositivo IOT';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async create(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando create de ${req.originalUrl}`);
		
		const data = req.body;

		try {
			const iotDevice = await iotDeviceService.create(data);
			
			const message = 'Dispositivo IOT criado com sucesso';
			logger.info(message);

			return res.status(200).send({ message, iotDevice, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao criar dispositivo IOT';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async update(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando update de ${req.originalUrl}`);

		const data = {
			id: req.params.id,
			...req.body,
		};

		try {
			const iotDevice = await iotDeviceService.update(data);
			
			const message = `Dispositivo IOT com id ${data.id} atualizado com sucesso`;
			logger.info(message);

			return res.status(200).send({ message, iotDevice, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao atualizar dispositivo IOT';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		logger.info(`Chamando delete de ${req.originalUrl}`);

		const { id, } = req.params;

		try {
			const iotDevice = await iotDeviceService.delete(id);
			
			const message = `Dispositivo IOT com id ${id} deletado com sucesso`;
			logger.info(message);

			return res.status(200).send({ message, iotDevice, });
		} catch(e) {
			const message = 'Ocorreram erros internos ao deletar dispositivo IOT';
			logger.error(e);

			return res.status(500).send({ message, });
		}
	}
}

export default new IOTDevice();