import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { Typography, Button } from '@material-ui/core'
import styles from '../styles/ProfileView.module.scss'
import Action from '../components/ProfileAction'
import {getTeams} from '../redux/actions/getTeams'
import {deleteTeam} from '../redux/actions/deleteTeam';
import {deleteUser} from '../redux/actions/deleteUser';
import DeleteDialog from '../components/Dialog';
import withProtection from '../hoc/withProtection';

const ProfileView = ({user,teams,setTeams,deleteUsersTeam, deleteCurrentUser})=>{

    const [ownTeams, setOwnTeams] = useState([])
    const [dialog, setDialog] = useState(false);

    useEffect(()=> {
        if (user.teamsId.length && !teams.data.length) setTeams(user.teamsId);
        if(teams.data.length){
            const ownedTeams = teams.data.filter(team => team.admin.id === user.data.id ).map(item => item._id);
            setOwnTeams(ownedTeams);    
        }
    },[user,teams])

    const handleDeletion = () => {
        setDialog(false);
        ownTeams.forEach(teamId => deleteUsersTeam({teamId}));
        deleteCurrentUser({id: user.data.id});
    }

    return(
    <div className={styles.container}>
        <div className={styles.container__profile}>
            <Typography variant="h2" gutterBottom >{user.data.nickname}</Typography>
            <Typography variant="h6" gutterBottom >Subscription type : Normal </Typography>
            <Button size="large" color="secondary" onClick={()=> setDialog(true)} >Delete account</Button>
        </div>
        <div className={styles.container__actions}>
            <Action type="nickname" />
            <Action type="email" />
            <Action type="password" />
        </div>
        <DeleteDialog open={dialog} disagreeFnc={()=> setDialog(false)} agreeFnc={handleDeletion} >
            Are you sure you want to <b>DELETE</b> your account ? <br/> All teams and them notes you own will be <b>DELETED</b>
        </DeleteDialog>
    </div>
    )
}

const mapStateToProps = ({user,teams}) =>({user,teams});

const mapDispatchToProps = (dispatch) => ({
    setTeams: (teamsId) => dispatch(getTeams(teamsId)),
    deleteUsersTeam: (teamsId) => dispatch(deleteTeam(teamsId)),
    deleteCurrentUser: (id) => dispatch(deleteUser(id)),
});

export default withProtection(connect(mapStateToProps, mapDispatchToProps)(ProfileView));