import { Icon } from '@iconify/react';
import { Avatar } from 'antd';
import { useState } from 'react';

import RaceTimeLogo from '../assets/logo-racetime-white.png';
import Clock from '../containers/clock';
import Menu from '../containers/menu';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="header">
      <div>
        <Icon
          icon="ic:round-home"
          className="fs-48 mr-25"
          onClick={() => {
            setOpenMenu(true);
          }}
          style={{ color: openMenu ? '#D1F700' : '#fff' }}
        />
        <img
          src={RaceTimeLogo}
          alt="Racetime logo"
          style={{ width: '216px', objectFit: 'contain' }}
        />
      </div>

      <div className="fs-20 font-bold">Mã thiết bị: FR001</div>

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
