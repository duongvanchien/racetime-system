import { useEffect } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

import {
  MQTT_COMMAND_TOPIC,
  MQTT_MANAGEMENT_EVENTS_TOPIC,
  MQTT_RESPONSE_TOPIC,
  MQTT_TAG_DATA_EVENTS_TOPIC,
} from '../../env';
import mqttClient from './configs/mqtt.config';
import routes from './routes/routes';
import './styles/index.scss';
import { mqttDisconnect, mqttPublish } from './services/mqtt.service';
import { notification } from 'antd';

export default function App() {
  const [, contextHolder] = notification.useNotification();

  const getReaderDeviceInfo = () => {
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
    mqttClient.on('error', (error) => {
      console.error('MQTT error:', error);
    });

    mqttClient.on('close', () => {
      console.log('MQTT connection closed');
    });

    mqttClient.on('connect', () => {
      interval = setInterval(getReaderDeviceInfo, 30000);
      mqttClient.subscribe(MQTT_MANAGEMENT_EVENTS_TOPIC);
      mqttClient.subscribe(MQTT_TAG_DATA_EVENTS_TOPIC);
      mqttClient.subscribe(MQTT_COMMAND_TOPIC);
      mqttClient.subscribe(MQTT_RESPONSE_TOPIC);
    });

    return () => {
      mqttDisconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {contextHolder}
      <Router>{routes}</Router>
    </>
  );
}
