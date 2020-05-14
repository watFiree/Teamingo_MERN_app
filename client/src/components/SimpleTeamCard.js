import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {deleteNote} from '../redux/actions/deleteNote';
import {deleteTeam} from '../redux/actions/deleteTeam';
import styles from '../styles/SimpleTeamCard.module.scss'

const SimpleTeamCard = ({data,deleteItem,deleteThis}) => {
    console.log(data)

    const handleDeletion = () =>{
        deleteThis({id: data._id, notes: data.notes})
    }
    return(
        <div className={styles.container} >
            <h1>{data.name}</h1>
            <div className={styles.buttons}>
                <Link className={styles.link} to={`/team/${data._id}`}><Button color="primary" >More</Button></Link>
                <Button color="primary" >Add User</Button>
                <Button onClick={handleDeletion} color='secondary' >Remove</Button>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteItem: data => dispatch(deleteNote(data)),
        deleteThis: data => dispatch(deleteTeam(data))
    }
};

export default connect(null,mapDispatchToProps)(SimpleTeamCard);