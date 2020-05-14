import React, { useState, useEffect} from 'react';
import {connect} from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import {getTeams} from '../redux/actions/getTeams';
import withProtection from '../hoc/withProtection';
import CreateTeam from '../components/CreateTeam';
import SimpleTeamCard from '../components/SimpleTeamCard';

const ManageTeamsView = ({user,teams,setTeams,deleteItem}) => {
    const [isOpen, isOpenChange] = useState(false)
    const [ownedTeams, setOwnedTeams] = useState({});

    useEffect(()=>{
        if(!teams.data.length) setTeams(user.teamsId);
        const filtredTeams = teams.data.filter(team =>  team.admin.id === user.data.id);
        setOwnedTeams(filtredTeams);
    },[teams.data])
    
    const handleClick = () => {
        isOpenChange(!isOpen);
    }

    const handleDeletion = () => {
        
    }
    return (
        <>
            {ownedTeams.length && ownedTeams.map(team => <SimpleTeamCard data={team} />)}
            <Tooltip title="Add" aria-label="add" onClick={handleClick}>
                <Fab color="primary">
                    <AddIcon />
                </Fab>
            </Tooltip>
            {isOpen &&  <CreateTeam open={isOpenChange} />}
           
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