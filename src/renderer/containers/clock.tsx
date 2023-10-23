import moment from 'moment';
import { useEffect, useState } from 'react';

const Clock = () => {
  const [now, setNow] = useState<any>();

  useEffect(() => {
    setInterval(() => setNow(moment()), 1000);
  }, []);

  return (
    <div>
      <div>{now?.format('DD/MM/YYYY HH:mm A') || "--/--/-- --:--"}</div>
      <div>{now?.toString().split(' ').slice(-1) || "GMT+0700"}, Hà Nội, Việt Nam</div>
    </div>
  );
};

export default Clock;
