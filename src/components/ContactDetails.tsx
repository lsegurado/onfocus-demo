import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import User from '../classes/User';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import SendIcon from '@material-ui/icons/Send';

type ContactDetailsProps = {
    selectedContact: User,
    onClose: Function,
    open: boolean
}

const ContactDetails: React.FC<ContactDetailsProps> = (props) => {
    const handleClose = () => {
        props.onClose();
    };

    return (
        <Dialog onClose={handleClose} maxWidth='sm' fullWidth={true} aria-labelledby="contact-details" open={props.open}>
            <DialogTitle id="contact-details">Contact information</DialogTitle>
            <List>
                <ListItem autoFocus>
                    <ListItemAvatar>
                        <Avatar src={props.selectedContact.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={props.selectedContact.first_name + ' ' + props.selectedContact.last_name} />
                </ListItem>
                <ListItem autoFocus>
                    <ListItemText primary='Phone number' secondary='(0351) - 7434046'/>
                </ListItem>
                <ListItem autoFocus>
                    <ListItemText primary='E-mail' secondary={props.selectedContact.email}/>
                    <a href={"mailto:"+props.selectedContact.email+"?Subject=Hi!"}><SendIcon/></a>
                </ListItem>
                <ListItem autoFocus>
                    <ListItemText primary='Linkedin' secondary='https://www.linkedin.com/in/lucas-mart%C3%ADn-segurado/'/>
                    <a href='https://www.linkedin.com/in/lucas-mart%C3%ADn-segurado/'><OpenInNewIcon/></a>
                </ListItem>
            </List>
        </Dialog>
    );
}

export default ContactDetails;