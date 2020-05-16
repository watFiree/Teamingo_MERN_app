/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';

const withProtection = (WrappedComponent) => ({ user, match }) => {
  const { authenticated } = user;
  return (
    <>
      {!authenticated && <Redirect to="/signin" />}
      <Header />
      <WrappedComponent match={match} />
    </>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const composedHOC = compose(connect(mapStateToProps), withProtection);
export default composedHOC;
