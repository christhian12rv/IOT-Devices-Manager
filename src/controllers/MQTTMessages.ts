import logger from '../config/logger';
import Mqtt from '../config/Mqtt';
import MQTTTopicsEnum from '../enums/mqtt/MQTTTopics.enum';
import IOTDeviceService from '../services/IOTDevice.service';
import formatErrors from '../utils/formatErrors';
import * as IOTDeviceValidator from '../validators/IOTDevice.validator';

class MQTTMessages {
	public async iotDevicesFindAll(): Promise<void> {
		const client = Mqtt.getInstance().getClient();

		try {
			const iotDevices = await IOTDeviceService.findAll();

			const message = 'Dispositivos IOT buscados com sucesso';
			logger.info(message);

			client.publish(MQTTTopicsEnum.IOT_DEVICES__FIND_ALL__RESPONSE, JSON.stringify({ data: { iotDevices, }, message, }));
		} catch (error) {
			const message = 'Ocorreram erros internos ao buscar dispositivos IOT';
			const errorPayload = JSON.stringify({ errors: [], message, });
			logger.error(error);

			client.publish(MQTTTopicsEnum.IOT_DEVICES__FIND_ALL__RESPONSE, errorPayload );
		}
	}

	public async iotDevicesFindById(payload): Promise<void> {
		const client = Mqtt.getInstance().getClient();

		try {
			await IOTDeviceValidator.findById.validateAsync(payload);
		} catch (e) {
			const formatedErrors = e.msg ? [e.msg] : formatErrors(e.details);
			const message = 'Ocorreram alguns erros ao buscar dispositivo IOT';
			logger.error(message);

			const errorPayload = JSON.stringify({ errors: formatedErrors, message, });
			
			client.publish(MQTTTopicsEnum.IOT_DEVICES__FIND_BY_ID__RESPONSE, errorPayload);
			return;
		}

		try {
			const iotDevice = await IOTDeviceService.findById(payload.id);

			const message = 'Dispositivo IOT buscado com sucesso';
			logger.info(message);

			client.publish(MQTTTopicsEnum.IOT_DEVICES__FIND_BY_ID__RESPONSE, JSON.stringify({ data: { iotDevice, }, message, }));
		} catch (error) {
			const message = 'Ocorreram erros internos ao buscar dispositivo IOT';
			logger.error(message);
			
			const errorPayload = JSON.stringify({ errors: [], message, });

			client.publish(MQTTTopicsEnum.IOT_DEVICES__FIND_BY_ID__RESPONSE, errorPayload);
		}
	}

	public async iotDevicesFindByName(payload): Promise<void> {
		const client = Mqtt.getInstance().getClient();

		try {
			await IOTDeviceValidator.findByName.validateAsync(payload);
		} catch (e) {
			const formatedErrors = e.msg ? [e.msg] : formatErrors(e.details);
			const message = 'Ocorreram alguns erros ao buscar dispositivo IOT';
			logger.error(message);

			const errorPayload = JSON.stringify({ errors: formatedErrors, message, });
			
			client.publish(MQTTTopicsEnum.IOT_DEVICES__FIND_BY_NAME__RESPONSE, errorPayload);
			return;
		}

		try {
			const iotDevice = await IOTDeviceService.findByName(payload.name);

			const message = 'Dispositivo IOT buscado com sucesso';
			logger.info(message);

			client.publish(MQTTTopicsEnum.IOT_DEVICES__FIND_BY_NAME__RESPONSE, JSON.stringify({ data: { iotDevice, }, message, }));
		} catch (error) {
			const message = 'Ocorreram erros internos ao buscar dispositivo IOT';
			logger.error(message);
			
			const errorPayload = JSON.stringify({ errors: [], message, });

			client.publish(MQTTTopicsEnum.IOT_DEVICES__FIND_BY_NAME__RESPONSE, errorPayload);
		}
	}

