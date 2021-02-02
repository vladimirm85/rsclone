import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './style';

const GameInstruction: React.FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <ul className={classes.gameInstruction}>
      <li>
        <kbd className="light">z</kbd>
        <Typography variant="button" component="span">
          Save
        </Typography>
      </li>
      <li>
        <kbd className="light">x</kbd>
        <Typography variant="button" component="span">
          Load
        </Typography>
      </li>
      <li>
        <kbd className="light">c</kbd>
        <Typography variant="button" component="span">
          Pause
        </Typography>
      </li>
      <li>
        <kbd className="light">v</kbd>
        <Typography variant="button" component="span">
          Mute
        </Typography>
      </li>
      <li>
        <kbd className="light">b</kbd>
        <Typography variant="button" component="span">
          New game
        </Typography>
      </li>
    </ul>
  );
};

export default GameInstruction;
