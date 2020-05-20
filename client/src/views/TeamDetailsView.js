import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NoteIcon from '@material-ui/icons/Note';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Divider from '@material-ui/core/Divider';
import { Context } from '../context/index';
import withProtection from '../hoc/withProtection';
import styles from '../styles/TeamDetailsView.module.scss';
import NoteCard from '../components/NoteCard';
import CreateNote from '../components/CreateNote';
import EditNote from '../components/EditNote';
import AddAction from '../components/AddAction';
import ManageMembers from '../components/ManageMembers';

const TeamDetailsView = ({ match, data: teams, notes, user }) => {
  const [data, setData] = useState({
    admin: { nickname: '', id: '' },
    name: '',
    color: '',
    creators: [],
    notes: [],
    users: [],
  });
  const [isCreateNoteOpen, isCreateNoteOpenChange] = useState(false);
  const [isEditNoteOpen, isEditNoteOpenChange] = useState(false);
  const [isManageMembersOpen, isManageMembersOpenChange] = useState(false);
  const [items, setItems] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [creator, setCreator] = useState(false);
  const editingNote = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    const team = teams.filter((item) => item._id === match.params.id)[0];
    if (!team) history.push('/teams');
    setData(team);
    const filtredNotes = notes.data.filter((note) =>
      team.notes.includes(note._id),
    );
    setItems(filtredNotes);
    if (user.data.id === data.admin.id) setAdmin(true);
    if (data.creators.some(person => person.id === user.data.id)) setCreator(true);
  }, [teams, notes.data, match.params.id, user, data]);

  const handleOpenCreateNote = () => {
    isCreateNoteOpenChange(!isCreateNoteOpen);
  };

  const handleOpenManageMembers = () => {
    isManageMembersOpenChange(!isManageMembersOpen);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{data.name}</h1>
      <div className={styles.heading}>
        <List className={styles.info}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <SupervisorAccountIcon color="primary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Users" secondary={data.users.length} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <NoteIcon color="primary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Notes" secondary={data.notes.length} />
          </ListItem>
        </List>
        
          <div className={styles.actions__wrapper}>
          {( admin || creator ) && (
            <AddAction
              text="Create note "
              emoji="✍🏻"
              onClick={handleOpenCreateNote}
            /> )}
            {admin && (
            <AddAction 
              text="Manage Members " 
              emoji="👨‍👨‍👧‍👦" 
              onClick={handleOpenManageMembers}
              />)}
          </div>
        
      </div>
      <div className={styles.notes}>
        {items.length ? (
          items.map((item) => (
            <NoteCard
              admin={admin}
              creator = {creator}
              key={item.title}
              title={item.title}
              author={item.author}
              coverImg={item.coverImg}
              content={item.content}
              teamName={item.teamName}
              teamColor={item.teamColor}
              idLink={item._id}
              open={isEditNoteOpenChange}
              editing={isEditNoteOpen}
            />
          ))
        ) : (
          <h1>
            There is any notes{' '}
            <span role="img" aria-label="upset-emoji">
              🙁
            </span>
          </h1>
        )}
      </div>
      {isCreateNoteOpen && (
        <CreateNote
          open={isCreateNoteOpenChange}
          teamData={{
            author: user.data.nickname,
            teamName: data.name,
            teamColor: data.color,
          }}
        />
      )}
      {isEditNoteOpen && (
        <EditNote open={isEditNoteOpenChange} data={editingNote.data} />
      )}

      {isManageMembersOpen && (<ManageMembers users={data.users.filter(item => item.id !== user.data.id) /* fliltring members without current user */} team={{teamId:data._id , teamName: data.name, creators: data.creators}} open={isManageMembersOpenChange} />)}
    </div>
  );
};

const mapStateToProps = ({ teams: { data }, notes, user }) => ({
  data,
  notes,
  user,
});

export default withProtection(connect(mapStateToProps)(TeamDetailsView));
