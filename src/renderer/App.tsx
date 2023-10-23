import * as mqtt from 'mqtt/dist/mqtt';
import { useEffect } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

import { MQTT_CLIENT_ID, MQTT_TOPIC, MQTT_URL } from '../../env';
import routes from './routes/routes';
import './styles/index.scss';

export default function App() {
  useEffect(() => {
    const mqttClient = mqtt.connect(MQTT_URL, {
      clientId: MQTT_CLIENT_ID,
    });

    mqttClient.on('error', (error) => {
      console.error('MQTT error:', error);
    });

    mqttClient.on('close', () => {
      console.log('MQTT connection closed');
    });

    mqttClient.on('connect', () => {
      console.log(`${MQTT_CLIENT_ID} connected`);
      mqttClient.subscribe(MQTT_TOPIC, function (err) {
        if (!err) {
          mqttClient.publish(MQTT_TOPIC, `${MQTT_CLIENT_ID} connected`);
        }
      });
    });

    mqttClient.on('message', (topic, message) => {
      console.log(
        `Received message from topic ${topic}: ${message.toString()}`,
      );
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  return <Router>{routes}</Router>;
}
