import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { fetchUserData } from "../utils/service";
import { Container, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AllUsers = () => {
  const [rowData, setRowData] = useState(null);
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
    // Implement edit functionality here
    console.log("Edit clicked for row:", rowData);
  };

  const handleDeleteClick = (rowData) => {
    // Implement delete functionality here
    console.log("Delete clicked for row:", rowData);
  };

  const ActionRenderer = ({ data }) => {
    return (
      <div>
        <IconButton onClick={() => handleEditClick(data)}>
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
    </Container>
  );
};

export default AllUsers;
