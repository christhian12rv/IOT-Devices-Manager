import 'dotenv/config';

export default {
	port: Number(process.env.PORT),
	databaseURL: process.env.DATABASE_URL,
	mqttHost: process.env.MQTT_HOST,
	mqttPort: process.env.MQTT_PORT,
	mqttUsername: process.env.MQTT_USERNAME,
	mqttPassword: process.env.MQTT_PASSWORD,
};