import React from 'react'
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import styles from '../styles/TeamDetailsView.module.scss';

const AddAction = ({text, emoji, onClick}) => {
    return(
        <div className={styles.action}>
            <Typography gutterBottom variant="h5">{text}{emoji && <span role="img" aria-label="emoji">{emoji}</span>}</Typography>
            <Tooltip title="Add" aria-label="add" onClick={onClick}>
                <Fab color="primary">
                    <AddIcon />
                </Fab>
            </Tooltip>
        </div>
    )
};

export default AddAction;