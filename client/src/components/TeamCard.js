import React from 'react';
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

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    maxWidth: 250,
  },
  media: {
    height: 140,
  },
});

const TeamCard = ({ admin, teamName, users, notes, idLink }) => {
  const classes = useStyles();

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
        <Link className={styles.link} to="teams/">
          <Button size="large" color="primary">
            Leave
          </Button>
        </Link>
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

export default TeamCard;
