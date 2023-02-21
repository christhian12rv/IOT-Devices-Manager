declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: number
			DATABASE_URL: string
			MQTT_HOST: string
			MQTT_PORT: string
			MQTT_USERNAME: string
			MQTT_PASSWORD: string
		}
	}
}

export {};