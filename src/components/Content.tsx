import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import AddProduct from "./AddProduct.tsx";
import MoreProductDetails from "./MoreProductDetails.tsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
interface IGroceries {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  image: string;
}
const Content = () => {
  const [groceries, setGroceries] = useState<IGroceries[]>();
  const fetchGroceries = async () => {
    const responseData = await fetch("http://localhost:8000/groceries");
    const result = await responseData.json();
    setGroceries(result);
  };
  const [openAddDialog, setOpenAddDialog] = useState(false);
  useEffect(() => {
    fetchGroceries();
  }, [groceries]);
  const handleAddProduct = () => {
    setOpenAddDialog(true);
  };
  return (
    <div>
      <Box sx={{ marginTop: "2%", textAlign: "end" }}>
        <Button
          onClick={handleAddProduct}
          variant="contained"
          sx={{ backgroundColor: "#19d263" }}
        >
          Add Product
        </Button>
      </Box>
      <Grid container spacing={2} style={{ marginTop: "2%" }}>
        {groceries &&
          groceries.map((data) => (
            <Grid key={data.id} xs={12} sm={6} md={4} lg={2}>
              <ProductCard data={data} />
            </Grid>
          ))}
      </Grid>
      {openAddDialog && (
        <AddProduct open={openAddDialog} setOpenAddDialog={setOpenAddDialog} />
      )}
    </div>
  );
};

export default Content;

const ProductCard = ({ data }) => {
  const [moreDetails, setMoreDetails] = React.useState(null);
  const [moreClick, setMoreClick] = useState(false);
  const [favClicked, setFavClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const handleMoreClick = (data) => {
    console.log("data=>", data);
    setMoreClick(!moreClick);
  };
  const handleDeleteProduct = async (productId) => {
    const responseData = await axios.delete(
      `http://localhost:8000/groceries/${productId}`
    );
    console.log("Product deleted successfully!!!", productId);
  };

  return (
    <Card
      sx={{
        marginLeft: "20px",
        padding: "15px",
        maxWidth: 150,
        maxHeight: 180,
        borderRadius: "25px",
        position: "relative",
        marginTop: "2%",
      }}
    >
      <Box sx={{ position: "absolute", top: "8px", left: "2px" }}>
        <IconButton aria-label="settings" onClick={() => handleMoreClick(data)}>
          <MoreVertIcon sx={{ display: "block" }} />
        </IconButton>
        {moreClick && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton
              aria-label="settings"
              onClick={() => setMoreDetails({ ...data })}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="settings"
              onClick={() => setDeleteClicked(true)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            top: "40px",
          }}
        ></Box>
      </Box>
      <CardMedia
        component="img"
        height="100"
        width="50"
        image={data.image}
        alt={data.name}
      />
      <Box sx={{ position: "absolute", top: 7, right: 8 }}>
        <IconButton
          aria-label="add to favorites"
          onClick={() => setFavClicked(!favClicked)}
        >
          <FavoriteIcon sx={{ color: favClicked ? "red" : "inherit" }} />
        </IconButton>
      </Box>
      <CardContent sx={{ paddingLeft: 0 }}>
        <Typography sx={{ textAlign: "left" }}>{data.name}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", textAlign: "left" }}
          >
            &#8377;{data.price}
          </Typography>
          <Box
            sx={{
              marginLeft: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              sx={{ minWidth: "10px", height: "20px" }}
            >
              -
            </Button>
            <Typography sx={{ margin: "0 8px" }}>1</Typography>
            <Button
              variant="outlined"
              sx={{ minWidth: "10px", height: "20px" }}
            >
              +
            </Button>
          </Box>
        </Box>
      </CardContent>
      {moreDetails != null && (
        <MoreProductDetails
          product={moreDetails}
          setProductData={setMoreDetails}
          setMoreClick={setMoreClick}
        />
      )}
      {deleteClicked && (
        <Dialog
          open={deleteClicked}
          onClose={() => setDeleteClicked(false)}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Confirmation
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you really want to delete this product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setDeleteClicked(false)}>
              No
            </Button>
            <Button onClick={() => handleDeleteProduct(data?.id)}>Yes</Button>
          </DialogActions>
        </Dialog>
      )}
    </Card>
  );
};
