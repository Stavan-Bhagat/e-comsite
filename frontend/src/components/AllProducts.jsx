import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Card, CardContent, Pagination, CardMedia, CardActionArea, Grid } from "@mui/material";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Form, Container, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { fetchProductData, deleteProduct, fetchProduct, updateProduct, addProduct } from "../utils/service";
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
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    reset();
    setSelectedFiles([]);
    setReadFileData([]);
    setShowStatus(false);
    setIsUpdateMode(false);
    setCurrentProduct(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const fetchProductsData = async (page) => {
    try {
      const response = await fetchProductData(page);
      console.log("fetchproduct", response.data);
      setProducts(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductsData(page);
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
    const reUploads = droppedFiles.filter((droppedFile) => currentFileNames.includes(droppedFile.name));
    Promise.resolve()
      .then(() => removeFiles(reUploads.map((file) => file.name)))
      .then(() => updateCurrentFiles(droppedFiles));
  };

  const handleReadSuccess = (data, file) => {
    setReadFileData((prevReadFiles) => [...prevReadFiles, { data, fileName: file.name, loadResult: "success" }]);
  };

  const handleReadFail = (error, file) => {
    setReadFileData((prevReadFiles) => [
      ...prevReadFiles,
      { loadError: error, fileName: file.name, loadResult: "danger" },
    ]);
  };

  const removeFiles = (namesOfFilesToRemove) => {
    const newCurrentFiles = selectedFiles.filter(
      (currentFile) => !namesOfFilesToRemove.some((fileName) => fileName === currentFile.name)
    );
    setSelectedFiles(newCurrentFiles);
    const newReadFiles = readFileData.filter(
      (readFile) => !namesOfFilesToRemove.some((fileName) => fileName === readFile.fileName)
    );
    setReadFileData(newReadFiles);
  };

  const updateCurrentFiles = (files) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    setShowStatus(true);
  };

  const createHelperText = (file) => {
    const fileResult = readFileData.find((readFile) => readFile.fileName === file.name);
    if (fileResult?.loadError) {
      return (
        <HelperText isLiveRegion>
          <HelperTextItem variant={"error"}>{fileResult.loadError.toString()}</HelperTextItem>
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

      let response;
      if (isUpdateMode) {
        formData.append("productId", currentProduct._id);
        console.log("FormData entries for update:");
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        response = await updateProduct(formData);
      } else {
        console.log("FormData entries for add:");
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        response = await addProduct(formData);
        console.log("Product added successfully:", response.data);
      }

      handleClose();
      fetchProductsData(page);
      resetForm();
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };
  const handleUpdateProduct = async (productId) => {
    try {
      const product = await fetchProduct(productId);

      setCurrentProduct(product.data);
      setIsUpdateMode(true);
      setOpen(true);
      reset(product.data);
    } catch (error) {
      console.error("Error fetching product data for update:", error);
    }
  };
  const handleRemoveProduct = async (productId) => {
    const confirmation = window.confirm("Are you sure you want to delete it?");
    if (confirmation) {
      try {
        await deleteProduct(productId);
        fetchProductsData(page);
      } catch (error) {
        console.error("Error removing product:", error);
      }
    } else {
      return;
    }
  };
  const successfullyReadFileCount = readFileData.filter((fileData) => fileData.loadResult === "success").length;
  return (
    <>
      <Box display={"flex"}>
        <Typography variant="h5">All Products</Typography>
        <Button
          variant="contained"
          sx={{ marginLeft: "auto" }}
          onClick={() => {
            setOpen(true);
            setIsUpdateMode(false);
            resetForm();
          }}
        >
          <AddIcon fontSize="small" sx={{ marginRight: 1 }} /> Add Product
        </Button>
      </Box>

      <Modal show={open} onHide={handleClose} size="lg" centered style={{ zIndex: "9999" }}>
        <Box
          sx={{
            background: "#f5f5f5",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        >
          <Modal.Header closeButton>
            <Typography variant="h5" color="#0d47a1">
              {isUpdateMode ? "Update Product" : "Add Product"}
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
              {errors.productName && <Form.Text className="text-danger">Product name is required.</Form.Text>}
            </Col>

            <Form.Label column sm={2}>
              Brand Name
            </Form.Label>
            <Col sm={4}>
              <Form.Control type="text" placeholder="Enter brand name" {...register("brandName", { required: true })} />
              {errors.brandName && <Form.Text className="text-danger">Brand name is required.</Form.Text>}
            </Col>

            <Form.Label column sm={2}>
              Category
            </Form.Label>
            <Col sm={4}>
              <Form.Control type="text" placeholder="Enter category" {...register("category", { required: true })} />
              {errors.category && <Form.Text className="text-danger">Category is required.</Form.Text>}
            </Col>

            <Form.Label column sm={2}>
              Stock
            </Form.Label>
            <Col sm={4}>
              <Form.Control type="number" placeholder="Enter stock" {...register("stock", { required: true })} />
              {errors.stock && <Form.Text className="text-danger">Stock is required.</Form.Text>}
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
              {errors.description && <Form.Text className="text-danger">Description is required.</Form.Text>}
            </Col>

            <Form.Label column sm={2}>
              Price
            </Form.Label>
            <Col sm={4}>
              <Form.Control type="number" placeholder="Enter price" {...register("price", { required: true })} />
              {errors.price && <Form.Text className="text-danger">Price is required.</Form.Text>}
            </Col>
            <Form.Label column sm={2}>
              Selling Price
            </Form.Label>
            <Col sm={4}>
              <Form.Control type="number" placeholder="Enter selling price" {...register("sellingPrice")} />
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
              <Button variant="contained" color="secondary" onClick={handleClose} className="mx-2">
                Close
              </Button>
              <Button variant="contained" color="success" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Container>
      </Modal>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={3} key={product._id}>
            <Card sx={{ maxWidth: 175, width: "100%" }}>
              <CardActionArea>
                <CardMedia component="img" height="100" image={product.productImage[0]} alt={product.productName} />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      color: "#009688",
                      fontSize: "0.875rem",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                    title={product.productName}
                  >
                    {product.productName}
                  </Typography>

                  <Box sx={{ display: "flex" }}>
                    <div>
                      <Typography variant="h5" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                        <RupeeIcon fontSize="small" /> {product.sellingPrice}
                      </Typography>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" color="text.secondary" sx={{ marginRight: "8px" }}>
                          M.R.P
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                          {product.price}
                        </Typography>
                      </div>
                    </div>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleUpdateProduct(product._id)}
                      className="mx-1"
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveProduct(product._id)}
                    >
                      Remove
                    </Button>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" sx={{ marginTop: 2 }} />
    </>
  );
};

export default AllProducts;
