import { Col, Drawer, Row } from 'antd';
import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from 'react-router-dom';

import './container.scss';
import {
  CHIP_READ,
  DEVICE_SETTING,
  FILES_MANAGEMENT,
  HOME,
  IMPORT_FILE_MAPPING,
} from '../routes/path';

interface IMenu {
  open: boolean;
  handleClose: () => void;
}

interface IMenuItem {
  nameIcon: string;
  title: string;
  route: string;
}

const MenuItem = ({ nameIcon, title, route }: IMenuItem) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      onClick={() => {
        navigate(route, { replace: true });
      }}
      className="menu_item"
      style={{ color: location.pathname === route ? '#D1F700' : '#fff' }}
    >
      <Icon icon={nameIcon} className="fs-36" />
      <div className="font-bold">{title}</div>
    </div>
  );
};

const Menu = ({ open, handleClose }: IMenu) => {
  return (
    <Drawer
      placement="left"
      width="100%"
      onClose={handleClose}
      open={open}
      className="menu"
      closable={false}
    >
      <Icon
        icon="ph:x-thin"
        className="fs-36"
        style={{ position: 'absolute', right: '3%' }}
        onClick={handleClose}
      />
      <div className="fs-28 text-center font-bold" style={{ color: '#D1F700' }}>
        MENU
      </div>

      <Row
        className="mt-30"
        gutter={32}
        style={{ width: '80%', margin: 'auto' }}
      >
        <Col span={12}>
          <MenuItem
            nameIcon="pepicons-pop:countdown"
            title="MÀN HÌNH RACETIME"
            route={HOME}
          />
        </Col>
        <Col span={12}>
          <MenuItem
            nameIcon="foundation:list-number"
            title="CHIP READS"
            route={CHIP_READ}
          />
        </Col>

        <Col span={12}>
          <MenuItem
            nameIcon="basil:file-upload-outline"
            title="IMPORT FILE MAPPING"
            route={IMPORT_FILE_MAPPING}
          />
        </Col>
        <Col span={12}>
          <MenuItem
            nameIcon="ant-design:setting-filled"
            title="CẤU HÌNH THIẾT BỊ"
            route={DEVICE_SETTING}
          />
        </Col>

        <Col span={12}>
          <MenuItem
            nameIcon="ph:files-bold"
            title="QUẢN LÝ FILE KẾT QUẢ"
            route={FILES_MANAGEMENT}
          />
        </Col>
        <Col span={12}></Col>
      </Row>
    </Drawer>
  );
};

export default Menu;
