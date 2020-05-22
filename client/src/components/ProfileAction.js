import React, { useState, useEffect, useRef } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import styles from '../styles/ProfileAction.module.scss'
import {editUser} from '../redux/actions/editUser'

const ProfileAction = ({type,user,updateUser}) => {

    const [data, setData] = useState({type});
    const form = useRef();

    const handleChange = e => {
        if(type === "nickname") setData({...data, last: user.data.nickname, [e.target.name]: e.target.value})
        else setData({...data, id: user.data.id, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        form.current.reset();
        updateUser(data);
    }

    console.log(data);
    return(
        <div className={styles.container}>
            <h2>Change {type}</h2>

            <form onSubmit={handleSubmit} className={styles.form}  ref={form}>
                {type !== 'nickname' && (<TextField
                    variant="outlined"
                    required
                    name="last"
                    label={`Current ${type}`}
                    type={type}
                    id={`Current ${type}`}
                    onChange={handleChange}
                    error={user.error.message && user.error.type === type}
                />)}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    name="updated"
                    label={`New ${type}`}
                    type={type}
                    id={`New ${type}`}
                    onChange={handleChange}
                    error={user.error.message && user.error.type === type}
                />
                { (user.error.message  && user.error.type === type) && <Typography component="p" variant="subtitle1" color="secondary" >{user.error.message}</Typography>}
                <Button    
                    type="submit"
                    variant="contained"
                    color="primary"
                >Change</Button>
            </form>
        </div>
    )
};
const mapStateToProps = ({user}) => ({user});

const mapDispatchToProps = dispatch => ({
    updateUser: data => dispatch(editUser(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAction);