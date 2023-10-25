import { Col, Row } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

import {
  MQTT_COMMAND_TOPIC,
  MQTT_MANAGEMENT_EVENTS_TOPIC,
  MQTT_RESPONSE_TOPIC,
  MQTT_TAG_DATA_EVENTS_TOPIC,
} from '../../../../env';
import Table from '../../components/table/table';
import mqttClient from '../../configs/mqtt.config';
import StopWatch from '../../containers/stopwatch/watch';
import { IBib } from '../../interfaces/bib.interface';
import { mqttPublish } from '../../services/mqtt.service';
import AntennaTable from './components/antennas-table';
import RfidTable from './components/rfid-table';
import {
  DEFAULT_PAGE_SIZE,
  IPagination,
  LOCALSTORAGE_NOW,
} from '../../constants/common';
import Modal from '../../components/modal/modal';

const HomePage = () => {
  const [bibsData, setBibsData] = useState<IBib[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [isAccessInternet, setIsAccessInternet] = useState(false);
  const [readerCode, setReaderCode] = useState();
  const [openModalError, setOpenModalError] = useState(false);
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });
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
    let interval: any;
    interval = setInterval(() => {
      if (Date.now() - Number(localStorage.getItem(LOCALSTORAGE_NOW)) > 60000) {
        setOpenModalError(true);
      } else {
        setOpenModalError(false);
      }
    }, 30000);
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
      if (topic === MQTT_MANAGEMENT_EVENTS_TOPIC) {
        localStorage.setItem(LOCALSTORAGE_NOW, Date.now().toString());
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
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Modal
        open={openModalError}
        title="Lỗi kết nối"
        handleClose={() => {}}
        type="error"
        disabledConfirmButton
      >
        Đầu đọc không hoạt động. Kiểm tra tình trạng kết nối
      </Modal>
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
      <Table
        columns={columns}
        data={bibsData.slice(
          (pagination.currentPage - 1) * pagination.pageSize,
          pagination.currentPage * pagination.pageSize,
        )}
        totalData={bibsData}
        pagination={pagination}
        handleChangePage={(page) => {
          setPagination({ ...pagination, currentPage: page });
        }}
        handleChangePageSize={(pageSize) => {
          setPagination({ ...pagination, pageSize });
        }}
      />
    </div>
  );
};

export default HomePage;
