import logger from '../../config/logger';
import Mqtt from '../../config/Mqtt';
import MQTTMessages from '../../controllers/MQTTMessages';
import MQTTTopicsEnum from '../../enums/mqtt/MQTTTopics.enum';

const callControllerMethod = (payload): object => ({
	[MQTTTopicsEnum.IOT_DEVICES__FIND_ALL]: (): Promise<void> => MQTTMessages.iotDevicesFindAll(),
	[MQTTTopicsEnum.IOT_DEVICES__FIND_BY_ID]: (): Promise<void> => MQTTMessages.iotDevicesFindById(payload),
	[MQTTTopicsEnum.IOT_DEVICES__FIND_BY_NAME]: (): Promise<void> => MQTTMessages.iotDevicesFindByName(payload),
	[MQTTTopicsEnum.IOT_DEVICES__CREATE]: (): Promise<void> => MQTTMessages.iotDevicesCreate(payload),
	[MQTTTopicsEnum.IOT_DEVICES__UPDATE]: (): Promise<void> => MQTTMessages.iotDevicesUpdate(payload),
	[MQTTTopicsEnum.IOT_DEVICES__DELETE]: (): Promise<void> => MQTTMessages.iotDevicesDelete(payload),
});

export default function(): void {
	const client = Mqtt.getInstance().getClient();
	
	client.on('message', async (topic, payload) => {
		logger.info(`MQTT received Message: ${topic}`);
		
		payload = JSON.parse(payload.toString());
		
		callControllerMethod(payload)[topic]();
	});
}