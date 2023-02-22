import * as mqtt from 'mqtt';
import logger from './logger';
import * as mqttSubscribers from '../mqtt/subscribers';
import config from './config';
import messageListener from '../mqtt/listeners/message.listener';
import { MqttClient } from 'mqtt';

class Mqtt {
	private static instance: Mqtt;
	private client: MqttClient;

	public static getInstance(): Mqtt {
		if (!Mqtt.instance)
			Mqtt.instance = new Mqtt();

		return Mqtt.instance;
	}

	public connect(): void {
		const host = config.mqttHost;
		const port = config.mqttPort;
		const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
		const connectUrl = `mqtt://${host}:${port}`;
	
		this.setClient(mqtt.connect(connectUrl, {
			clientId,
			clean: true,
			connectTimeout: 4000,
			username: config.mqttUsername,
			password: config.mqttPassword,
			reconnectPeriod: 1000,
		}));
		
		this.getClient().on('connect', () => {
			logger.info(`Conectado ao MQTT: ${connectUrl}`);
		
			mqttSubscribers.subscribeAll();
		});
		
		messageListener();
	}

	public getClient(): MqttClient {
		return this.client;
	}

	private setClient(client: MqttClient): void {
		this.client = client;
	}
}

export default Mqtt;