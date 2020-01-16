import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import UsersApiHelper from '../apiHelpers/UsersApiHelper';
import User from '../classes/User';
import ContactDetails from './ContactDetails';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const StyledToggleButtonGroup = withStyles(theme => ({
    grouped: {
        margin: theme.spacing(0.5),
        border: 'none',
        padding: theme.spacing(0, 1),
        '&:not(:first-child)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-child': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}))(ToggleButtonGroup);

const ContactList: React.FC = () => {
    const classes = useStyles();

    const [pageNumber, setPageNumber] = useState(1);
    const [openBackdrop, setOpenBackdrop] = useState(true);
    const [totalPageNumber, setTotalPageNumber] = useState(1);
    const [contacts, setContacts] = useState(new Array<User>());
    const [selectedContact, setSelectedContact] = useState(new User(0, '', '', '', ''));
    const [openContactDialog, setOpenContactDialog] = React.useState(false);

    function showContactDetail(contact: User) {
        setOpenContactDialog(true);
        setSelectedContact(contact);
    }

    function handleClose() {
        setOpenContactDialog(false);
    };

    const handleChangePage = (event: any, newPage: number) => {
        if (newPage != null) {
            setPageNumber(newPage);
        }
    };

    function getPages() {
        let minorNumbers = new Array<number>();
        for (var i = 1; i <= totalPageNumber; i++) {
            minorNumbers.push(i);
        }
        return minorNumbers;
    }

    useEffect(() => {
        function getContacts() {
            setOpenBackdrop(true);
            new UsersApiHelper().getContacts(pageNumber)
                .then((res) => {
                    setContacts(res.data);
                    setTotalPageNumber(res.total_pages);

                })
                .catch(error =>
                    console.log(error)
                ).finally(function () {
                    setOpenBackdrop(false)
                })
        }
        getContacts();
    }, [pageNumber]);

    return (
        <List>
            {contacts.map(function (contact) {
                return <div key={contact.id}><ListItem button onClick={(e) => showContactDetail(contact)} alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt={contact.first_name} src={contact.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={contact.first_name + " " + contact.last_name}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {contact.email}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            })}
            <ContactDetails onClose={handleClose} selectedContact={selectedContact} open={openContactDialog} />
            <StyledToggleButtonGroup
                size="small"
                value={pageNumber}
                exclusive
                onChange={handleChangePage}
                aria-label="text alignment"
            >
                {getPages().map(function (pageNumber) {
                    return <ToggleButton value={pageNumber} aria-label="centered">{pageNumber}</ToggleButton>
                })}
            </StyledToggleButtonGroup>
            <Backdrop className={classes.backdrop} open={openBackdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </List >
    );
}

export default ContactList;
