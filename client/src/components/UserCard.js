import React from 'react'
import {connect} from 'react-redux';
import { Typography, Button } from '@material-ui/core'
import styles from '../styles/UserCard.module.scss'
import {removeUser} from '../redux/actions/removeUser'
import {promoteUser} from '../redux/actions/promoteUser'
import {degradeUser} from '../redux/actions/degradeUser'

const UserCard = ({data,teamId,promoted,sendRemoval,makeCreator,makeMember}) => {
    
    const user = {...data, teamId}
    const handleRemoval = () => {
        sendRemoval(user)
    }

    const handlePromotion = () => {
        makeCreator(user)
    }

    const handleDegradation = () => {
        makeMember(user)
    }

    console.log(promoted)
    return(
        <div className={styles.container} >
            <Typography variant="h6" >{user.nickname}</Typography>
            <div className={styles.buttons} >
                {promoted ?  <Button color="primary" size="small" onClick={handleDegradation} >Degrade</Button> : <Button color="primary" size="small" onClick={handlePromotion} >promote</Button>}
                <Button color="secondary" size="small" onClick={handleRemoval} >Remove</Button>
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