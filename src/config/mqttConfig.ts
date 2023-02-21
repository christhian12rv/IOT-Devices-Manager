import * as mqtt from 'mqtt';
import IOTDeviceService from '../services/IOTDevice.service';
import logger from './logger';
import * as mqttSubscribers from '../mqtt/subscribers';
import config from './config';
import messageListener from '../mqtt/listeners/message.listener';

export const connect = (): void => {
	const host = config.mqttHost;
	const port = config.mqttPort;
	const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
	const connectUrl = `mqtt://${host}:${port}`;

	const client = mqtt.connect(connectUrl, {
		clientId,
		clean: true,
		connectTimeout: 4000,
		username: config.mqttUsername,
		password: config.mqttPassword,
		reconnectPeriod: 1000,
	});
	
	client.on('connect', () => {
		logger.info(`Connected to MQTT: ${connectUrl}`);
	
		mqttSubscribers.subscribeAll(client);
	});
	
	messageListener(client);
};