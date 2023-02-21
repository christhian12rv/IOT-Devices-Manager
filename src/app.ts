import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import logger from './config/logger';
import config from './config/config';
import * as mqttConfig from './config/mqttConfig';
import iotDeviceRoute from './routes/IOTDevice.route';

export default class App {
	private express: express.Application;

	constructor() {
		this.express = express();
		this.listen();
		this.middlewares();
		this.routes();
		this.connectMQTT();
	}

	public getApp(): express.Application {
		return this.express;
	}

	private middlewares(): void {
		this.express.use(express.json({
			type: '*/*',
		}));
		this.express.use(cors());
	}

	private listen(): void {
		this.express.listen(config.port, () => {
			logger.info(`Servidor rodando em: http://localhost:${config.port}`);
		});
	}

	private routes(): void {
		this.express.use('/iotDevices/', iotDeviceRoute);
	}

	private connectMQTT(): void {
		mqttConfig.connect();
	}
}