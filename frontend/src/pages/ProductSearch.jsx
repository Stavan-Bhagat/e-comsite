import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  FormControlLabel,
  FormControl,
  Checkbox,
  FormGroup,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import AbcIcon from "@mui/icons-material/Abc";
import Header from "../components/Header";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Slider from "@mui/material/Slider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { fetchProductsByCategory } from "../utils/service";
import { useNavigate } from "react-router-dom";
const valuetext = (value) => `${value}`;

const ProductSearch = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProductsFromCategory = async (category) => {
    setLoading(true);
    const response = await fetchProductsByCategory(category);
    setLoading(false);
    setProducts(response.data);
    setFilteredProducts(response.data);
  };

  const handleClick = () => {
    setOpen(!open);
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

  const filterProducts = (priceRange, selectedBrands) => {
    const filtered = products.filter((product) => {
      const isInPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const isBrandSelected =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brandName);
      return isInPriceRange && isBrandSelected;
    });
    setFilteredProducts(filtered);
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
  const uniqueBrands = [
    ...new Set(products.map((product) => product.brandName)),
  ];

  return (
    <>
      <Header />
      <Box className="mt-2" px={12}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Box>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
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
                    max={10000}
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
                          {uniqueBrands.map((brand, index) => (
                            <FormControlLabel
                              key={index}
                              control={
                                <Checkbox
                                  value={brand}
                                  onChange={handleBrandChange}
                                />
                              }
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
                  {/* <Link to={`product/${produ?._id}`}> */}

                  <Card
                    sx={{ maxWidth: 200 }}
                    onClick={() => handleChange(product._id)}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={product.productImage[0]}
                        alt={product.productName}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.productName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.price}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  {/* </Link> */}
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

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Container,
//   Grid,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { Image } from "react-bootstrap";
// import axios from "axios";

// const ProductSearch = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [category, setCategory] = useState("");
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const

//   useEffect(() => {
//     if (searchQuery) {
//       fetchProducts();
//     }
//   }, [searchQuery]);

//   const fetchProducts = async () => {
//     try {
//       // Replace with your actual API endpoint
//       const response = await axios.get(`/api/products?search=${searchQuery}`);
//       setProducts(response.data);
//       setFilteredProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleFilter = () => {
//     let filtered = products;

//     if (category) {
//       filtered = filtered.filter((product) => product.category === category);
//     }

//     filtered = filtered.filter(
//       (product) =>
//         product.price >= priceRange[0] && product.price <= priceRange[1]
//     );

//     setFilteredProducts(filtered);
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Search Products
//       </Typography>
//       <Box mb={3}>
//         <TextField
//           variant="outlined"
//           fullWidth
//           placeholder="Search for products..."
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//       </Box>
//       <Grid container spacing={2}>
//         <Grid item xs={3}>
//           <Box mb={2}>
//             <FormControl fullWidth>
//               <InputLabel>Category</InputLabel>
//               <Select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               >
//                 <MenuItem value="">All</MenuItem>
//                 <MenuItem value="electronics">Electronics</MenuItem>
//                 <MenuItem value="fashion">Fashion</MenuItem>
//                 <MenuItem value="home">Home</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//           <Box mb={2}>
//             <Typography>Price Range</Typography>
//             <TextField
//               type="number"
//               placeholder="Min"
//               value={priceRange[0]}
//               onChange={(e) =>
//                 setPriceRange([Number(e.target.value), priceRange[1]])
//               }
//               fullWidth
//             />
//             <TextField
//               type="number"
//               placeholder="Max"
//               value={priceRange[1]}
//               onChange={(e) =>
//                 setPriceRange([priceRange[0], Number(e.target.value)])
//               }
//               fullWidth
//               sx={{ mt: 2 }}
//             />
//           </Box>
//           <Button variant="contained" color="primary" onClick={handleFilter}>
//             Apply Filters
//           </Button>
//         </Grid>
//         <Grid item xs={9}>
//           <Grid container spacing={2}>
//             {filteredProducts.map((product) => (
//               <Grid item xs={4} key={product.id}>
//                 <Box>
//                   <Image
//                     src={product.productImage}
//                     alt={product.productName}
//                     fluid
//                   />
//                   <Typography variant="h6">{product.productName}</Typography>
//                   <Typography variant="body1">${product.price}</Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default ProductSearch;
