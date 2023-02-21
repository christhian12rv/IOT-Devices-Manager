import { MqttClient } from 'mqtt';
import logger from '../../config/logger';
import MQTTMessages from '../../controllers/MQTTMessages';
import MQTTTopicsEnum from '../../enums/mqtt/MQTTTopics.enum';

const callControllerMethod = (client: MqttClient, payload): object => ({
	[MQTTTopicsEnum.IOT_DEVICES__FIND_ALL]: (): Promise<void> => MQTTMessages.iotDevicesFindAll(client),
	[MQTTTopicsEnum.IOT_DEVICES__CREATE]: (): Promise<void> => MQTTMessages.iotDevicesCreate(client, payload),
});

export default function(client: MqttClient): void {
	client.on('message', async (topic, payload) => {
		logger.info(`MQTT received Message: ${topic}`);
		payload = JSON.parse(payload.toString());
		logger.info(payload);
		
		callControllerMethod(client, payload)[topic]();
	});
}