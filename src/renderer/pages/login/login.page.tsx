import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import RaceTimeLogo from '../../assets/logo-racetime.png';
import TrackifyLogo from '../../assets/logo-trackify.png';
import { HOME } from '../../routes/path';
import './login.scss';

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = (dataForm: any) => {
    localStorage.setItem(
      'user',
      JSON.stringify({ username: dataForm.username }),
    );
    navigate(HOME, { replace: true });
  };

  const onFinishFailed = (dataForm: any) => {
    console.log('Failed:', dataForm);
  };

  return (
    <div className="wrapper">
      <div className="box box_signin">
        <div className="text-center mb-21">
          <img src={RaceTimeLogo} alt="Racetime logo" />
        </div>
        <h2 className="mb-36 text-center">Đăng nhập</h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="font-medium mb-3">Tài khoản</div>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản' }]}
          >
            <Input placeholder="Nhập tài khoản" />
          </Form.Item>

          <div className="font-medium mb-3">Mật khẩu</div>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <div className="text-center mt-24">
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: '189px',
                height: '40px',
                background: '#3B3F5C',
                boxShadow: '0px 10px 20px -10px #3B3F5C',
              }}
            >
              Đăng nhập
            </Button>
          </div>

          <div
            className="mt-24"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="mr-12 font-medium fs-12">Powered by</div>
            <img
              src={TrackifyLogo}
              alt="Trackify logo"
              style={{ width: '150px', objectFit: 'contain' }}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
