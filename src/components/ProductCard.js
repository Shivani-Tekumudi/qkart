import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({product, handleAddToCart }) => {

  // const data =
  // {
  // "name":"Tan Leatherette Weekender Duffle",
  // "category":"Fashion",
  // "cost":150,
  // "rating":4,
  // "image":"https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png",
  // "_id":"PmInA797xJhMIPti"
  // }
  // const data= JSON.parse(jsondata);
  // console.log(data)

  return (
    <Card className="card">
      
      <CardMedia  sx={{ height: 300 }}  component="img" image={product.image} alt={product.name} />


      <CardContent>
      <Typography variant="h5" component="h3">
     {product.name}
      </Typography>
      <Typography variant="h6" component="" style={{ fontWeight: 600 }} gutterBottom>
 ${product.cost}
</Typography>
<Rating name="half-rating" defaultValue={product.rating}  readOnly />
      </CardContent>
      <CardActions>
      <Button className="button" variant="contained" label="primary" style={{textTransform:'capitalize'}} startIcon={<AddShoppingCartOutlined />} fullWidth onClick={() =>{handleAddToCart()}}>add to cart</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
