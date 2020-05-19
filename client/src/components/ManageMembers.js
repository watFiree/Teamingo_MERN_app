import React, { useState } from 'react';
import {connect} from 'react-redux';
import { TextField, Button, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from '../styles/ManageMembers.module.scss'
import UserCard from './UserCard';
import {inviteUser} from '../redux/actions/inviteUser';


const ManageMembers = ({users,team,open, sendInvitation}) =>{
    
    const [data, setData] = useState({nickname: '', ...team})

    const handleChange = e => {
        setData({...data, nickname: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        sendInvitation(data);
    }
    
    return(

        <div className={styles.container} >
             <CloseIcon
                fontSize="large"
                onClick={() => open(false)}
                className={styles.icon}
            />
            <div className={styles.list}>
                {users.map(user =>  <UserCard data={user} teamId={team.teamId} />)}
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Typography variant="h5" gutterBottom> Invite User</Typography>
                <TextField  label="Nickname" id="nickname" variant="outlined"  required onChange={handleChange} />
                <Button type="submit" variant="contained" color="primary" size="large">Add</Button>
            </form>
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    sendInvitation: data => dispatch(inviteUser(data))
})

export default connect(null, mapDispatchToProps)(ManageMembers);