import { Col, Row } from 'antd';

import Table from '../../components/table/Table';
import StopWatch from '../../containers/stopwatch/watch';

const HomePage = () => {
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

  const data = [
    {
      id: 34567,
      bib_number: '10890',
      epc: 'ABC000123456',
      time: '7:15:50',
      hits: '6',
      rssi: '-69',
    },
    {
      id: 34567,
      bib_number: '10890',
      epc: 'ABC000123456',
      time: '7:15:50',
      hits: '6',
      rssi: '-69',
    },
    {
      id: 34567,
      bib_number: '10890',
      epc: 'ABC000123456',
      time: '7:15:50',
      hits: '6',
      rssi: '-69',
    },
    {
      id: 34567,
      bib_number: '10890',
      epc: 'ABC000123456',
      time: '7:15:50',
      hits: '6',
      rssi: '-69',
    },
    {
      id: 34567,
      bib_number: '10890',
      epc: 'ABC000123456',
      time: '7:15:50',
      hits: '6',
      rssi: '-69',
    },
    {
      id: 34567,
      bib_number: '10890',
      epc: 'ABC000123456',
      time: '7:15:50',
      hits: '6',
      rssi: '-69',
    },
    {
      id: 34567,
      bib_number: '10890',
      epc: 'ABC000123456',
      time: '7:15:50',
      hits: '6',
      rssi: '-69',
    },
    {
      id: 34567,
      bib_number: '10890',
      epc: 'ABC000123456',
      time: '7:15:50',
      hits: '6',
      rssi: '-69',
    },
    {
      id: 34567,
      bib_number: '10890',
      epc: 'ABC000123456',
      time: '7:15:50',
      hits: '6',
      rssi: '-69',
    },
    {
      id: 34567,
      bib_number: '10890',
      epc: 'ABC000123456',
      time: '7:15:50',
      hits: '6',
      rssi: '-69',
    },
    {
      id: 34567,
      bib_number: '10890',
      epc: 'ABC000123456',
      time: '7:15:50',
      hits: '6',
      rssi: '-69',
    },
  ];

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <StopWatch />
        </Col>
        <Col span={12}></Col>
      </Row>
      <div className="mt-15 mb-10 font-bold fs-16">CHIP TIMING</div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default HomePage;
