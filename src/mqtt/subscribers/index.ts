import { MqttClient } from 'mqtt';
import logger from '../../config/logger';
import MQTTTopicsEnum from '../../enums/mqtt/MQTTTopics.enum';

export const subscribeAll = (client: MqttClient): void => {
	client.subscribe(MQTTTopicsEnum.IOT_DEVICES__FIND_ALL, () => {
		logger.info(`Subscribe to topic ${MQTTTopicsEnum.IOT_DEVICES__FIND_ALL}`);
	});
	
	client.subscribe(MQTTTopicsEnum.IOT_DEVICES__CREATE, () => {
		logger.info(`Subscribe to topic ${MQTTTopicsEnum.IOT_DEVICES__CREATE}`);
	});
};