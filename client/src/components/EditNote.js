import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { editNote } from '../redux/actions/editNote';
import styles from '../styles/NoteActionForm.module.scss';

const EditNote = ({ data, open, updateData }) => {
  const [note, setNote] = useState({ ...data });

  const handleInputChange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    open(false);
    updateData(note);
  };

  return (
    <div className={styles.container}>
      <CloseIcon
        fontSize="large"
        onClick={() => open(false)}
        className={styles.icon}
      />
      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <TextField
          onChange={handleInputChange}
          className={styles.input}
          required
          id="title"
          label="Title"
          variant="outlined"
          defaultValue={data.title}
        />
        <TextField
          onChange={handleInputChange}
          className={styles.input}
          id="coverImg"
          label="Image URL"
          variant="outlined"
          defaultValue={data.coverImg}
        />
        <TextField
          id="content"
          label="Content"
          multiline
          required
          onChange={handleInputChange}
          rows={6}
          variant="outlined"
          defaultValue={data.content}
          fullWidth
        />
        <Button
          className={styles.button}
          type="submit"
          variant="contained"
          size="large"
          color="primary"
        >
          Done
        </Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateData: (data) => dispatch(editNote(data)),
  };
};

export default connect(null, mapDispatchToProps)(EditNote);
