import React from 'react'
import styles from '../styles/ProfileView.module.scss'
import Action from '../components/ProfileAction'

const ProfileView = ()=>{

    return(
    <div className={styles.container}>
        <h1>Name</h1>
        <div className={styles.container__actions}>
            <Action type="nickname" />
            <Action type="email" />
            <Action type="password" />
        </div>
    </div>
    )
}

export default ProfileView;