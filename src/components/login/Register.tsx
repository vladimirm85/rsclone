import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type PropsType = {
  setIsLoginModal: (arg: boolean) => void;
};

const Register: React.FC<PropsType> = ({ setIsLoginModal }): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Typography component="h1" variant="h5">
        Create new player
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="off"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="off"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Register
        </Button>
        <Button size="small" onClick={() => setIsLoginModal(true)}>
          &lt;- Return to login page
        </Button>
      </form>
    </>
  );
};

export default Register;
