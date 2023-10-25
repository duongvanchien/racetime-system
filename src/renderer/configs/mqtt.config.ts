import * as mqtt from 'mqtt/dist/mqtt';

import { MQTT_CLIENT_ID, MQTT_URL } from '../../../env';

const mqttClient = mqtt.connect(MQTT_URL, {
  clientId: MQTT_CLIENT_ID,
});

export default mqttClient;
