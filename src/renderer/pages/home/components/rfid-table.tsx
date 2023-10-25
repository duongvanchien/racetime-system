import { Icon } from '@iconify/react';

import Table from '../../../components/table/table';

interface IRfidTable {
  isActive: boolean;
  isAccessInternet: boolean;
  readerCode?: string;
}

const RfidTable = ({ isActive, isAccessInternet, readerCode }: IRfidTable) => {
  const columns = [
    {
      title: 'Mã thiết bị',
      render: (_: any, record: any) => (
        <div>{record?.readerCode || 'Không tìm thấy đầu đọc'}</div>
      ),
    },
    {
      title: 'Hoạt động',
      render: (_: any, record: any) => (
        <Icon
          icon="material-symbols:adjust-outline"
          className="fs-24"
          style={{ color: record?.isActive ? '#48742C' : '#EB3223' }}
        />
      ),
    },
    {
      title: 'Kết nối Internet',
      render: (_: any, record: any) => (
        <Icon
          icon="material-symbols:adjust-outline"
          className="fs-24"
          style={{ color: record?.isAccessInternet ? '#48742C' : '#EB3223' }}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={[
        {
          isActive,
          isAccessInternet,
          readerCode,
        },
      ]}
      disablePagination
    />
  );
};

export default RfidTable;
