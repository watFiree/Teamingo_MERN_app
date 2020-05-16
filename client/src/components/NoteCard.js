import React, { useContext } from 'react';
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

const NoteCard = ({
  title,
  coverImg,
  author,
  content,
  teamName,
  teamColor,
  idLink,
  admin = false,
  deleteOne,
  open,
  editing,
}) => {
  const useStyles = makeStyles(() => ({
    root: {
      maxWidth: 345,
      minWidth: 345,
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
        subheader="September 14, 2016"
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
        {admin && (
          <>
            <Button
              onClick={handleEdition}
              size="large"
              color="primary"
              disabled={editing}
            >
              Edit
            </Button>
            <Button onClick={handleDeletion} size="large" color="secondary">
              Delete
            </Button>{' '}
          </>
        )}
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteOne: (data) => dispatch(deleteNote(data)),
  };
};
export default connect(null, mapDispatchToProps)(NoteCard);
