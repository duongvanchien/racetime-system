import { useEffect } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

import {
  MQTT_COMMAND_TOPIC,
  MQTT_MANAGEMENT_EVENTS_TOPIC,
  MQTT_RESPONSE_TOPIC,
  MQTT_TAG_DATA_EVENTS_TOPIC
} from '../../env';
import mqttClient from './configs/mqtt.config';
import { LOCALSTORAGE_IS_DISCONNECT, LOCALSTORAGE_NOW } from './constants/common';
import routes from './routes/routes';
import { mqttDisconnect, mqttPublish } from './services/mqtt.service';
import './styles/index.scss';

export default function App() {
  const getReaderDeviceInfo = async () => {
    mqttPublish(MQTT_COMMAND_TOPIC, {
      command: 'get_status',
      command_id: Date.now().toString(),
      payload: {},
    });

    mqttPublish(MQTT_COMMAND_TOPIC, {
      command: 'get_network',
      command_id: Date.now().toString(),
      payload: {},
    });
  };

  useEffect(() => {
    let interval: any;
    mqttClient.on('connect', () => {
      interval = setInterval(getReaderDeviceInfo, 30000);
      mqttClient.subscribe(MQTT_MANAGEMENT_EVENTS_TOPIC);
      mqttClient.subscribe(MQTT_TAG_DATA_EVENTS_TOPIC);
      mqttClient.subscribe(MQTT_COMMAND_TOPIC);
      mqttClient.subscribe(MQTT_RESPONSE_TOPIC);
    });
    mqttClient.on('error', (error) => {
      console.log('MQTT error:', error);
    });
    mqttClient.on('close', () => {
      console.log('MQTT connection closed');
    });

    return () => {
      mqttDisconnect();
      clearInterval(interval);
    };
  }, []);

  return <Router>{routes}</Router>;
}
