import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { createTeam } from '../redux/actions/createTeam';
import styles from '../styles/TeamActionForm.module.scss';

const CreateNote = ({ user,createFunction, open }) => {

  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const [data, setData] = useState({ color });
  const form = useRef()

  const handleCreate = (e) => {
    e.preventDefault();
    form.current.reset();
    createFunction(data);
    open(false);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      admin: { nickname: user.data.nickname, id: user.data.id },
      users: [{ nickname: user.data.nickname, id: user.data.id }],
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <CloseIcon
        fontSize="large"
        onClick={() => open(false)}
        className={styles.icon}
      />
      <h1>
        Only team name needed to create team, so easy{' '}
        <span role="img" aria-label="heart-emoji">
          ❤️
        </span>{' '}
      </h1>
      <form className={styles.form} ref={form} onSubmit={handleCreate} autoComplete="off">
        <TextField onChange={handleChange} label="Team name" id="name" variant="outlined" />
        <Button type="submit" variant="contained" color="primary">
          {' '}
          create
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ user}) => ({ user});

const mapDispatchToProps = (dispatch) => {
  return {
    createFunction: (data) => dispatch(createTeam(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNote);
