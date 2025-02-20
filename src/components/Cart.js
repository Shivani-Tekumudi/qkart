import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { Box, flexbox, padding } from "@mui/system";
import {Grid} from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";

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

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 * 
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData, productsData) => {

  if(!cartData) {
   
    return};



  const cartItems = cartData.map((cartItem) => ({
    ...cartItem,
     ...productsData.find((product) => cartItem.productId === product._id)
    

    
  }));

  // console.log("cartitems in generate", cartItems);
return  cartItems
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items) => {
  let total=0;
  items.map((cartitem) => {
total+= cartitem.cost * cartitem.qty;
  })
  // console.log("totla----------------",total);
return total;

};


/**
 * Como diponent tsplay the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
 * 
 */
const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete, isReadOnly
}) => {
 
  // {isReadOnly? 
  // <Stack direction="row" alignItems="center">
  //   <Box padding="0.5rem" data-testid="item-qty">
  //       Qty: {value}
  //     </Box>
  // </Stack>:  
  {if(isReadOnly){
    return (<Stack direction="row" alignItems="center">
     <Box padding="0.5rem" data-testid="item-qty">
         Qty: {value}
      </Box>
  </Stack>
    )
  }
else{
  return(<Stack direction="row" alignItems="center">
    <IconButton size="small" color="primary" onClick={handleDelete}>
      <RemoveOutlined />
    </IconButton>
    <Box padding="0.5rem" data-testid="item-qty">
      {value}
    </Box>
    <IconButton size="small" color="primary" onClick={handleAdd}>
      <AddOutlined />
    </IconButton>
    </Stack>)
}
}


  
 
//  }


};


function getTotalItems(items){
let finaltotal=0;
items.map((cartitem) => {
finaltotal++;
})
return  finaltotal
}



// const checkoutProducts= getTotalItems();





/**
 * Component to display the Cart view
 * 
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 * 
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 * 
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 * 
 * 
 */
const Cart = ({ products,items, handleQuantity, isReadOnly}) => {

  let tokenfromlocal = localStorage.getItem("token");
  let history= useHistory();
  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
   
      <Box className="cart" >
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}


        {items.map((cartitem => {
          return(

            
<Box key={cartitem.productId} display="flex" alignItems="flex-start" padding="1rem" >
    <Box className="image-container">
        <img
            // Add product image
            src={cartitem.image}
            // Add product name as alt eext
            alt=""
            width="100%"
            height="100%"
        />
    </Box>
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="6rem"
        paddingX="1rem"
    >
        <div>{cartitem.name}</div>
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
        >
        <ItemQuantity value={cartitem.qty} handleAdd={async () => {await handleQuantity(tokenfromlocal,items,products,cartitem.productId,cartitem.qty+1)}} handleDelete={async () => {await handleQuantity(tokenfromlocal,items,products,cartitem.productId,cartitem.qty-1)}} isReadOnly={isReadOnly}
        // Add required props by checking implementation
        />
        <Box padding="0.5rem" fontWeight="700">
             ${cartitem.cost}
        </Box>
        </Box>
    </Box>
</Box>
          )
        }))}

    
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >

          
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(items)}
          </Box>
        </Box>
{isReadOnly? " " : <Box display="flex" justifyContent="flex-end" className="cart-footer">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            className="checkout-btn" onClick={() => {
              history.push("/checkout")
            }}
          >
            Checkout
          </Button>
        </Box>}
        
      </Box>
     {isReadOnly?  <Box className="cart" >
        <h3>Order Details</h3>
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center" mt="10px"
        >
      <Box> <Typography > Products</Typography></Box> 
      <Box> <Typography > {getTotalItems(items)}</Typography></Box> 
      
        </Box>
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center" mt="10px" 
        >
      <Box> <Typography > Subtotal</Typography></Box> 
      <Box> <Typography >  ${getTotalCartValue(items)}</Typography></Box> 
      
        </Box>
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center" mt="10px"
        >
      <Box> <Typography> Shiping Charges</Typography></Box> 
      <Box> <Typography > $0</Typography></Box> 
      
        </Box>
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
        >
      <Box> <h4 > Total</h4></Box> 
      <Box> <h4 >  ${getTotalCartValue(items)}</h4></Box> 
      
        </Box>
        </Box> : ""}
     
    </>
  );
};

export default Cart;
