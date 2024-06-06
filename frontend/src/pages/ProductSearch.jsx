import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
  CardActionArea,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AbcIcon from '@mui/icons-material/Abc';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Slider from '@mui/material/Slider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Header from '../components/Header';
import { fetchProductsByCategory } from '../utils/services/product.service';

// eslint-disable-next-line no-unused-vars
const valuetext = (value) => `${value}`;

const ProductSearch = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProductsFromCategory = async (fetchCategory) => {
    setLoading(true);
    const response = await fetchProductsByCategory(fetchCategory);
    setLoading(false);
    setProducts(response.data);
    setFilteredProducts(response.data);
  };

  const handleClick = () => {
    setOpen(!open);
  };
  const filterProducts = (priceRangeProduct, selectedBrandsProduct) => {
    const filtered = products.filter((product) => {
      const isInPriceRange =
        product.price >= priceRangeProduct[0] && product.price <= priceRange[1];
      const isBrandSelected =
        selectedBrandsProduct.length === 0 || selectedBrandsProduct.includes(product.brandName);
      return isInPriceRange && isBrandSelected;
    });
    setFilteredProducts(filtered);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    filterProducts(newValue, selectedBrands);
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
    fetchProductsFromCategory(category);
    setPriceRange([0, 10000]);
    setSelectedBrands([]);
  }, [category]);

  // Get unique brands
  const uniqueBrands = [...new Set(products.map((product) => product.brandName))];

  return (
    <>
      <Header />
      <Box className="mt-2" px={12}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Box>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Filters
                </Typography>
                <Divider />
                <ListItemButton>
                  <ListItemIcon>
                    <CurrencyRupeeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Price" />
                </ListItemButton>
                <Box>
                  <Slider
                    aria-label="Price"
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={0}
                    max={30000}
                  />
                </Box>
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <AbcIcon />
                  </ListItemIcon>
                  <ListItemText primary="Brands" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <FormGroup>
                          {uniqueBrands.map((brand) => (
                            <FormControlLabel
                              key={brand}
                              control={<Checkbox value={brand} onChange={handleBrandChange} />}
                              label={brand}
                            />
                          ))}
                        </FormGroup>
                      </ListItemIcon>
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={2}>
              {filteredProducts.map((product) => (
                <Grid item xs={3} key={product.id}>
                  <Card sx={{ maxWidth: 200 }} onClick={() => handleChange(product._id)}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={product.productImage[0]}
                        alt={product.productName}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="button"
                          component="div"
                          sx={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {product.productName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <CurrencyRupeeIcon fontSize="small" /> {product.price}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductSearch;
