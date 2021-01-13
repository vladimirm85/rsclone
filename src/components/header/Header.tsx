import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'block',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingLeft: '20px',
    paddingRight: '20px',
    margin: '0 auto',
    maxWidth: '1100px',
  },
}));

const Header: React.FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar className={classes.container} disableGutters>
        <Typography variant="h4" className={classes.title}>
          BallBouncer
        </Typography>
        <ButtonGroup
          variant="text"
          color="inherit"
          size="large"
          aria-label="text primary button group"
        >
          <Button>About</Button>
          <Button>Score</Button>
          <Button>Login</Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
