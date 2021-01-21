import React, { useEffect, useState } from 'react';
import { notification } from 'antd';

const Notification: React.FC = (): JSX.Element => {
  const [api, contextHolder] = notification.useNotification();
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    if (!isShow) {
      setTimeout(() => {
        api.info({
          message: 'Notification',
          description: 'Hello, bamboleylo!',
          duration: 10,
          placement: 'bottomRight',
        });
      }, 3000);
      setShow(true);
    }
  }, [api, isShow]);

  return <>{contextHolder}</>;
};

export default Notification;