	public async iotDevicesCreate(payload): Promise<void> {
		const client = Mqtt.getInstance().getClient();

		try {
			await IOTDeviceValidator.create.validateAsync(payload);
		} catch (e) {
			const formatedErrors = e.msg ? [e.msg] : formatErrors(e.details);
			const message = 'Ocorreram alguns erros ao criar dispositivo IOT';
			logger.error(message);

			const errorPayload = JSON.stringify({ errors: formatedErrors, message, });
			
			client.publish(MQTTTopicsEnum.IOT_DEVICES__CREATE__RESPONSE, errorPayload);
			return;
		}

		try {
			const iotDevices = await IOTDeviceService.create(payload);

			const message = 'Dispositivo IOT criado com sucesso';
			logger.info(message);

			client.publish(MQTTTopicsEnum.IOT_DEVICES__CREATE__RESPONSE, JSON.stringify({ data: { iotDevices, }, message, }));
		} catch (error) {
			const message = 'Ocorreram erros internos ao criar dispositivo IOT';
			logger.error(message);
			
			const errorPayload = JSON.stringify({ errors: [], message, });

			client.publish(MQTTTopicsEnum.IOT_DEVICES__CREATE__RESPONSE, errorPayload);
		}
	}

	public async iotDevicesUpdate(payload): Promise<void> {
		const client = Mqtt.getInstance().getClient();

		try {
			await IOTDeviceValidator.update.validateAsync(payload);
		} catch (e) {
			const formatedErrors = e.msg ? [e.msg] : formatErrors(e.details);
			const message = 'Ocorreram alguns erros ao atualizar dispositivo IOT';
			logger.error(message);

			const errorPayload = JSON.stringify({ errors: formatedErrors, message, });
			
			client.publish(MQTTTopicsEnum.IOT_DEVICES__UPDATE__RESPONSE, errorPayload);
			return;
		}

		try {
			const iotDevice = await IOTDeviceService.update(payload);

			const message = `Dispositivo IOT com id ${payload.id} atualizado com sucesso`;
			logger.info(message);

			client.publish(MQTTTopicsEnum.IOT_DEVICES__UPDATE__RESPONSE, JSON.stringify({ data: { iotDevice, }, message, }));
		} catch (error) {
			const message = 'Ocorreram erros internos ao atualizar dispositivo IOT';
			logger.error(message);
			
			const errorPayload = JSON.stringify({ errors: [], message, });

			client.publish(MQTTTopicsEnum.IOT_DEVICES__UPDATE__RESPONSE, errorPayload);
		}
	}

	public async iotDevicesDelete(payload): Promise<void> {
		const client = Mqtt.getInstance().getClient();

		try {
			await IOTDeviceValidator._delete.validateAsync(payload);
		} catch (e) {
			const formatedErrors = e.msg ? [e.msg] : formatErrors(e.details);
			const message = 'Ocorreram alguns erros ao deletar dispositivo IOT';
			logger.error(message);

			const errorPayload = JSON.stringify({ errors: formatedErrors, message, });
			
			client.publish(MQTTTopicsEnum.IOT_DEVICES__DELETE__RESPONSE, errorPayload);
			return;
		}

		try {
			const iotDevice = await IOTDeviceService.delete(payload.id);

			const message = `Dispositivo IOT com id ${payload.id} deletado com sucesso`;
			logger.info(message);
			
			client.publish(MQTTTopicsEnum.IOT_DEVICES__DELETE__RESPONSE, JSON.stringify({ data: { iotDevice, }, message, }));
		} catch (error) {
			const message = 'Ocorreram erros internos ao deletar dispositivo IOT';
			logger.error(message);
			
			const errorPayload = JSON.stringify({ errors: [], message, });

			client.publish(MQTTTopicsEnum.IOT_DEVICES__DELETE__RESPONSE, errorPayload);
		}
	}
}

export default new MQTTMessages();