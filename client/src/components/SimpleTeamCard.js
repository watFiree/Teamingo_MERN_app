import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { deleteTeam } from '../redux/actions/deleteTeam';
import { Context } from '../context/index';
import styles from '../styles/SimpleTeamCard.module.scss';
import DeleteDialog from "./Dialog";

const SimpleTeamCard = ({ data, open, editing, deleteThis }) => {
  const currentDataToEdit = useContext(Context);
  const [dialog,setDialog] = useState(false)

  const handleDeletion = () => {
    deleteThis({id: data._id});
    setDialog(false);
  };

  const handleEdition = () => {
    currentDataToEdit.data = {
      id: data._id,
      name: data.name,
      color: data.color,
    };
    open(true);
  };
  return (
    <div className={styles.container}>
      <h1>{data.name}</h1>
      <div className={styles.buttons}>
        <Link className={styles.link} to={`/team/${data._id}`}>
          <Button color="primary">More</Button>
        </Link>
        <Button color="primary" disabled={editing} onClick={handleEdition}>
          Edit
        </Button>
        <Button onClick={()=>setDialog(true)} color="secondary">
          Remove
        </Button>
      </div>
      <DeleteDialog open={dialog} disagreeFnc={()=>setDialog(false)} agreeFnc={handleDeletion} >Are you sure you want to <b>DELETE</b> {data.name} team ? <br/>All notes will be also <b>DELETED</b> !</DeleteDialog>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteThis: (data) => dispatch(deleteTeam(data)),
  };
};

export default connect(null, mapDispatchToProps)(SimpleTeamCard);
