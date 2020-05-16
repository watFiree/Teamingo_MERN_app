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
        <>
            {ownedTeams.length && ownedTeams.map(team => <SimpleTeamCard key={team.name}data={team} open ={isEditTeamOpenChange} editing={isEditTeamOpen}/>)}
            <Tooltip title="Add" aria-label="add" onClick={handleClick}>
                <Fab color="primary">
                    <AddIcon />
                </Fab>
            </Tooltip>
            {isCreateTeamOpen &&  <CreateTeam open={isCreateTeamOpenChange} />}
            {isEditTeamOpen &&  <EditTeam open={isEditTeamOpenChange} data={editingTeam.data} />}
           
        </>
    )
}

const mapStateToProps = ({user, teams}) => ({user, teams});

const mapDispatchToProps = dispatch => {
    return {
        setTeams: data => dispatch(getTeams(data)),
    }
}
export default withProtection(connect(mapStateToProps, mapDispatchToProps)(ManageTeamsView));