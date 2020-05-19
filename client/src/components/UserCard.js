import React from 'react'
import {connect} from 'react-redux';
import { Typography, Button } from '@material-ui/core'
import styles from '../styles/UserCard.module.scss'
import {removeUser} from '../redux/actions/removeUser'
import {promoteUser} from '../redux/actions/promoteUser'

const UserCard = ({data,teamId,sendRemoval,makeAdmin}) => {
    
    const user = {...data, teamId}
    const handleRemoval = () => {
        sendRemoval(user)
    }

    const handlePromotion = () => {
        makeAdmin(user)
    }
    return(
        <div className={styles.container} >
            <Typography variant="h6" >{user.nickname}</Typography>
            <div className={styles.buttons} >
                <Button color="primary" size="small" onClick={handlePromotion} >Make admin</Button>
                <Button color="secondary" size="small" onClick={handleRemoval} >Remove</Button>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    sendRemoval: data => dispatch(removeUser(data)),
    makeAdmin: data => dispatch(promoteUser(data))
})

export default connect(null,mapDispatchToProps)(UserCard);