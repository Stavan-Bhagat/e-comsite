import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Pagination,
} from "@mui/material";
import { Form, Container, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import axiosInstance from "../utils/axios";
import { fetchProductData } from "../utils/service";
import {
  MultipleFileUpload,
  MultipleFileUploadMain,
  MultipleFileUploadStatus,
  MultipleFileUploadStatusItem,
  HelperText,
  HelperTextItem,
} from "@patternfly/react-core";
import UploadIcon from "@patternfly/react-icons/dist/esm/icons/upload-icon";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [readFileData, setReadFileData] = useState([]);
  const [showStatus, setShowStatus] = useState(false);
  const [statusIcon, setStatusIcon] = useState("inProgress");

  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const fetchProductsData = async () => {
    try {
      const response = await fetchProductData(page);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, [page]);

  useEffect(() => {
    if (readFileData.length < selectedFiles.length) {
      setStatusIcon("inProgress");
    } else if (readFileData.every((file) => file.loadResult === "success")) {
      setStatusIcon("success");
    } else {
      setStatusIcon("danger");
    }
  }, [readFileData, selectedFiles]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleFileDrop = (_event, droppedFiles) => {
    const currentFileNames = selectedFiles.map((file) => file.name);
    const reUploads = droppedFiles.filter((droppedFile) =>
      currentFileNames.includes(droppedFile.name)
    );
    Promise.resolve()
      .then(() => removeFiles(reUploads.map((file) => file.name)))
      .then(() => updateCurrentFiles(droppedFiles));
  };

  const handleReadSuccess = (data, file) => {
    setReadFileData((prevReadFiles) => [
      ...prevReadFiles,
      { data, fileName: file.name, loadResult: "success" },
    ]);
  };

  const handleReadFail = (error, file) => {
    setReadFileData((prevReadFiles) => [
      ...prevReadFiles,
      { loadError: error, fileName: file.name, loadResult: "danger" },
    ]);
  };

  const removeFiles = (namesOfFilesToRemove) => {
    const newCurrentFiles = selectedFiles.filter(
      (currentFile) =>
        !namesOfFilesToRemove.some((fileName) => fileName === currentFile.name)
    );
    setSelectedFiles(newCurrentFiles);
    const newReadFiles = readFileData.filter(
      (readFile) =>
        !namesOfFilesToRemove.some((fileName) => fileName === readFile.fileName)
    );
    setReadFileData(newReadFiles);
  };

  const updateCurrentFiles = (files) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    setShowStatus(true);
  };

  const createHelperText = (file) => {
    const fileResult = readFileData.find(
      (readFile) => readFile.fileName === file.name
    );
    if (fileResult?.loadError) {
      return (
        <HelperText isLiveRegion>
          <HelperTextItem variant={"error"}>
            {fileResult.loadError.toString()}
          </HelperTextItem>
        </HelperText>
      );
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("brandName", data.brandName);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("sellingPrice", data.sellingPrice);

      Array.from(selectedFiles).forEach((file) => {
        formData.append("images", file);
      });
      const response = await axiosInstance.post(
        "/product/add-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product added successfully:", response.data);
      handleClose();
      fetchProductsData();
      reset();
      setSelectedFiles([]);
      setReadFileData([]);
      setShowStatus(false); // Hide status section when files are cleared
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const successfullyReadFileCount = readFileData.filter(
    (fileData) => fileData.loadResult === "success"
  ).length;

  return (
    <>
      <Box display={"flex"}>
        <Typography variant="h5"> All Products</Typography>
        <Button
          variant="contained"
          sx={{ marginLeft: "auto" }}
          onClick={() => setOpen(!open)}
        >
          <AddIcon fontSize="small" sx={{ marginRight: 1 }} /> Add Product
        </Button>
      </Box>

      <Modal show={open} onHide={handleClose} size="lg" centered>
        <Box
          sx={{
            background: "#f5f5f5",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        >
          <Modal.Header closeButton>
            <Typography variant="h5" color="#0d47a1">
              Add Product
            </Typography>
          </Modal.Header>
        </Box>
        <Container className="p-4">
          <Form onSubmit={handleSubmit(onSubmit)} className="row g-3">
            <Form.Label column sm={2}>
              Product Name
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                {...register("productName", { required: true })}
              />
              {errors.productName && (
                <Form.Text className="text-danger">
                  Product name is required.
                </Form.Text>
              )}
            </Col>

            <Form.Label column sm={2}>
              Brand Name
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="text"
                placeholder="Enter brand name"
                {...register("brandName", { required: true })}
              />
              {errors.brandName && (
                <Form.Text className="text-danger">
                  Brand name is required.
                </Form.Text>
              )}
            </Col>

            <Form.Label column sm={2}>
              Category
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="text"
                placeholder="Enter category"
                {...register("category", { required: true })}
              />
              {errors.category && (
                <Form.Text className="text-danger">
                  Category is required.
                </Form.Text>
              )}
            </Col>

            <Form.Label column sm={2}>
              Stock
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="number"
                placeholder="Enter stock"
                {...register("stock", { required: true })}
              />
              {errors.stock && (
                <Form.Text className="text-danger">
                  Stock is required.
                </Form.Text>
              )}
            </Col>
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <Form.Text className="text-danger">
                  Description is required.
                </Form.Text>
              )}
            </Col>

            <Form.Label column sm={2}>
              Price
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="number"
                placeholder="Enter price"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <Form.Text className="text-danger">
                  Price is required.
                </Form.Text>
              )}
            </Col>
            <Form.Label column sm={2}>
              Selling Price
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="number"
                placeholder="Enter selling price"
                {...register("sellingPrice")}
              />
            </Col>

            <Form.Label column sm={2}>
              Upload Images
            </Form.Label>
            <Col sm={10}>
              <MultipleFileUpload
                onFileDrop={handleFileDrop}
                dropzoneProps={{
                  accept: {
                    "image/jpeg": [".jpg", ".jpeg"],
                    "application/msword": [".doc"],
                    "application/pdf": [".pdf"],
                    "image/png": [".png"],
                  },
                }}
              >
                <Box sx={{ border: 1, borderColor: "grey.500" }}>
                  <MultipleFileUploadMain
                    titleIcon={<UploadIcon />}
                    titleText="Drag and drop files here"
                    titleTextSeparator="or"
                    infoText="Accepted file types: JPEG, Doc, PDF, PNG"
                  />
                </Box>
                {showStatus && (
                  <MultipleFileUploadStatus
                    statusToggleText={`${successfullyReadFileCount} of ${selectedFiles.length} files uploaded`}
                    statusToggleIcon={statusIcon}
                    aria-label="Current uploads"
                  >
                    {selectedFiles.map((file) => (
                      <MultipleFileUploadStatusItem
                        file={file}
                        key={file.name}
                        onClearClick={() => removeFiles([file.name])}
                        onReadSuccess={handleReadSuccess}
                        onReadFail={handleReadFail}
                        progressHelperText={createHelperText(file)}
                      />
                    ))}
                  </MultipleFileUploadStatus>
                )}
              </MultipleFileUpload>
            </Col>
            <Modal.Footer>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
                className="mx-2"
              >
                Close
              </Button>
              <Button variant="contained" color="success" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Container>
      </Modal>

      {products.map((product) => (
        <Card key={product.id} sx={{ minWidth: 275, marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: 2 }}
      />
    </>
  );
};

export default AllProducts;
