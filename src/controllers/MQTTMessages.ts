import logger from '../config/logger';
import MQTTTopicsEnum from '../enums/mqtt/MQTTTopics.enum';
import IOTDeviceService from '../services/IOTDevice.service';
import formatErrors from '../utils/formatErrors';
import * as IOTDeviceValidator from '../validators/IOTDevice.validator';

class MQTTMessages {
	public async iotDevicesFindAll(client): Promise<void> {
		try {
			const iotDevices = await IOTDeviceService.findAll();
			client.publish(MQTTTopicsEnum.IOT_DEVICES__FIND_ALL__RESPONSE, JSON.stringify({ data: iotDevices, }));
		} catch (error) {
			client.publish(MQTTTopicsEnum.IOT_DEVICES__FIND_ALL__RESPONSE, 'error');
		}
	}

	public async iotDevicesCreate(client, payload): Promise<void> {
		try {
			await IOTDeviceValidator.create.validateAsync(payload);
		} catch (e) {
			const formatedErrors = e.msg ? [e.msg] : formatErrors(e.details);
			const message = 'Ocorreram alguns erros ao criar dispositivo IOT';
			logger.error(message);

			const errorPayload = JSON.stringify({ errors: formatedErrors, message, });
			
			return client.publish(MQTTTopicsEnum.IOT_DEVICES__CREATE__RESPONSE, errorPayload);
		}

		try {
			const iotDevices = await IOTDeviceService.create(payload);
			logger.info(iotDevices);
			client.publish(MQTTTopicsEnum.IOT_DEVICES__CREATE__RESPONSE, JSON.stringify({ data: iotDevices, }));
		} catch (error) {
			const message = 'Ocorreram erros internos ao criar dispositivo IOT';
			logger.error(error);
			
			const errorPayload = JSON.stringify({ message, });

			client.publish(MQTTTopicsEnum.IOT_DEVICES__CREATE__RESPONSE, errorPayload);
		}
	}
}

export default new MQTTMessages();