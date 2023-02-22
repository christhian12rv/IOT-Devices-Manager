enum MQTTTopicsEnum {
	IOT_DEVICES__FIND_ALL = 'iotDevicesManager/iotDevices/findAll',
	IOT_DEVICES__FIND_ALL__RESPONSE = 'iotDevicesManager/iotDevices/findAll/response',
	IOT_DEVICES__FIND_BY_ID = 'iotDevicesManager/iotDevices/findById',
	IOT_DEVICES__FIND_BY_ID__RESPONSE = 'iotDevicesManager/iotDevices/findById/response',
	IOT_DEVICES__FIND_BY_NAME = 'iotDevicesManager/iotDevices/findByName',
	IOT_DEVICES__FIND_BY_NAME__RESPONSE = 'iotDevicesManager/iotDevices/findByName/response',
	IOT_DEVICES__CREATE = 'iotDevicesManager/iotDevices/create',
	IOT_DEVICES__CREATE__RESPONSE = 'iotDevicesManager/iotDevices/create/response',
	IOT_DEVICES__UPDATE = 'iotDevicesManager/iotDevices/update',
	IOT_DEVICES__UPDATE__RESPONSE = 'iotDevicesManager/iotDevices/update/response',
	IOT_DEVICES__DELETE = 'iotDevicesManager/iotDevices/delete',
	IOT_DEVICES__DELETE__RESPONSE = 'iotDevicesManager/iotDevices/delete/response'
}

export default MQTTTopicsEnum;