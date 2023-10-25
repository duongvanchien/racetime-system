import { Col, Row } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

import {
  MQTT_COMMAND_TOPIC,
  MQTT_RESPONSE_TOPIC,
  MQTT_TAG_DATA_EVENTS_TOPIC,
} from '../../../../env';
import mqttClient from '../../configs/mqtt.config';
import StopWatch from '../../containers/stopwatch/watch';
import { IBib } from '../../interfaces/bib.interface';
import RfidTable from './components/rfid-table';
import AntennaTable from './components/antennas-table';
import Table from '../../components/table/table';
import { mqttPublish } from '../../services/mqtt.service';

const HomePage = () => {
  const [bibsData, setBibsData] = useState<IBib[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [isAccessInternet, setIsAccessInternet] = useState(false);
  const [readerCode, setReaderCode] = useState();
  const [antenas, setAntenas] = useState<string[]>([
    'disconnected',
    'disconnected',
    'disconnected',
    'disconnected',
    'disconnected',
    'disconnected',
    'disconnected',
    'disconnected',
  ]);

  const columns = [
    {
      title: '#',
      render: (_: any, record: any) => <>{record?.id}</>,
    },
    {
      title: 'Số BIB',
      dataIndex: 'bib_number',
    },
    {
      title: 'EPC',
      dataIndex: 'epc',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      render: (_: any, record: any) => (
        <>{moment(record?.time).format('HH:mm:ss')}</>
      ),
    },
    {
      title: 'Hits',
      dataIndex: 'hits',
    },
    {
      title: 'RSSI',
      dataIndex: 'rssi',
    },
  ];

  useEffect(() => {
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
    mqttClient.on('message', (topic, message) => {
      if (topic === MQTT_TAG_DATA_EVENTS_TOPIC) {
        const data: any = JSON.parse(message.toString());
        setBibsData((prevData) => [
          {
            id: Math.floor(1000 + Math.random() * 9000),
            bib_number: Math.floor(1000 + Math.random() * 9000),
            epc: data.data.idHex,
            hits: data.data.reads,
            rssi: data.data.peakRssi,
            time: data.timestamp,
          },
          ...prevData,
        ]);
      }

      if (topic === MQTT_RESPONSE_TOPIC) {
        const data: any = JSON.parse(message.toString());
        if (data.command === 'get_status') {
          setAntenas(Object.values(data.payload.antennas));
          setIsActive(data.payload.radioActivity === 'active');
        }
        if (data.command === 'get_network') {
          setIsAccessInternet(data.payload.dhcp);
          setReaderCode(data.payload.hostName);
        }
      }
    });
  }, []);

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <StopWatch />
        </Col>
        <Col span={12}>
          <div className="mb-10 font-bold fs-16">ĐẦU ĐỌC RFID</div>
          <RfidTable
            isAccessInternet={isAccessInternet}
            isActive={isActive}
            readerCode={readerCode}
          />

          <div className="mt-15 mb-10 font-bold fs-16">ANTENNAS</div>
          <AntennaTable antennas={antenas} />
        </Col>
      </Row>
      <div className="mt-15 mb-10 font-bold fs-16">CHIP TIMING</div>
      <Table columns={columns} data={bibsData} />
    </div>
  );
};

export default HomePage;
