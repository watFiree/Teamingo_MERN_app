import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from '../styles/TeamsView.module.scss';
import TeamCard from '../components/TeamCard';
import withProtection from '../hoc/withProtection';
import { getTeams } from '../redux/actions/getTeams';

const TeamsView = ({ user, teams, setTeams }) => {
  useEffect(() => {
    if (user.teamsId.length) setTeams(user.teamsId);
  }, []);


  return (
    <div className={styles.grid}>
      {!user.teamsId.length && (
        <h1>
          There is any teams{' '}
          <span role="img" aria-label="upset=emoji">
            🙁
          </span>
        </h1>
      )}
      {teams.loading ? (
        <CircularProgress className={styles.loader} />
      ) : (
        teams.data.map((data) => (
          <TeamCard
            key={data.name}
            teamName={data.name}
            admin={data.admin}
            users={data.users}
            notes={data.notes}
            idLink={data._id}
          />
        ))
      )}
    </div>
  );
};

TeamsView.propTypes = {
  teams: PropTypes.objectOf().isRequired,
  setTeams: PropTypes.func.isRequired,
};

const mapStateToProps = ({ teams, user }) => ({ teams, user });

const mapDispatchToProps = (dispatch) => {
  return {
    setTeams: (teamsId) => dispatch(getTeams(teamsId)),
  };
};

export default withProtection(
  connect(mapStateToProps, mapDispatchToProps)(TeamsView),
);
