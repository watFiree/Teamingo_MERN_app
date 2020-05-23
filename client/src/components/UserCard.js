import React, { useState } from 'react'
import {connect} from 'react-redux';
import { Typography, Button } from '@material-ui/core'
import styles from '../styles/UserCard.module.scss'
import {removeUser} from '../redux/actions/removeUser'
import {promoteUser} from '../redux/actions/promoteUser'
import {degradeUser} from '../redux/actions/degradeUser'
import AlertDialog from './Dialog'

const UserCard = ({data,teamId,promoted,sendRemoval,makeCreator,makeMember}) => {
    
    const [dialog,setDialog] = useState(false);
    const [remove,setRemove] = useState(false);
    const user = {...data, teamId}
    const content = promoted ? `Are you sure you want to degrade this user ?  \n ${user.nickname} will not be able to create ant notes and edit them any more !` :
    `Are you sure you want to promote this user ?  \n ${user.nickname} will be able to create notes and edit them` 
    const handleRemoval = () => {
        sendRemoval(user)
    }

    const handleAgreement = () => {
        setDialog(false)
        if(promoted) makeMember(user)
        else makeCreator(user)
    }


    return(
        <div className={styles.container} >
            <Typography variant="h6" >{user.nickname}</Typography>
            <div className={styles.buttons} >
                <Button color="primary" size="small" onClick={()=>setDialog(true)} >{promoted ? "Degrade" : "Promote"}</Button>
                <Button color="secondary" size="small" onClick={() => {setDialog(true); setRemove(true)}} >Remove</Button>
                <AlertDialog open={promoted && dialog && !remove} disagreeFnc={()=>setDialog(false)} agreeFnc={handleAgreement}>
                    Are you sure you want to degrade this user ? <br/> <b>{user.nickname}</b> will not be able to create any notes and edit them any more !
                </AlertDialog>
                <AlertDialog open={!promoted && dialog && !remove} disagreeFnc={()=>setDialog(false)} agreeFnc={handleAgreement}>
                    Are you sure you want to promote this user ? <br/> <b>{user.nickname}</b> will not able to create notes and edit them !
                </AlertDialog>
                <AlertDialog open={remove && dialog} disagreeFnc={()=>setDialog(false)} agreeFnc={handleRemoval}>
                    Are you sure you want to remove <b>{user.nickname}</b> from this team ?
                </AlertDialog>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    sendRemoval: data => dispatch(removeUser(data)),
    makeCreator: data => dispatch(promoteUser(data)),
    makeMember: data => dispatch(degradeUser(data))
})

export default connect(null,mapDispatchToProps)(UserCard);