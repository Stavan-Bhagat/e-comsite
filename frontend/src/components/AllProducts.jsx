import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Box,
  Typography,
  Button,
  CardActionArea,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Pagination,
  FormControl,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import RupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { green } from '@mui/material/colors';
import {
  MultipleFileUpload,
  MultipleFileUploadMain,
  MultipleFileUploadStatus,
  MultipleFileUploadStatusItem,
  HelperText,
  HelperTextItem,
} from '@patternfly/react-core';
import UploadIcon from '@patternfly/react-icons/dist/esm/icons/upload-icon';
import {
  fetchProductData,
  deleteProduct,
  fetchProduct,
  updateProduct,
  addProduct,
} from '../utils/services/product.service';
import { MESSAGES } from '../constant/messages.constant';
import {
  StyledContainer,
  StyledHeader,
  StyleTypography,
  OverflowTypography,
  StyledCard,
  StyledCardContent,
  StyledCardMedia,
  StyledModal,
  StyledModalContent,
  StyledForm,
  StyledFormControl,
  StyledGrid,
  StyledPaginationContainer,
  AddProductButton,
} from '../css/styles/allProducts.style';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [readFileData, setReadFileData] = useState([]);
  const [showStatus, setShowStatus] = useState(false);
  const [statusIcon, setStatusIcon] = useState('inProgress');
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const categoryList = [
    'Bags',
    'Baby',
    'Books',
    'Car & Moterbike',
    'Clothing Men',
    'Clothing Women',
    'Electronics',
    'Garden & Outdoors',
    'Jwellery',
    'Laptops',
    'Mobiles',
    'Perfumes',
    'Shoes',
    'Skincare',
  ];
  const resetForm = () => {
    reset({
      productName: '',
      brandName: '',
      category: '',
      description: '',
      price: '',
    });
    setSelectedFiles([]);
    setReadFileData([]);
    setShowStatus(false);
    setIsUpdateMode(false);
    setCurrentProduct(null);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const fetchProductsData = async (pageCount) => {
    try {
      const response = await fetchProductData(pageCount);
      setProducts(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      enqueueSnackbar(`${MESSAGES.ERROR.FETCH_FAILED} ${error.message}`, { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchProductsData(page);
  }, [page]);

  useEffect(() => {
    if (readFileData.length < selectedFiles.length) {
      setStatusIcon('inProgress');
    } else if (readFileData.every((file) => file.loadResult === 'success')) {
      setStatusIcon('success');
    } else {
      setStatusIcon('danger');
    }
  }, [readFileData, selectedFiles]);

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
      { data, fileName: file.name, loadResult: 'success' },
    ]);
  };

  const handleReadFail = (error, file) => {
    setReadFileData((prevReadFiles) => [
      ...prevReadFiles,
      { loadError: error, fileName: file.name, loadResult: 'danger' },
    ]);
  };

  const createHelperText = (file) => {
    const fileResult = readFileData.find((readFile) => readFile.fileName === file.name);
    if (fileResult?.loadError) {
      return (
        <HelperText isLiveRegion>
          <HelperTextItem variant="error">{fileResult.loadError.toString()}</HelperTextItem>
        </HelperText>
      );
    }
  };

  const onSubmit = async (data) => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      try {
        const formData = new FormData();

        formData.append('productName', data.productName);
        formData.append('brandName', data.brandName);
        formData.append('category', data.category);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('stock', data.stock);
        formData.append('sellingPrice', data.sellingPrice);

        Array.from(selectedFiles).forEach((file) => {
          formData.append('images', file);
        });

        if (isUpdateMode) {
          formData.append('productId', currentProduct._id);
          await updateProduct(formData);
        } else {
          await addProduct(formData);
        }
        setSuccess(true);
        setLoading(false);
        handleClose();
        fetchProductsData(page);
      } catch (error) {
        enqueueSnackbar(`${MESSAGES.FORMS.SUBMIT_FAILED} ${error.message}`, { variant: 'error' });
      }
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
      enqueueSnackbar(`${MESSAGES.FORMS.SUBMIT_FAILED} ${error.message}`, { variant: 'error' });
    }
  };

  const handleAddProduct = () => {
    setOpen(true);
    setIsUpdateMode(false);
    resetForm();
  };

  const handleRemoveProduct = async (productId) => {
    confirmAlert({
      title: MESSAGES.CONSTANT_NAME.DELETE_CONFIRMATION.TITLE,
      message: MESSAGES.CONSTANT_NAME.DELETE_CONFIRMATION.MESSAGE,
      buttons: [
        {
          label: MESSAGES.CONSTANT_NAME.DELETE_CONFIRMATION.YES,
          onClick: async () => {
            try {
              await deleteProduct(productId);
              enqueueSnackbar(MESSAGES.INFO.CRUD.SUCCESS.DELETED, {
                variant: 'success',
              });
              fetchProductsData(page);
            } catch (error) {
              enqueueSnackbar(`${MESSAGES.FORMS.SUBMIT_FAILED} ${error.message}`, {
                variant: 'error',
              });
            }
          },
        },
        {
          label: MESSAGES.CONSTANT_NAME.DELETE_CONFIRMATION.NO,
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <StyledContainer>
      <StyledHeader variant="h5">
        Product List
        <AddProductButton
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
        >
          Add Product
        </AddProductButton>
      </StyledHeader>
      <StyledGrid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={4} md={3} lg={2} key={product._id}>
            <StyledCard>
              <CardActionArea>
                <StyledCardMedia image={product.productImage[0]} title={product.productName} />
                <StyledCardContent>
                  <StyleTypography gutterBottom variant="h6" component="h2">
                    {product.productName}
                  </StyleTypography>
                  <OverflowTypography variant="body2" color="textSecondary" component="p">
                    {product.brandName}
                  </OverflowTypography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <RupeeIcon fontSize="small" /> {product.price}
                  </Typography>
                  <Box mt={2} display={'flex'} justifyContent={'space-between'}>
                    <Button
                      size="medium"
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateProduct(product._id)}
                    >
                      <EditNoteIcon />
                    </Button>
                    <Button
                      size="medium"
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleRemoveProduct(product._id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                </StyledCardContent>
              </CardActionArea>
            </StyledCard>
          </Grid>
        ))}
      </StyledGrid>
      <StyledPaginationContainer>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} />
      </StyledPaginationContainer>
      <StyledModal open={open} onClose={handleClose}>
        <StyledModalContent>
          <Box pb={2}>
            <Typography component="block" variant="h6" color={'primary'} gutterBottom>
              {isUpdateMode ? 'Update Product' : 'Add Product'}
            </Typography>
            <CloseIcon onClick={handleClose} sx={{ float: 'right' }}>
              Close
            </CloseIcon>
          </Box>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                  {...register('productName', { required: true })}
                  error={!!errors.productName}
                  helperText={errors.productName ? 'Product Name is required' : ''}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Brand Name"
                  variant="outlined"
                  fullWidth
                  {...register('brandName', { required: true })}
                  error={!!errors.brandName}
                  helperText={errors.brandName ? 'Brand Name is required' : ''}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth error={!!errors.category}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    {...register('category', { required: true })}
                    defaultValue=""
                  >
                    {categoryList.map((item, index) => (
                      <MenuItem value={item} key={`item${index + 1}`}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && <FormHelperText error>Category is required</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Stock"
                  variant="outlined"
                  fullWidth
                  type="number"
                  {...register('stock', { required: true })}
                  error={!!errors.stock}
                  helperText={errors.stock ? 'Stock is required' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  {...register('description', { required: true })}
                  error={!!errors.description}
                  helperText={errors.description ? 'Description is required' : ''}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Price"
                  variant="outlined"
                  fullWidth
                  type="number"
                  {...register('price', { required: true })}
                  error={!!errors.price}
                  helperText={errors.price ? 'Price is required' : ''}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Selling Price"
                  variant="outlined"
                  fullWidth
                  type="number"
                  {...register('sellingPrice', { required: true })}
                  error={!!errors.sellingPrice}
                  helperText={errors.sellingPrice ? 'Selling Price is required' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <MultipleFileUpload onFileDrop={handleFileDrop}>
                  <Box sx={{ border: '1px dashed #ccc', padding: '1rem' }}>
                    <MultipleFileUploadMain
                      titleText="Drag and drop files here or click to browse"
                      infoText="Accepted file formats: jpg, png"
                      titleIcon={<UploadIcon style={{ color: '#1976d2' }} />}
                    />
                  </Box>
                  {showStatus && (
                    <MultipleFileUploadStatus
                      statusToggleText="Show status"
                      statusToggleTextExpanded="Hide status"
                      dropzoneProps={{
                        accept: '.jpg,.png',
                      }}
                    >
                      {selectedFiles.map((file, index) => (
                        <MultipleFileUploadStatusItem
                          key={index}
                          file={file}
                          handleReadSuccess={(data) => handleReadSuccess(data, file)}
                          handleReadFail={(error) => handleReadFail(error, file)}
                          icon={statusIcon}
                          spinnerAriaValueText="Loading"
                          progressValue={0}
                          filename={file.name}
                          fileSize={file.size}
                          helperText={createHelperText(file)}
                          onClearClick={() => removeFiles([file.name])}
                        />
                      ))}
                    </MultipleFileUploadStatus>
                  )}
                </MultipleFileUpload>
              </Grid>
            </Grid>

            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={buttonSx}
                disabled={loading}
              >
                {isUpdateMode ? 'Update' : 'Add'}
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </StyledForm>
        </StyledModalContent>
      </StyledModal>
    </StyledContainer>
  );
};

export default AllProducts;
