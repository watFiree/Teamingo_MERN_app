import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import NoteCard from '../components/NoteCard';
import styles from '../styles/MainView.module.scss';
import withProtection from '../hoc/withProtection';
import { getNotes } from '../redux/actions/getNotes';

const MainView = ({ user, notes, setData }) => {
  useEffect(() => {
    if (!notes.data.length && user.notesId.length) setData(user.notesId);
  }, [user.notesId]);
  const { data } = notes;

  return (
    <div className={styles.grid}>
      {!user.notesId.length && (
        <h1>
          There is any notes{' '}
          <span role="img" aria-label="upset-emoji">
            🙁
          </span>
        </h1>
      )}
      {notes.loading ? (
        <CircularProgress className={styles.loader} />
      ) : (
        data.map((item) => (
          <NoteCard
            key={item.title}
            title={item.title}
            author={item.author}
            coverImg={item.coverImg}
            content={item.content}
            teamName={item.teamName}
            teamColor={item.teamColor}
            idLink={item._id}
          />
        ))
      )}
    </div>
  );
};

MainView.propTypes = {
  setData: PropTypes.func.isRequired,
  notes: PropTypes.objectOf(
    PropTypes.array,
    PropTypes.boolean,
    PropTypes.string,
  ).isRequired,
  user: PropTypes.objectOf(PropTypes.array, PropTypes.boolean).isRequired,
};

const mapStateToProps = ({ user, notes }) => ({ user, notes });

const mapDispatchToProps = (dispatch) => {
  return {
    setData: (notesId) => {
      dispatch(getNotes(notesId));
    },
  };
};

export default withProtection(
  connect(mapStateToProps, mapDispatchToProps)(MainView),
);
