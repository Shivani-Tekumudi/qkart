import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box, margin, minHeight } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import {generateCartItemsFrom} from './Cart';
import Card from '@mui/material/Card';

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */


const Products = () => {

  const [prod, setProd] =useState([]);
  const [productList, setProductList] = useState('');
  const [isLoading, setisloading] = useState(false);
  const [searchVal, isSearchval] =useState('');
  const [debounceTimeout,setDebounceTimeout] =useState(0);
  const [handleQty, setHandleqty] = useState("handleqty")
 
  
const [items, setItems] =useState('')

  let tokenfromlocal = localStorage.getItem("token");
  // console.log("token is",tokenfromlocal)
const { enqueueSnackbar } = useSnackbar();

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */

 
  const performAPICall = async () => {
    setisloading(true);

const productData = await axios.get(`${config.endpoint}/products`).then((response) => {
 
  if(response.status==200){
    setisloading(false);
    // console.log(response.data);

setProductList(response.data);
setProd(response.data);
    // response.data.map((product) => {
    //   <ProductCard  />

  }

}).catch((error) => {
  // console.log(error.response.data)
  if(error.response.status==500){
    // console.log(error.response.data);
  }

})


  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    // console.log(text);
  
    try{
    const response = await axios.get(`${config.endpoint}/products/search?value=${text}`);
      // console.log(response.data.category);
      setProductList(response.data);

    }
    catch(error){
      if(error.response.status== 404){

       setProductList('');

      }
      else{
      console.log(error, " internal backend error" );
      }
    }
 
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */

 
  const debounceSearch = (e, debounceTimeout) => {
    const value = e.target.value;
    if(debounceTimeout){
      clearTimeout(debounceTimeout);
    }
    const timeOut = setTimeout(async () => {await performSearch(value)},3000)

    setDebounceTimeout(timeOut)
  };


  /**
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */
  const fetchCart = async (token) => {
    if (!token) return;

    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
     const response=await axios.get(`${config.endpoint}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // .then((response) => {
      //   console.log("fetch data",response.data);
      //    setCartData(response.data);
      //    return response.data
      // })
      // console.log("fetch data",response.data);
      return  response.data

    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };


  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {
    let isitemPresent= false;
    items.forEach((cartitem) => {
     if(productId===cartitem.productId){
      isitemPresent= true
     }
      
    })
    return isitemPresent

  };

  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {

    if (!token){
     
      enqueueSnackbar("Login to add an item to the Cart", { variant: "warning" });
      return;
    } 
    // console.log("options.preventDuplicate<<<<<<<<<<<<<<<<<<<<",options.preventDuplicate, "isItemInCart(items,productId)<<<<<<<<<<<<<<<<<<<<<<<<<",isItemInCart(items,productId))
 if(options.preventDuplicate && isItemInCart(items,productId)){
          enqueueSnackbar(" item already in cart", { variant: "warning" });

        }

    try{
      let responseData= await axios.post(`${config.endpoint}/cart`,{
        'productId':productId,
        'qty':qty
      },{
        headers: {
          Authorization: `Bearer ${token}`
         
        }
      
        })
  const finalcartItems= generateCartItemsFrom(responseData.data, productList);
  setItems(finalcartItems);
       
return responseData.data;
    }

    catch(error){
     
      enqueueSnackbar("Backend error", { variant: "error" });
    }
  


  }


  useEffect(()=>{
    performAPICall();
   

  },[])


  useEffect(()=>{
    fetchCart(tokenfromlocal)
   
    .then((cartData) =>generateCartItemsFrom(cartData, prod))
    .then((cartItems) => setItems(cartItems));
    //  console.log("productlist from useeff" , prod);
    //  console.log("cartlist from useeff" , cartData)
  },[prod])





  return (
    <div>
      <Header >
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <TextField
        className="search-desktop"
        size="small"   sx={{ width: 350 }} 
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
       
        name="search"  onChange={(e) => {
          isSearchval(e.target.value)
          debounceSearch(e,debounceTimeout)}}
      />

      </Header>

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search" onChange={(e) => {
          isSearchval(e.target.value)
          debounceSearch(e,debounceTimeout)}}
      />
 <Grid container   spacing={2} className="rendering">
 <Grid item xs={12} md={tokenfromlocal? 8 : 12}>
{/* main screen */}
<Grid container>
         <Grid item className="product-grid">
           <Box className="hero">
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
         </Grid>
       
       </Grid>
     
      
       
    
     {isLoading?       
     <Grid container   direction="column" spacing={2}><Grid
          container
          direction="column"
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }} style={{minHeight:'80vh'}}
        >
<CircularProgress />
<p>Loading Products...</p>
        </Grid></Grid>: productList ? 
          <Grid container   direction="row" spacing={2} style={{padding:"20px"}}>

        {productList.map((product) => {
     return(
    <Grid item xs={6} md={3}>
      <ProductCard product={product} handleAddToCart={async () => { 
        // console.log(items);
        // isItemInCart(items,product._id)? "": ""
       await addToCart( tokenfromlocal, items, productList,product._id,1,{preventDuplicate: true} )}} /> 
        
    </Grid>
    
     ) 
      })}
      </Grid>
   
      : 
      
      <Grid container   direction="column" spacing={2}><Grid
      container
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }} style={{minHeight:'80vh'}}
    >
<SentimentDissatisfied />
<p>No Products Found</p>
    </Grid></Grid>
    }



  </Grid>

{tokenfromlocal ?  
<Grid item xs={12} md={4} sx={{ bgcolor: "#E9F5E1", mt:"18px" }} >
{/* Cart */}

<Cart products={productList} items={items} handleQuantity={addToCart}/>

  </Grid> : ''}
 

 </Grid>

 
      
       {/* <ProductCard /> */}
      <Footer />
    </div>
  );
};

export default Products;
