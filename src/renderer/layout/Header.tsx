import { Icon } from '@iconify/react';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';

import RaceTimeLogo from '../assets/logo-racetime-white.png';
import Clock from '../containers/clock';
import Menu from '../containers/menu';
import mqttClient from '../configs/mqtt.config';
import { MQTT_RESPONSE_TOPIC } from '../../../env';

const Header = () => {
  const user = localStorage.getItem('user');
  const [openMenu, setOpenMenu] = useState(false);
  const [readerCode, setReaderCode] = useState();

  useEffect(() => {
    mqttClient.on('message', (topic, message) => {
      if (topic === MQTT_RESPONSE_TOPIC) {
        const data: any = JSON.parse(message.toString());
        if (data.command === 'get_network') {
          setReaderCode(data.payload.hostName);
        }
      }
    });
  }, []);

  return (
    <div className="header">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Icon
          icon="ic:baseline-home"
          className="fs-44 mr-25"
          onClick={() => {
            setOpenMenu(true);
          }}
          style={{ color: openMenu ? '#D1F700' : '#fff' }}
        />
        <img
          src={RaceTimeLogo}
          alt="Racetime logo"
          style={{ width: '150px', objectFit: 'contain' }}
        />
      </div>

      <div className="fs-16 font-bold">Mã thiết bị: {readerCode}</div>

      <Clock />

      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
        <div>Trackify</div>
        <Avatar
          src="https://img.meta.com.vn/Data/image/2021/08/17/con-vit-vang-tren-fb-la-gi-trend-anh-avatar-con-vit-vang-la-gi-3.jpg"
          alt="avatar"
          size="large"
        />
      </div>
      <Menu
        open={openMenu}
        handleClose={() => {
          setOpenMenu(false);
        }}
      />
    </div>
  );
};

export default Header;
