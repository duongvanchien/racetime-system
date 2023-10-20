import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[0-9a-zA-Z]+$/, 'Vui lòng nhập tài khoản')
    .required(),
  password: yup
    .string()
    .min(8, 'Vui lòng nhập mật khẩu lớn hơn 8 kí tự')
    .max(32, 'Vui lòng nhập mật khẩu nhỏ hơn 32 kí tự')
    .required(),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: any) => {
    console.log(data);
    console.log('OK');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('../../assets/map.svg')] bg-cover bg-center">
      <div className="relative rounded-md bg-white p-5 shadow m-6 w-full max-w-lg sm:w-[480px]">
        <div className="mb-3 flex justify-center">
          <img src="/assets/icon/sentry.png" alt="" />
        </div>
        <h2 className="mb-6 mt-10 text-xl font-bold">Đăng nhập</h2>
        <form
          className="space-y-5 pb-5"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div>
            <label htmlFor="username">Tài khoản</label>
            <input
              {...register('username')}
              id="username"
              type="text"
              className="form-input rounded-[30px]"
              placeholder="Nhập tài khoản"
            />
            <p className="text-danger">
              {errors.username?.message?.toString()}
            </p>
          </div>
          <div>
            <label htmlFor="password">Mật khẩu</label>
            <div className="relative flex">
              <input
                {...register('password')}
                id="password"
                type="password"
                className="form-input rounded-[30px]"
                placeholder="Nhập mật khẩu"
              />
            </div>

            <p className="text-danger">
              {errors.password?.message?.toString()}
            </p>
          </div>
          <button
            type="submit"
            className="btn btn-primary m-auto rounded-[6px] border-none bg-[#3B3F5C] px-10"
          >
            Đăng nhập
          </button>
          <div
            className="mt-10 flex items-center justify-center"
            style={{ marginTop: '50px' }}
          >
            <span className="text-slate-950 mr-2 font-semibold">
              {' '}
              Powered by{' '}
            </span>{' '}
            <img
              src="/assets/icon/trackify-1.png"
              alt=""
              style={{ width: '200px' }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
