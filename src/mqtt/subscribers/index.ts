import logger from '../../config/logger';
import Mqtt from '../../config/Mqtt';
import MQTTTopicsEnum from '../../enums/mqtt/MQTTTopics.enum';

export const subscribeAll = (): void => {
	const client = Mqtt.getInstance().getClient();
	
	client.subscribe(MQTTTopicsEnum.IOT_DEVICES__FIND_ALL, () => {
		logger.info(`Subscribe to topic ${MQTTTopicsEnum.IOT_DEVICES__FIND_ALL}`);
	});
	
	client.subscribe(MQTTTopicsEnum.IOT_DEVICES__FIND_BY_ID, () => {
		logger.info(`Subscribe to topic ${MQTTTopicsEnum.IOT_DEVICES__FIND_BY_ID}`);
	});

	client.subscribe(MQTTTopicsEnum.IOT_DEVICES__FIND_BY_NAME, () => {
		logger.info(`Subscribe to topic ${MQTTTopicsEnum.IOT_DEVICES__FIND_BY_NAME}`);
	});

	client.subscribe(MQTTTopicsEnum.IOT_DEVICES__CREATE, () => {
		logger.info(`Subscribe to topic ${MQTTTopicsEnum.IOT_DEVICES__CREATE}`);
	});

	client.subscribe(MQTTTopicsEnum.IOT_DEVICES__UPDATE, () => {
		logger.info(`Subscribe to topic ${MQTTTopicsEnum.IOT_DEVICES__UPDATE}`);
	});

	client.subscribe(MQTTTopicsEnum.IOT_DEVICES__DELETE, () => {
		logger.info(`Subscribe to topic ${MQTTTopicsEnum.IOT_DEVICES__DELETE}`);
	});
};