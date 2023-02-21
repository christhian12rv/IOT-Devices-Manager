import prisma from '../config/db';
import IOTDeviceInterface from '../interfaces/IOTDevice.interface';

class IOTDeviceService {
	public async findAll(): Promise<IOTDeviceInterface[]> {
		const iotDevices = await prisma.iOTDevice.findMany();
		return iotDevices;
	}

	public async findById(id): Promise<IOTDeviceInterface> {
		const iotDevice = await prisma.iOTDevice.findUnique({
			where: {
				id,
			},
		});

		return iotDevice;
	}

	public async findByName(name): Promise<IOTDeviceInterface> {
		const iotDevice = await prisma.iOTDevice.findUnique({
			where: {
				name,
			},
		});

		return iotDevice;
	}

	public async create({ name, value, suffix, }): Promise<IOTDeviceInterface> {
		const iotDevice = await prisma.iOTDevice.create({
			data: {
				name,
				value,
				suffix,
			},
		});

		return iotDevice;
	}

	public async update({ id, name, value, suffix, }): Promise<IOTDeviceInterface> {
		const iotDevice = await prisma.iOTDevice.update({
			where: {
				id,
			},
			data: {
				name,
				value,
				suffix,
			},
		});

		return iotDevice;
	}

	public async delete(id): Promise<IOTDeviceInterface> {
		const iotDevice = await prisma.iOTDevice.delete({
			where: {
				id,
			},
		});

		return iotDevice;
	}
}

export default new IOTDeviceService();