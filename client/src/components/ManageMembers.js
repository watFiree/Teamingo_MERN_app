import React, { useState, useRef } from 'react';
import {connect} from 'react-redux';
import { TextField, Button, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from '../styles/ManageMembers.module.scss'
import UserCard from './UserCard';
import {inviteUser} from '../redux/actions/inviteUser';


const ManageMembers = ({users,team, teams:{error, editing}, open, sendInvitation}) =>{
    
    const [data, setData] = useState({nickname: '', ...team})
    const form = useRef();

    const handleChange = e => {
        setData({...data, nickname: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        form.current.reset();
        sendInvitation(data);
    }

    console.log(error, editing)
    return(

        <div className={styles.container} >
             <CloseIcon
                fontSize="large"
                onClick={() => open(false)}
                className={styles.icon}
            />
            <div className={styles.list}>
                <h2 className={styles.list__header}>Members</h2>
                {users.map(user =>  <UserCard key={user.data.nickname} data={user} promoted={team.creators.some(person => person.id === user.id)} teamId={team.teamId} />)}
            </div>
            <form className={styles.form} ref={form} onSubmit={handleSubmit}>
                <Typography variant="h5" gutterBottom> Invite User</Typography>
                <TextField error={error} label="Nickname" id="nickname" variant="outlined"  required onChange={handleChange} />
                {error && <Typography component="p" variant="subtitle1" color="secondary" >
                    {error}
                </Typography>}
                <Button type="submit" variant="contained" color="primary" size="large">Add</Button>
            </form>
        </div>
    )
}

const mapStateToProps = ({teams}) => ({teams});

const mapDispatchToProps = dispatch => ({
    sendInvitation: data => dispatch(inviteUser(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageMembers);