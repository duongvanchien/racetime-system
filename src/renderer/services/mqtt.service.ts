import mqttClient from '../configs/mqtt.config';

export const mqttPublish = (topic: string, payload: any) => {
  mqttClient.publish(topic, JSON.stringify(payload));
};

export const mqttUnsubscribe = (topic: string) => {
  mqttClient.unsubscribe(topic);
};

export const mqttDisconnect = () => {
  mqttClient.end();
};
