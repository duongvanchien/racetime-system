import { Col, Row } from 'antd';
import React from 'react';

interface IButtons {
  handleStart: () => void;
  handleReset: () => void;
}

const Buttons = React.memo(({ handleStart, handleReset }: IButtons) => {
  console.log("OKKKK")
  return (
    <Row gutter={16}>
      <Col span={12}>
        <div className="btn btn_start" onClick={handleStart}>
          Bắt đầu tính giờ
        </div>
      </Col>
      <Col span={12}>
        <div className="btn btn_stop" onClick={handleReset}>
          Kết thúc tính giờ
        </div>
      </Col>
    </Row>
  );
});

export default Buttons;
