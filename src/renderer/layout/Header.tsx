import { Icon } from '@iconify/react';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MQTT_RESPONSE_TOPIC } from '../../../env';
import RaceTimeLogo from '../assets/logo-racetime-white.png';
import mqttClient from '../configs/mqtt.config';
import Clock from '../containers/clock';
import Menu from '../containers/menu';
import { WELCOME } from '../routes/path';

const Header = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [readerCode, setReaderCode] = useState();

  const handleLogout = () => {
    localStorage.clear();
    navigate(WELCOME, { replace: true });
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            color: 'red',
          }}
          onClick={handleLogout}
        >
          <Icon icon="solar:logout-outline" className="fs-16" />
          Đăng xuất
        </div>
      ),
    },
  ];

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

      <div className="fs-14 font-bold">
        Mã thiết bị: {readerCode || 'Không có kết nối'}
      </div>

      <Clock />

      <Dropdown
        menu={{ items }}
        placement="bottomRight"
        arrow
        trigger={['click']}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <div>Trackify</div>
          <Avatar
            src="https://img.meta.com.vn/Data/image/2021/08/17/con-vit-vang-tren-fb-la-gi-trend-anh-avatar-con-vit-vang-la-gi-3.jpg"
            alt="avatar"
            size="large"
          />
        </div>
      </Dropdown>

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
