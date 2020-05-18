import React from 'react'
import { Typography, Button } from '@material-ui/core'
import styles from '../styles/UserCard.module.scss'

const UserCard = ({data}) => {
    return(
        <div className={styles.container} >
            <Typography variant="h6" >{data.nickname}</Typography>
            <div className={styles.buttons} >
                <Button color="primary" size="small" >Make admin</Button>
                <Button color="secondary" size="small">Remove</Button>
            </div>
        </div>
    )
};

export default UserCard;