import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import { authUser, userLogout } from '../redux/actions/authUser';
import styles from '../styles/Header.module.scss';

const Header = ({ setAuth, logout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  };

  return (
    <div className={styles.wrapper}>
      <Typography variant="h4" component="h2">
        Teamingo
      </Typography>
      <ul className={styles.navigation}>
        <Link className={styles.link} to="/">
          Home
        </Link>
        <Link className={styles.link} to="/teams">
          Teams
        </Link>
        <Link className={styles.link} to="/subscription">
          Subscripton
        </Link>
      </ul>
      <div>
        <IconButton
          className={styles.accountIcon}
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="primary"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <Link to="/profile" className={styles.link} >
            <MenuItem  className={styles.link} onClick={handleClose}>
              Profile
            </MenuItem>
          </Link>
          <Link to="/profile/teams" className={styles.link}>
            <MenuItem>Your Teams</MenuItem>
          </Link>
          <MenuItem className={styles.link} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

Header.propTypes = {
  setAuth: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setAuth: (isAuth) => dispatch(authUser(isAuth)),
  logout: () => dispatch(userLogout()),
});

export default connect(null, mapDispatchToProps)(Header);
