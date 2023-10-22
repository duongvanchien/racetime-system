import { Col, Row } from 'antd';
import StopWatch from '../../containers/stopwatch/watch';

const HomePage = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <StopWatch />
        </Col>
        <Col span={12}></Col>
      </Row>
    </div>
  );
};

export default HomePage;
