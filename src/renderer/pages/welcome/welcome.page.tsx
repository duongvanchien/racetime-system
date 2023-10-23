import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useEffect } from 'react';

import RaceTimeLogo from '../../assets/logo-racetime.png';
import { LOCALSTORAGE_USER } from '../../constants/common';
import { HOME, LOGIN } from '../../routes/path';

const WelcomePage = () => {
  const navigate = useNavigate();

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 28, color: 'green' }} spin />
  );

  useEffect(() => {
    const userData = localStorage.getItem(LOCALSTORAGE_USER);
    setTimeout(() => {
      navigate(userData ? HOME : LOGIN, { replace: true });
    }, 3000);
  }, []);

  return (
    <div className="wrapper">
      <div className="text-center mb-21">
        <img src={RaceTimeLogo} alt="Racetime logo" />
      </div>
      <div style={{ position: 'absolute', bottom: '8px' }}>
        <Spin
          indicator={antIcon}
          style={{ display: 'flex', justifyContent: 'center' }}
        />
        <div className="mt-5">Đang tải dữ liệu</div>
      </div>
    </div>
  );
};

export default WelcomePage;
