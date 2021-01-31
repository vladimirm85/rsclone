import React from 'react';
import { Typography } from '@material-ui/core';

const dateCreator = (date: string): JSX.Element => {
  const dateArray = date.split('T');
  const day = dateArray[0];
  const time = dateArray[1].split('.')[0];
  return (
    <>
      <Typography variant="body1" component="p">
        {day}
      </Typography>
      <Typography variant="caption" component="p">
        {time}
      </Typography>
    </>
  );
};

export default dateCreator;
