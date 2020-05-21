import React, { useState, useRef } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from '../styles/ProfileAction.module.scss'
import {editUser} from '../redux/actions/editUser'

const ProfileAction = ({type,user,updateUser}) => {

    const [data, setData] = useState({type})
    const form = useRef();

    const handleChange = e => {
        setData({...data, id: user.data.id, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        form.current.reset();
        updateUser(data);
    }

    return(
        <div className={styles.container}>
            <h2>Change {type}</h2>

            <form onSubmit={handleSubmit} className={styles.form}  ref={form}>
                <TextField
                    variant="outlined"
                    required
                    name="last"
                    label={`Current ${type}`}
                    type={type}
                    id={`Current ${type}`}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    name="updated"
                    label={`New ${type}`}
                    type={type}
                    id={`New ${type}`}
                    onChange={handleChange}
                />
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