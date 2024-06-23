import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  List,
  ListItemButton,
  FormControlLabel,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Checkbox,
  FormGroup,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@mui/material';
import AbcIcon from '@mui/icons-material/Abc';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useSnackbar } from 'notistack';
import Header from '../components/Header';
import { searchProduct } from '../utils/services/product.service';
import { MESSAGES } from '../constant/messages.constant';
import {
  CategoryHeader,
  OuterContainer,
  StyledCard,
  sidebarContainer,
} from '../css/styles/searchPage.style';

const predefinedRanges = [
  { label: 'Under 1000', min: 0, max: 1000 },
  { label: '1000 - 5000', min: 1000, max: 5000 },
  { label: '5000 - 10000', min: 5000, max: 10000 },
  { label: '10000 - 20000', min: 10000, max: 20000 },
  { label: '20000 and above', min: 20000, max: 30000 },
];

const ProductSearch = () => {
  const { type, term } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchProducts = async (searchType, searchTerm) => {
    setLoading(true);
    try {
      const response = await searchProduct(searchTerm);
      setLoading(false);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(`${MESSAGES.ERROR.FETCH_ORDERS_FAILED} ${error.message}`, {
        variant: 'error',
      });
    }
  };

  const filterProducts = (priceRangeProduct, selectedBrandsProduct) => {
    const filtered = products.filter((product) => {
      const isInPriceRange =
        product.price >= priceRangeProduct[0] && product.price <= priceRangeProduct[1];
      const isBrandSelected =
        selectedBrandsProduct.length === 0 || selectedBrandsProduct.includes(product.brandName);
      return isInPriceRange && isBrandSelected;
    });
    setFilteredProducts(filtered);
  };

  const handleRangeChange = (event) => {
    const [min, max] = event.target.value.split('-').map(Number);
    if (!Number.isNaN(min) && !Number.isNaN(max)) {
      setPriceRange([min, max]);
      filterProducts([min, max], selectedBrands);
    }
  };

  const handleBrandChange = (event) => {
    const { value, checked } = event.target;
    const updatedBrands = checked
      ? [...selectedBrands, value]
      : selectedBrands.filter((brand) => brand !== value);
    setSelectedBrands(updatedBrands);
    filterProducts(priceRange, updatedBrands);
  };

  const handleChange = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    fetchProducts(type, term);
    setPriceRange([0, 10000]);
    setSelectedBrands([]);
  }, [type, term]);

  const uniqueBrands = [...new Set(products.map((product) => product.brandName))];

  return (
    <>
      <Header />
      <OuterContainer className="mt-2" px={{ xs: 1, sm: 2 }} py={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={2}>
            <sidebarContainer>
              <List>
                <CategoryHeader variant="h6" gutterBottom>
                  Filters
                </CategoryHeader>
                <Divider />
                <ListItemButton>
                  <ListItemIcon>
                    <CurrencyRupeeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Price" />
                </ListItemButton>
                <FormControl fullWidth>
                  <Select value={`${priceRange[0]}-${priceRange[1]}`} onChange={handleRangeChange}>
                    {predefinedRanges.map((range) => (
                      <MenuItem key={range.label} value={`${range.min}-${range.max}`}>
                        {range.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <ListItemButton onClick={() => setOpen(!open)}>
                  <ListItemIcon>
                    <AbcIcon />
                  </ListItemIcon>
                  <ListItemText primary="Brands" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <FormGroup>
                      {uniqueBrands.map((brand) => (
                        <FormControlLabel
                          key={brand}
                          control={<Checkbox value={brand} onChange={handleBrandChange} />}
                          label={brand}
                        />
                      ))}
                    </FormGroup>
                  </List>
                </Collapse>
              </List>
            </sidebarContainer>
          </Grid>

          {/* Main content */}
          <Grid item xs={12} sm={9} md={10}>
            <Grid container spacing={2}>
              {filteredProducts.map((product) => (
                <Grid item xs={6} sm={4} md={3} key={product.id}>
                  <StyledCard component={ListItemButton} onClick={() => handleChange(product._id)}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={product.productImage[0]}
                        alt={product.productName}
                      />
                      <CardContent>
                        <Typography variant="body2" noWrap>
                          {product.productName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <CurrencyRupeeIcon /> {product.price}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </OuterContainer>
    </>
  );
};

export default ProductSearch;
