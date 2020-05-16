import React, { useState } from 'react';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { editTeam } from '../redux/actions/editTeam';
import styles from '../styles/TeamActionForm.module.scss';

const EditTeam = ({ data, open, updateData }) => {
  const [team, setTeam] = useState({ ...data });
  const [visibility, setVisibility] = useState(false);

  const handleChange = (e) => {
    setTeam({ ...team, [e.target.id]: e.target.value });
  };

  const handleTeamColor = (color) => setTeam({ ...team, color: color.hex });

  const handleSubmit = (e) => {
    e.preventDefault();
    open(false);
    updateData(team);
  };

  return (
    <div className={styles.container}>
      <CloseIcon
        fontSize="large"
        onClick={() => open(false)}
        className={styles.icon}
      />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <TextField
            onChange={handleChange}
            label="Team name"
            id="name"
            defaultValue={data.name}
          />
          <Button onClick={() => setVisibility(!visibility)}>Pick color</Button>
          {visibility && (
            <ChromePicker
              className={styles.picker}
              color={team.color}
              onChange={handleTeamColor}
            />
          )}
        </div>
        <Button type="submit" variant="contained" color="primary">
          Done
        </Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateData: (data) => dispatch(editTeam(data)),
  };
};

export default connect(null, mapDispatchToProps)(EditTeam);
