import React, { useState, useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import {Context} from '../context/index'
import {getTeams} from '../redux/actions/getTeams';
import withProtection from '../hoc/withProtection';
import CreateTeam from '../components/CreateTeam';
import EditTeam from '../components/EditTeam';
import SimpleTeamCard from '../components/SimpleTeamCard';
import styles from '../styles/ManageTeamsView.module.scss';
import AddAction from '../components/AddAction';

const ManageTeamsView = ({user,teams,setTeams}) => {
    const [isCreateTeamOpen, isCreateTeamOpenChange] = useState(false)
    const [isEditTeamOpen, isEditTeamOpenChange] = useState(false)
    const [ownedTeams, setOwnedTeams] = useState({});
    const editingTeam = useContext(Context);

    useEffect(()=>{
        if(!teams.data.length) setTeams(user.teamsId);
        const filtredTeams = teams.data.filter(team =>  team.admin.id === user.data.id);
        setOwnedTeams(filtredTeams);
    },[teams.data])
    
    const handleClick = () => {
        isCreateTeamOpenChange(!isCreateTeamOpen);
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {ownedTeams.length && ownedTeams.map(team => <SimpleTeamCard key={team.name}data={team} open ={isEditTeamOpenChange} editing={isEditTeamOpen}/>)}
            </div>
            <div className={styles.actions} >
               <AddAction text="Create Team" emoji="✍🏿" onClick={handleClick} />
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