/* eslint-disable react/prefer-stateless-function */
import React, { useEffect } from 'react';
import axios from 'axios'
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { refreshData } from '../redux/actions/refreshData';

const withProtection = (WrappedComponent) => ({ user, match, updateUsersData }) => {

  const { authenticated } = user;

  useEffect(()=>{
    if(authenticated) updateUsersData(user.data.id)
  },[match])
  
  return (
    <>
      {!authenticated && <Redirect to="/signin" />}
      <Header />
      <WrappedComponent match={match} />
    </>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  updateUsersData: id => dispatch(refreshData(id))
}) 

const composedHOC = compose(connect(mapStateToProps, mapDispatchToProps), withProtection);
export default composedHOC;
