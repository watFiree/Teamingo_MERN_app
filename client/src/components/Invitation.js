import React from 'react'
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import styles from '../styles/Invitation.module.scss';
import { addUser } from '../redux/actions/addUser';
import { removeInvitation } from '../redux/actions/removeInvitation';

const Invitation = ({user,data,acceptInvitation, rejectInvitation}) => {

    const state = {userId: user.data.id, ...data}

    const handleAcceptation = () =>{
        acceptInvitation(state)
    };

    const handleRejection = () => {
        rejectInvitation(state)
    }

    return(
        <div className={styles.container}>
            <h3>{data.teamName}</h3>
                <Button color="primary" size="small" onClick={handleAcceptation} >
                    Accept
                </Button>
                <Button color="secondary" size="small" onClick={handleRejection} >
                    Reject
                </Button>
        </div>
    )
};

const mapStateToProps = ({user}) => ({user});

const mapDispatchToProps = dispatch => ({
    acceptInvitation: data => dispatch(addUser(data)),
    rejectInvitation: data => dispatch(removeInvitation(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Invitation);