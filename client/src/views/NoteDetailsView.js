import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import styles from '../styles/NoteDetailsView.module.scss'
import withProtection from '../hoc/withProtection';

const NoteDetailsView = ({data,match}) => {

    const [state,setState] = useState({});

    const history = useHistory()
    useEffect(()=>{
        const currNote = data.find( x => x._id === match.params.id)
        if(currNote) setState(currNote);
        else history.push("/teams");
    },[data, history, match.params.id])
    return(
        <>
            <div className={styles.heading} >
                <Typography variant="h2" gutterBottom>
                    {state.title}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                    {state.author}
                </Typography> 
            </div>
            <Typography className={styles.content} variant="h6">
            {state.content}
            </Typography>
        </>
    )
}

const mapStateToProps = ({notes: {data} }) => ({data});

export default withProtection(connect(mapStateToProps)(NoteDetailsView));