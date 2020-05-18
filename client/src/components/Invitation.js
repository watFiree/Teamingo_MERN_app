import React from 'react'
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import styles from '../styles/Invitation.module.scss';
import { addUser } from '../redux/actions/addUser';

const Invitation = ({user,data,acceptInvitation}) => {

    const state = {userId: user.data.id, ...data}

    const handleAcceptation = () =>{
        console.log({userId: user.data.id, ...data});
        acceptInvitation(state)
    };

    return(
        <div className={styles.container}>
            <h3>{data.teamName}</h3>
                <Button color="primary" size="small" onClick={handleAcceptation} >
                    Accept
                </Button>
                <Button color="secondary" size="small" >
                    Reject
                </Button>
        </div>
    )
};

const mapStateToProps = ({user}) => ({user});

const mapDispatchToProps = dispatch => ({
    acceptInvitation: data => dispatch(addUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Invitation);