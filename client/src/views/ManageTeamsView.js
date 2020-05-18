import React, { useState, useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import {Context} from '../context/index'
import {getTeams} from '../redux/actions/getTeams';
import withProtection from '../hoc/withProtection';
import CreateTeam from '../components/CreateTeam';
import EditTeam from '../components/EditTeam';
import SimpleTeamCard from '../components/SimpleTeamCard';
import styles from '../styles/ManageTeamsView.module.scss';
import AddAction from '../components/AddAction';
import Invitation from '../components/Invitation';

const ManageTeamsView = ({user,teams,setTeams}) => {
    const [isCreateTeamOpen, isCreateTeamOpenChange] = useState(false)
    const [isEditTeamOpen, isEditTeamOpenChange] = useState(false)
    const [ownedTeams, setOwnedTeams] = useState({});
    const editingTeam = useContext(Context);

    useEffect(()=>{
        if(!teams.data.length && user.teamsId.length) setTeams(user.teamsId);
        const filtredTeams = teams.data.filter(team =>  team.admin.id === user.data.id);
        setOwnedTeams(filtredTeams);
    },[teams.data])
    
    const handleClick = () => {
        isCreateTeamOpenChange(!isCreateTeamOpen);
    }
    console.log(ownedTeams)
    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {ownedTeams.length ? 
                ownedTeams.map(team => <SimpleTeamCard key={team.name}data={team} open ={isEditTeamOpenChange} editing={isEditTeamOpen}/>) : 
                <h1>
                    Create your team{' '}
                    <span role="img" aria-label="upset-emoji">
                    ➡️
                    </span>
                </h1>}
            </div>
            <div className={styles.actions} >
               <AddAction text="Create Team" emoji="✍🏿" onClick={handleClick} />
                <div className={styles.invitations}>
                    <h2>Invitations</h2>
                    {user.invitations.map( item => <Invitation data={item} />)}
                </div>
                
               
            </div>
            

            {isCreateTeamOpen &&  <CreateTeam open={isCreateTeamOpenChange} />}
            {isEditTeamOpen &&  <EditTeam open={isEditTeamOpenChange} data={editingTeam.data} />}
           
        </div>
    )
}

const mapStateToProps = ({user, teams}) => ({user, teams});

const mapDispatchToProps = dispatch => {
    return {
        setTeams: data => dispatch(getTeams(data)),
    }
}
export default withProtection(connect(mapStateToProps, mapDispatchToProps)(ManageTeamsView));