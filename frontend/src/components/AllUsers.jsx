/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSnackbar } from 'notistack';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Container, IconButton, TextField, Box, Button, Typography, Modal } from '@mui/material';
import Select from 'react-select';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm, Controller } from 'react-hook-form';
import { fetchUserData, updateUserData, deleteUserData } from '../utils/services/user.service';
import { MESSAGES } from '../constant/messages.constant';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const AllUsers = () => {
  const [rowData, setRowData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const currentUser = (state) => state.auth.user;
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const gridRef = useRef();

  const handleOpen = (data) => {
    setSelectedUser(data);
    setOpen(true);
    reset(data);
  };
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    try {
      const response = await fetchUserData();
      const rowDataWithId = response.data.map((user, index) => ({
        ...user,
        id: index + 1,
      }));
      setRowData(rowDataWithId);
    } catch (error) {
      enqueueSnackbar(`${MESSAGES.ERROR.FETCH_ORDERS_FAILED} ${error.message}`, {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (editData) => {
    handleOpen(editData);
  };

  const handleDeleteClick = async (deleteData) => {
    confirmAlert({
      title: MESSAGES.CONSTANT_NAME.DELETE_CONFIRMATION.TITLE,
      message: MESSAGES.CONSTANT_NAME.DELETE_CONFIRMATION.MESSAGE,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await deleteUserData(deleteData._id);
              await fetchData();
              enqueueSnackbar(MESSAGES.INFO.CRUD.DELETED, { variant: 'success' });
            } catch (error) {
              enqueueSnackbar(`${MESSAGES.INFO.CRUD.FAILED.CREATE} ${error.message}`, {
                variant: 'error',
              });
            }
          },
        },
        {
          label: 'No',
          onClick: () => {
            enqueueSnackbar(MESSAGES.INFO.CRUD.CANCELLED.DELETE, { variant: 'info' });
          },
        },
      ],
    });
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const ActionRenderer = ({ data }) => (
    <div>
      <IconButton onClick={() => handleEditClick(data)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => handleDeleteClick(data)} disabled={currentUser._id === data._id}>
        <DeleteIcon />
      </IconButton>
    </div>
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const ImageRenderer = ({ value }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={value} alt="User" style={{ height: 50, width: 50 }} />
    </div>
  );

  const onSubmit = async (data) => {
    try {
      await updateUserData(selectedUser._id, data);
      handleClose();
      fetchData();
    } catch (error) {
      enqueueSnackbar(`${MESSAGES.FORMS.SUBMIT_FAILED} ${error.message}`, {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    if (rowData) {
      const adjustColumnSize = () => {
        const { api } = gridRef.current;
        api.sizeColumnsToFit();
      };

      adjustColumnSize();
    }
  }, [rowData]);

  const colDefs = [
    { field: 'id', headerName: 'ID' },
    { field: 'imageUrl', headerName: 'Profile', cellRenderer: ImageRenderer },
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'role', headerName: 'Role' },
    {
      headerName: 'Actions',
      cellRenderer: ActionRenderer,
      maxWidth: 195,
    },
  ];

  return (
    <Container maxWidth="xl">
      <div className="ag-theme-quartz" style={{ height: 500, width: '100%' }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} ref={gridRef} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit User
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              variant="outlined"
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: MESSAGES.FORMS.VALIDATION.EMAIL_INVALID,
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: 'User', label: 'User' },
                    { value: 'Admin', label: 'Admin' },
                  ]}
                  defaultValue={field.value}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

export default AllUsers;
