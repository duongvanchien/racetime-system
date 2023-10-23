import { Col, Row } from 'antd';
import React from 'react';

interface IButtons {
  isRunning: boolean;
  handleStart: () => void;
  handleStop: () => void;
}

const Buttons = React.memo(
  ({ isRunning, handleStart, handleStop }: IButtons) => {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <div
            className={`btn btn_start ${isRunning && 'btn_disable'}`}
            onClick={() => {
              !isRunning && handleStart();
            }}
          >
            Bắt đầu tính giờ
          </div>
        </Col>
        <Col span={12}>
          <div
            className={`btn btn_stop ${!isRunning && 'btn_disable'}`}
            onClick={() => {
              isRunning && handleStop();
            }}
          >
            Kết thúc tính giờ
          </div>
        </Col>
      </Row>
    );
  },
);

export default Buttons;
