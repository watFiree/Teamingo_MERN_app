import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import NoteIcon from '@material-ui/icons/Note';
import ListItemText from '@material-ui/core/ListItemText';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from '../styles/Link.module.scss';
import {leaveTeam} from '../redux/actions/leaveTeam';
import {deleteTeam} from '../redux/actions/deleteTeam';
import AlertDialog from './Dialog';

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    maxWidth: 250,
  },
  media: {
    height: 140,
  },
});

const TeamCard = ({ admin, teamName, users, notes, idLink, user, leaveFunction,deleteFunction}) => {
  
  const classes = useStyles();
  const isAdmin = admin.nickname === user.data.nickname;
  const [dialog,setDialog] = useState(false);

  const handleLeave = () => {
    setDialog(false);
    const data = {id: user.data.id, teamId: idLink}
    if(isAdmin)deleteFunction(data)
    else leaveFunction(data)
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h4" component="h4">
          {teamName}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {admin.nickname}
        </Typography>
      </CardContent>
      <List disablePadding="true">
        <ListItem>
          <ListItemIcon>
            <SupervisorAccountIcon color="primary" fontSize="large" />
          </ListItemIcon>
          <ListItemText primary={`Members: ${users.length}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <NoteIcon color="primary" fontSize="large" />
          </ListItemIcon>
          <ListItemText primary={`Notes: ${notes.length}`} />
        </ListItem>
      </List>
      <CardActions>
        <Link className={styles.link} to={`team/${idLink}`}>
          <Button size="large" color="primary">
            See more
          </Button>
        </Link>
          <Button size="large" color="secondary" onClick={()=>setDialog(true)} >
            {isAdmin ? "Delete" : "Leave"}
          </Button>
        <AlertDialog open={isAdmin && dialog} disagreeFnc={()=>setDialog(false)} agreeFnc={handleLeave}>
          Are you sure you want to <b>DELETE</b> {teamName} team ? <br/>All notes will be also <b>DELETED</b> !
        </AlertDialog>
        <AlertDialog open={!isAdmin && dialog} disagreeFnc={()=>setDialog(false)} agreeFnc={handleLeave}>
          Are you sure you want to <b>LEAVE</b> {teamName} team ? <br/> You will <b>not</b> have access to any notes !
        </AlertDialog>
      </CardActions>
    </Card>
  );
};

TeamCard.propTypes = {
  admin: PropTypes.objectOf().isRequired,
  teamName: PropTypes.string.isRequired,
  idLink: PropTypes.string.isRequired,
  users: PropTypes.arrayOf().isRequired,
  notes: PropTypes.objectOf().isRequired,
};

const mapStateToProps = ({user}) => ({user});

const mapDispatchToProps = dispatch => ({
    leaveFunction: data => dispatch(leaveTeam(data)),
    deleteFunction: data => dispatch(deleteTeam(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamCard);
