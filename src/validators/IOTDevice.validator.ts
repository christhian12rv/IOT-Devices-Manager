import Joi = require('joi');
import { ObjectId } from 'mongodb';
import JoiCustomError from '../errors/JoiCustomError';
import IOTDeviceService from '../services/IOTDevice.service';

export const findById = Joi.object().keys({
	id: Joi
		.string()
		.required()
		.messages({
			'string.base': 'Id é inválido',
			'any.required':'Id é obrigatório',
		})
		.external(async (value) => {
			if (!ObjectId.isValid(value))
				throw new JoiCustomError('Id é inválido');
		}),
});

export const create = Joi.object().keys({
	name: Joi
		.string()
		.required()
		.alphanum()
		.messages({
			'string.alphanum': 'Nome é inválido',
			'string.base': 'Nome é inválido',
			'any.required':'Nome é obrigatório',
		})
		.external(async (value) => {
			const iotDevice = await IOTDeviceService.findByName(value);

			if (iotDevice)
				throw new JoiCustomError(`Já existe um dispositivo IOT com nome ${value}`);
		}),
	value: Joi
		.number()
		.strict()
		.required()
		.messages({
			'number.base': 'Valor é inválido',
			'any.required':'Valor é obrigatório',
		}),
	suffix: Joi
		.string()
		.required()
		.messages({
			'string.base': 'Sufixo é inválido',
			'any.required':'Sufixo é obrigatório',
		}),
}).options({ abortEarly : false, });


export const update = Joi.object().keys({
	id: Joi
		.string()
		.required()
		.messages({
			'string.base': 'Id é inválido',
			'any.required':'Id é obrigatório',
		})
		.external(async (value) => {
			if (!ObjectId.isValid(value))
				throw new JoiCustomError('Id é inválido');

			const IOTDevice = await IOTDeviceService.findById(value);

			if (!IOTDevice)
				throw new JoiCustomError(`Não existe um dispositivo IOT com id ${value}`);
		}),
	name: Joi
		.string()
		.required()
		.alphanum()
		.messages({
			'string.alphanum': 'Nome é inválido',
			'string.base': 'Nome é inválido',
			'any.required':'Nome é obrigatório',
		})
		.external(async (value) => {
			const iotDevice = await IOTDeviceService.findByName(value);

			if (iotDevice)
				throw new JoiCustomError(`Já existe um dispositivo IOT com nome ${value}`);
		}),
	value: Joi
		.number()
		.strict()
		.required()
		.messages({
			'number.base': 'Valor é inválido',
			'any.required':'Valor é obrigatório',
		}),
	suffix: Joi
		.string()
		.required()
		.messages({
			'string.base': 'Sufixo é inválido',
			'any.required':'Sufixo é obrigatório',
		}),
}).options({ abortEarly : false, });


export const _delete = Joi.object().keys({
	id: Joi
		.string()
		.required()
		.messages({
			'string.base': 'Id é inválido',
			'any.required':'Id é obrigatório',
		})
		.external(async (value) => {
			if (!ObjectId.isValid(value))
				throw new JoiCustomError('Id é inválido');

			const IOTDevice = await IOTDeviceService.findById(value);

			if (!IOTDevice)
				throw new JoiCustomError(`Não existe um dispositivo IOT com id ${value}`);
		}),
});