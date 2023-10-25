import { Icon } from '@iconify/react';
import Table from '../../../components/table/table';

interface IAntennaTable {
  antennas: string[];
}

const AntennaTable = ({ antennas }: IAntennaTable) => {
  const columns = antennas.map((antenna, index) => ({
    title: `AN${index + 1}`,
    render: (_: any, record: any) => (
      <Icon
        icon="material-symbols:adjust-outline"
        className="fs-24"
        style={{
          color: antenna === 'connected' ? '#48742C' : '#EB3223',
        }}
      />
    ),
  }));

  return <Table columns={columns} data={[{ antennas }]} disablePagination />;
};

export default AntennaTable;
