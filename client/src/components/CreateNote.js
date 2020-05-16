import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { createNote } from '../redux/actions/createNote';
import styles from '../styles/NoteActionForm.module.scss';

const CreateNote = ({ teamData, open, sentCreation }) => {
  const [note, setNote] = useState({
    author: '',
    teamName: '',
    teamColor: '',
    title: '',
    coverImg: '',
    content: '',
  });

  const handleInputChange = (e) => {
    setNote({ ...note, ...teamData, [e.target.id]: e.target.value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    open(false);
    sentCreation(note);
  };

  return (
    <div className={styles.container}>
      <CloseIcon
        fontSize="large"
        onClick={() => open(false)}
        className={styles.icon}
      />
      <form className={styles.form} onSubmit={handleCreate} autoComplete="off">
        <TextField
          onChange={handleInputChange}
          className={styles.input}
          id="title"
          label="Title"
          variant="outlined"
        />
        <TextField
          onChange={handleInputChange}
          className={styles.input}
          id="coverImg"
          label="Image"
          variant="outlined"
        />
        <TextField
          id="content"
          label="Content"
          multiline
          onChange={handleInputChange}
          rows={6}
          variant="outlined"
          fullWidth
        />
        <Button
          className={styles.button}
          type="submit"
          variant="contained"
          size="large"
          color="primary"
        >
          Add
        </Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    sentCreation: (data) => dispatch(createNote(data)),
  };
};

export default connect(null, mapDispatchToProps)(CreateNote);
