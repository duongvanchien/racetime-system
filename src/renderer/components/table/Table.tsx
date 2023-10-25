import { Checkbox, Pagination, Select, Table as TableAnt } from 'antd';
import './table.scss';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../../constants/common';

interface ITable {
  columns: any;
  data: any;
  disablePagination?: boolean;
}

const Table = ({ columns, data, disablePagination }: ITable) => {
  const columnsConvert = columns.map((column: any) => ({
    ...column,
    key: column.title,
  }));

  return (
    <>
      <TableAnt
        columns={columnsConvert}
        dataSource={data}
        pagination={false}
        size="small"
      />
      {!disablePagination && (
        <div className="pagination_container">
          <div>
            Hiển thị
            <Select
              defaultValue={DEFAULT_PAGE_SIZE}
              options={PAGE_SIZE_OPTIONS}
              className="mr-5 ml-5"
            />
            trong tổng số {data.length} bản ghi
          </div>
          <Checkbox defaultChecked className="font-medium">
            Live Update
          </Checkbox>
          <Pagination
            defaultCurrent={1}
            total={data.length}
            pageSize={DEFAULT_PAGE_SIZE}
            current={1}
          />
        </div>
      )}
    </>
  );
};

export default Table;
