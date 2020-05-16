/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import styles from '../styles/Link.module.scss';
import { authUser } from '../redux/actions/authUser';

const SignUpView = ({ setAuth }) => {
  const history = useHistory();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    if (e.target.id === 'nickname') setNickname(e.target.value);
    if (e.target.id === 'email') setEmail(e.target.value);
    if (e.target.id === 'password') setPassword(e.target.value);
  };
  const handleAuthenticate = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:6969/auth/signup', {
        nickname,
        email,
        password,
      })
      .then((res) => {
        if (res.status === 201) {
          setAuth(true);
          history.push('/');
        } else {
          setAuth(false);
          setError(true);
        }
      })
      .catch(() => setError(true));
  };
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    link: {
      color: theme.palette.main,
    },
  }));

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleAuthenticate}
          method="post"
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={error}
            onChange={handleChange}
            name="nickname"
            type="text"
            id="nickname"
            label="Nickname"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={error}
            onChange={handleChange}
            name="email"
            type="email"
            id="email"
            label="E-mail"
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
            error={error}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link to="/signin" className={styles.link}>
                Do you have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

SignUpView.propTypes = {
  setAuth: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setAuth: (isAuth) => dispatch(authUser(isAuth)),
});

export default connect(null, mapDispatchToProps)(SignUpView);
