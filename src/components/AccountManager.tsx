import React from 'react';
import { IconButton, ListItemAvatar, ListItem, ListItemText } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import User from '../classes/User';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useHistory } from "react-router-dom";

const AccountManager: React.FC = () => {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openUserMenu, setOpenUserMenu] = React.useState(false);
    const fakeLoggedUser = new User(4,
        "eve.holt@reqres.in",
        "Eve",
        "Holt",
        "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg");

    function handleMenu(event: any) {
        console.log(event.currentTarget);
        setOpenUserMenu(true);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setOpenUserMenu(false);
        setAnchorEl(null);
    };

    function handleLogout() {
        localStorage.removeItem('token');
        history.push('/login');
    }

    return (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <Avatar alt='Eve Holt' src='https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg' />
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
                open={openUserMenu}
                onClose={handleClose}
            >
                <div></div>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt={fakeLoggedUser.first_name} src={fakeLoggedUser.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={fakeLoggedUser.first_name + ' ' + fakeLoggedUser.last_name} secondary={fakeLoggedUser.email} />
                </ListItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default AccountManager;
