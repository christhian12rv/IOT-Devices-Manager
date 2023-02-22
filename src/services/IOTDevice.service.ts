import Database from '../config/Database';
import IOTDeviceInterface from '../interfaces/IOTDevice.interface';

class IOTDeviceService {
	public async findAll(): Promise<IOTDeviceInterface[]> {
		const iotDevices = await Database.getInstance().getDatabase().iOTDevice.findMany();
		return iotDevices;
	}

	public async findById(id): Promise<IOTDeviceInterface> {
		const iotDevice = await Database.getInstance().getDatabase().iOTDevice.findUnique({
			where: {
				id,
			},
		});

		return iotDevice;
	}

	public async findByName(name): Promise<IOTDeviceInterface> {
		const iotDevice = await Database.getInstance().getDatabase().iOTDevice.findUnique({
			where: {
				name,
			},
		});

		return iotDevice;
	}

	public async create({ name, value, suffix, }): Promise<IOTDeviceInterface> {
		const iotDevice = await Database.getInstance().getDatabase().iOTDevice.create({
			data: {
				name,
				value,
				suffix,
			},
		});

		return iotDevice;
	}

	public async update({ id, name, value, suffix, }): Promise<IOTDeviceInterface> {
		const iotDevice = await Database.getInstance().getDatabase().iOTDevice.update({
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
		const iotDevice = await Database.getInstance().getDatabase().iOTDevice.delete({
			where: {
				id,
			},
		});

		return iotDevice;
	}
}

export default new IOTDeviceService();