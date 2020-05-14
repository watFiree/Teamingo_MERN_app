import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import styles from '../styles/Link.module.scss';
import {authUser} from '../redux/actions/authUser';

const SignInView = ({setAuth}) => {
  const history = useHistory();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    if (e.target.id === 'nickname') setNickname(e.target.value);
    if (e.target.id === 'password') setPassword(e.target.value);
  };
  const handleAuthenticate = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:6969/auth/signin', {
        nickname,
        password,
      }).then(res => {
        if(res.status === 200){
          console.log(res.data)
          setAuth(res.data);
          history.push('/')
        }else{
          setError(true)
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
          Sign in
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/pass" className={styles.link}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" className={styles.link}>
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

SignInView.propTypes = {
  setData: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  setAuth : data => dispatch(authUser(data)),
})

export default connect(null, mapDispatchToProps)(SignInView);
