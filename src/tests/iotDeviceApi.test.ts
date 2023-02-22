import * as request from 'supertest';
import app from '../index';

jest.setTimeout(20000);

type IotDevice = {
	id?: string
	name: string
	value: number
	suffix: string
}

const iotDevice: IotDevice = {
	name: '2j@SD@!4Dzld!s@',
	value: 22,
	suffix: '%',
};

describe('POST /iotDevices', () => {
	it('should return message and iotDevice data', async () => {
		const res = await request(app).post('/iotDevices/').send(iotDevice);

		expect(res.statusCode).toBe(200);
		expect(res.body.message).toEqual('Dispositivo IOT criado com sucesso');
		expect(res.body.iotDevice).toEqual(expect.objectContaining({
			id: expect.any(String),
			name: iotDevice.name,
			value: iotDevice.value,
			suffix: iotDevice.suffix,
		}));

		iotDevice.id = res.body.iotDevice.id;
	});

	it('should return error message and errors passing iotDevice that has exists', async () => {
		const res = await request(app).post('/iotDevices/').send(iotDevice);
		
		expect(res.statusCode).toBe(400);
		expect(res.body.message).toEqual('Ocorreram alguns erros ao criar dispositivo IOT');
		expect(res.body.errors).toEqual(expect.arrayContaining([expect.any(String)]));
	});

	it('should return error message and errors when passing incorrect data', async () => {
		const data = { ...iotDevice, value: '22', };
		const res = await request(app).post('/iotDevices/').send(data);
		
		expect(res.statusCode).toBe(400);
		expect(res.body.message).toEqual('Ocorreram alguns erros ao criar dispositivo IOT');
		expect(res.body.errors).toEqual(expect.arrayContaining([expect.any(String)]));
	});
});

describe('GET /iotDevices', () => {
	it('should return message and iotDevices data', async () => {
		const res = await request(app).get('/iotDevices');
		
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toEqual('Dispositivos IOT buscados com sucesso');
		expect(res.body.iotDevices).toEqual(expect.arrayContaining([expect.objectContaining({
			id: expect.any(String),
			name: expect.any(String),
			value: expect.any(Number),
			suffix: expect.any(String),
		})]));
	});
});

describe('GET /iotDevices/:id', () => {
	it('should return message and iotDevice data passing id to param', async () => {
		const res = await request(app).get(`/iotDevices/${iotDevice.id}`);
		
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toEqual('Dispositivo IOT buscado com sucesso');
		expect(res.body.iotDevice).toEqual(expect.objectContaining({
			id: iotDevice.id,
			name: iotDevice.name,
			value: iotDevice.value,
			suffix: iotDevice.suffix,
		}));
	});

	it('should return error message and errors passing incorrect id to param', async () => {
		const res = await request(app).get('/iotDevices/2js2@Cz$!');
		expect(res.statusCode).toBe(400);
		expect(res.body.message).toEqual('Ocorreram alguns erros ao buscar dispositivo IOT');
		expect(res.body.errors).toEqual(expect.arrayContaining([expect.any(String)]));
	});
});

describe('GET /iotDevices/name/:name', () => {
	it('should return message and iotDevice data passing name to param', async () => {
		const res = await request(app).get(`/iotDevices/name/${iotDevice.name}`);

		expect(res.statusCode).toBe(200);
		expect(res.body.message).toEqual('Dispositivo IOT buscado com sucesso');
		expect(res.body.iotDevice).toEqual(expect.objectContaining({
			id: iotDevice.id,
			name: iotDevice.name,
			value: iotDevice.value,
			suffix: iotDevice.suffix,
		}));
	});
});

describe('PUT /iotDevices', () => {
	it('should return message and iotDevice data', async () => {
		const data = {
			name: '@aZXCa@!!xZ;W!s',
			value: 55,
			suffix: 'ºF',
		};
		const res = await request(app).put(`/iotDevices/${iotDevice.id}`).send(data);

		expect(res.statusCode).toBe(200);
		expect(res.body.message).toEqual(`Dispositivo IOT com id ${iotDevice.id} atualizado com sucesso`);
		expect(res.body.iotDevice).toEqual(expect.objectContaining({
			id: expect.any(String),
			name: data.name,
			value: data.value,
			suffix: data.suffix,
		}));

		iotDevice.name = res.body.iotDevice.name;
		iotDevice.value = res.body.iotDevice.value;
		iotDevice.suffix = res.body.iotDevice.suffix;
	});

	it('should return error message and errors when passing incorrect data', async () => {
		const data = { ...iotDevice, value: '22', };
		const res = await request(app).put(`/iotDevices/${iotDevice.id}`).send(data);
		
		expect(res.statusCode).toBe(400);
		expect(res.body.message).toEqual('Ocorreram alguns erros ao atualizar dispositivo IOT');
		expect(res.body.errors).toEqual(expect.arrayContaining([expect.any(String)]));
	});

	it('should return error message and errors passing incorrect id to param', async () => {
		const res = await request(app).put('/iotDevices/2js2@Cz$!').send(iotDevice);
		expect(res.statusCode).toBe(400);
		expect(res.body.message).toEqual('Ocorreram alguns erros ao atualizar dispositivo IOT');
		expect(res.body.errors).toEqual(expect.arrayContaining([expect.any(String)]));
	});
});

describe('DELETE /iotDevices', () => {
	it('should return message and iotDevice data', async () => {
		const res = await request(app).delete(`/iotDevices/${iotDevice.id}`);
		
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toEqual(`Dispositivo IOT com id ${iotDevice.id} deletado com sucesso`);
		expect(res.body.iotDevice).toEqual(expect.objectContaining({
			id: iotDevice.id,
			name: iotDevice.name,
			value: iotDevice.value,
			suffix: iotDevice.suffix,
		}));

		iotDevice.id = res.body.iotDevice.id;
	});

	it('should return error message and errors passing incorrect id to param', async () => {
		const res = await request(app).delete('/iotDevices/2js2@Cz$!');
		expect(res.statusCode).toBe(400);
		expect(res.body.message).toEqual('Ocorreram alguns erros ao deletar dispositivo IOT');
		expect(res.body.errors).toEqual(expect.arrayContaining([expect.any(String)]));
	});
});