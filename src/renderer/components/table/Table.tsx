import { Checkbox, Pagination, Select, Table as TableAnt } from 'antd';
import './table.scss';
import {
  DEFAULT_PAGE_SIZE,
  IPagination,
  PAGE_SIZE_OPTIONS,
} from '../../constants/common';

interface ITable {
  columns: any;
  data: any;
  totalData: any;
  disablePagination?: boolean;
  pagination?: IPagination;
  handleChangePage?: (page: number) => void;
  handleChangePageSize?: (pageSize: number) => void;
}

const Table = ({
  columns,
  data,
  totalData,
  disablePagination,
  pagination,
  handleChangePage,
  handleChangePageSize,
}: ITable) => {
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
          {totalData.length > 0 && (
            <div>
              Hiển thị
              <Select
                defaultValue={pagination?.pageSize || DEFAULT_PAGE_SIZE}
                options={PAGE_SIZE_OPTIONS}
                className="mr-5 ml-5"
                onChange={handleChangePageSize}
              />
              trong tổng số {totalData.length} bản ghi
            </div>
          )}
          <Checkbox defaultChecked className="font-medium">
            Live Update
          </Checkbox>
          {totalData.length > 0 && (
            <Pagination
              current={pagination?.currentPage || 1}
              total={totalData.length}
              pageSize={pagination?.pageSize}
              onChange={handleChangePage}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Table;
