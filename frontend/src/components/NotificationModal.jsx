import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import NewIcon from '@mui/icons-material/FiberNew';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotifications } from '../redux/Slice/notificationSlice';

const NotificationModal = ({ open, handleClose }) => {
  const notifications = useSelector((state) => state.notifications.items);
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearNotifications());
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ background: '#8e24aa', color: '#ffffff' }}>Notifications</DialogTitle>
      <DialogContent>
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification._id}>
              <ListItemText primary={<NewIcon sx={{ color: '#f44336' }} />} />
              <ListItemText primary={notification.productName} sx={{ textOverflow: 'ellipsis' }} />
              <ListItemAvatar>
                <Avatar
                  src={notification.productImage[0]}
                  alt={notification.productName}
                  style={{ borderRadius: '0%' }}
                />
              </ListItemAvatar>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClear} color="primary">
          Clear All
        </Button>
      </DialogActions>
    </Dialog>
  );
};

NotificationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default NotificationModal;
