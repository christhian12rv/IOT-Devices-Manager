import { Router } from 'express';
import iotDeviceController from '../controllers/IOTDevice.controller';
import IOTDeviceMiddleware from '../middlewares/IOTDevice.middleware';

const iotDeviceRoute = Router();

iotDeviceRoute.get('/', iotDeviceController.findAll);
iotDeviceRoute.get('/:id', IOTDeviceMiddleware.findById, iotDeviceController.findById);
iotDeviceRoute.get('/name/:name', IOTDeviceMiddleware.findByName, iotDeviceController.findByName);
iotDeviceRoute.post('/', IOTDeviceMiddleware.create, iotDeviceController.create);
iotDeviceRoute.put('/:id', IOTDeviceMiddleware.update, iotDeviceController.update);
iotDeviceRoute.delete('/:id', IOTDeviceMiddleware.delete, iotDeviceController.delete);

export default iotDeviceRoute;