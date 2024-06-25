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
  Divider,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import NewIcon from '@mui/icons-material/FiberNew';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotifications } from '../redux/Slice/notificationSlice';

const NotificationModal = ({ open, handleClose }) => {
  const notifications = useSelector((state) => state?.notifications?.items);
  console.log('notification', notifications);
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
          {notifications?.map((notification, index) => (
            <React.Fragment key={notification._id}>
              <ListItem>
                {notification.type === 'product' ? (
                  <>
                    <ListItemAvatar>
                      <Avatar src={notification.productImage[0]} alt={notification.productName} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ textOverflow: 'ellipsis' }}
                      primary={
                        <>
                          <NewIcon sx={{ color: '#f44336' }} />
                          {` Product Is Here : ${notification.productName}`}
                        </>
                      }
                      secondary={`Price: ₹ ${notification.sellingPrice}`}
                    />
                  </>
                ) : (
                  <>
                    <ListItemAvatar>
                      <Avatar alt="order Avatar" src={notification.items[0].productImage[0]} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                      primary={
                        <>
                          {notification.userName ? (
                            <span className="text-primary">
                              Order Placed by {notification.name}
                            </span>
                          ) : (
                            <span className="text-primary">Order Placed</span>
                          )}
                          {notification.items.map((item) => (
                            <>
                              <div key={item._id}>
                                {item.productName} x {item.quantity}
                              </div>
                             
                            </>
                          ))}
                        </>
                      }
                      secondary={`Total Price: ₹ ${notification.totalAmount}`}
                    />
                  </>
                )}
              </ListItem>

              {index < notifications.length - 1 && <Divider />}
            </React.Fragment>
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
