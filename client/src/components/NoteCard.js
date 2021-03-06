import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CardWrapper from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Context } from '../context/index';
import styles from '../styles/Link.module.scss';
import { deleteNote } from '../redux/actions/deleteNote';
import DeleteDialog from './Dialog';

const NoteCard = ({title,coverImg,author,content,teamName,teamColor,idLink,date,admin = false,creator=false,deleteOne,open,editing,user}) => {

  const [edit, setEdit] = useState(false);
  const [dialog,setDialog] = useState(false);

  useEffect(()=>{
    if(user.data.nickname === author && creator) setEdit(true)
  },[user])
  const useStyles = makeStyles(() => ({
    root: {
      maxWidth: 345,
      minWidth: 345,
      ['@media (max-width:350px)']: {
        minWidth: 300,
      }
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: teamColor,
    },
  }));
  const classes = useStyles();

  const currentDataToEdit = useContext(Context);

  const handleDeletion = () => {
    deleteOne({ id: idLink, teamName });
    setDialog(false)
  };

  const handleEdition = () => {
    currentDataToEdit.data = { id: idLink, title, coverImg, content };
    open(true);
  };

  return (
    <CardWrapper variant="outlined" className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {teamName[0].toUpperCase()}
          </Avatar>
        }
        title={author}
        subheader={new Date(date).toString().slice(3,21)}
      />
      <CardMedia className={classes.media} image={coverImg} title={teamName} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" noWrap>
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Link className={styles.link} to={`/note/${idLink}`}>
          <Button size="large" color="primary">
            Learn More
          </Button>
        </Link>
        {(admin || edit )&& (
          <>
            <Button
              onClick={handleEdition}
              size="large"
              color="primary"
              disabled={editing}
            >
              Edit
            </Button>
            <Button onClick={()=> setDialog(true)} size="large" color="secondary">
              Delete
            </Button>{' '}
          </>
        )}
        <DeleteDialog open={dialog} disagreeFnc={()=>setDialog(false)} agreeFnc={handleDeletion}>Are you sure you want to <b>DELETE</b> this note ?</DeleteDialog>
      </CardActions>
    </CardWrapper>
  );
};

NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  teamColor: PropTypes.string.isRequired,
  idLink: PropTypes.string.isRequired,
  admin: PropTypes.string.isRequired,
};

const mapStateToProps = ({user}) => ({user});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteOne: (data) => dispatch(deleteNote(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteCard);
