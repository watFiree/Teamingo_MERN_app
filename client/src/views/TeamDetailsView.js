import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NoteIcon from '@material-ui/icons/Note';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Divider from '@material-ui/core/Divider';
import withProtection from '../hoc/withProtection';
import styles from '../styles/TeamDetailsView.module.scss'
import NoteCard from '../components/NoteCard';
import CreateNote from '../components/CreateNote'

const TeamDetailsView = ({match,data:teams,notes}) => {

    const [data, setData] = useState({admin: {nickname: ' '}, name: ' ' , color: ' ', notes:[], users:[]})
    const [isOpen, isOpenChange] = useState(false)
    const [items, setItems] = useState([])


    const history = useHistory()

    useEffect(()=>{
        const team = teams.filter(item => item._id === match.params.id)[0];
        if(!team) history.push("/teams");
        setData(team);
        const filtredNotes = notes.data.filter(note => team.notes.includes(note._id))
        setItems(filtredNotes)
    },[teams,notes.data,match.params.id]) 

    const handleClick = () => {
        isOpenChange(!isOpen);
    }
    
    return(
        <div className={styles.container}>
            <h1 className={styles.header}>{data.name}</h1>
            <div className={styles.info}>
                <List className={styles.info}>
                    <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                            <SupervisorAccountIcon color="primary"/>
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Users" secondary={data.users.length} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem >
                        <ListItemAvatar   >
                        <Avatar>
                            <NoteIcon color="primary"/>
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Notes" secondary={data.notes.length} />
                    </ListItem>
            </List>
            <Tooltip title="Add" aria-label="add" onClick={handleClick}>
                <Fab color="primary">
                    <AddIcon />
                </Fab>
            </Tooltip>
        </div>
        <div className={styles.notes}>

        {items.length ? items.map(item => 
        <NoteCard
            admin
            key={item.title}
            title={item.title}
            author={item.author}
            coverImg={item.coverImg}
            content={item.content}
            teamName={item.teamName}
            teamColor={item.teamColor}
            idLink={item._id}
          />) : <h1>There is any notes <span role='img' aria-label='upset-emoji'>🙁</span></h1>}

        </div>
            {isOpen && (<CreateNote close={isOpenChange} teamData={{author: data.admin.nickname, teamName: data.name,  teamColor: data.color}} />)}
      </div>
    )
};

const mapStateToProps = ({teams:{data},notes}) => ({data,notes});

export default withProtection(connect(mapStateToProps)(TeamDetailsView));