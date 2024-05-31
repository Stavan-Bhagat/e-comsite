import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { fetchUserData } from "../utils/service";
import { Container, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateUserData } from "../utils/service.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const AllUsers = () => {
  const [rowData, setRowData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
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
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (rowData) => {
    updateUserData(rowData._id);
    console.log("Edit clicked for row:", rowData);
  };

  const handleDeleteClick = (rowData) => {
    console.log("Delete clicked for row:", rowData);
  };

  const ActionRenderer = ({ data }) => {
    return (
      <div>
        <IconButton onClick={() => handleEditClick(handleOpen)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDeleteClick(data)}>
          <DeleteIcon />
        </IconButton>
      </div>
    );
  };
  const ImageRenderer = ({ value }) => {
    const imageUrl = value;
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={imageUrl}
          alt="User Image"
          style={{ height: 50, width: 50 }}
        />
      </div>
    );
  };

  useEffect(() => {
    const adjustColumnSize = () => {
      if (rowData) {
        const api = gridRef.current.api;
        api.autoSizeColumns();
      }
    };

    adjustColumnSize();
  }, [rowData]);

  const gridRef = React.useRef();

  const colDefs = [
    { field: "id", headerName: "id" },
    { field: "imageUrl", headerName: "profile", cellRenderer: ImageRenderer },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "role", headerName: "Role" },
    {
      headerName: "Actions",
      cellRenderer: ActionRenderer,
      maxWidth: 195,
    },
  ];

  return (
    <Container maxWidth="xl">
      <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          autoSizeStrategy={true}
          autoSizeColumns={true}
          ref={gridRef}
        />
      </div>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    </Container>
  );
};

export default AllUsers;
