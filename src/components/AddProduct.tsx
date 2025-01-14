import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Menu, MenuItem, Typography } from '@mui/material';

const AddProduct = ({ open, setOpenAddDialog }) => {
  const [productDetails, setProductDetails] = React.useState({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    unit: '',
    image: '',
  });
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setOpenAddDialog(false);
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategorySelect = (category: string) => {
    setProductDetails({
      ...productDetails,
      category,
    });
    setAnchorEl(null); // Close the menu after selection
  };

  const saveProductDetails=async()=>{
    console.log("Saving data...",productDetails);

    const responseData= await axios.post('http://localhost:8000/groceries',productDetails);
    console.log("Added Data Successfully!!!!!",responseData);
    setOpenAddDialog(null)
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Product Details</DialogTitle>

        <DialogContent>
          {/* Category Section */}
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 2 }}>
            <Typography sx={{ flexShrink: 0 }}>Category</Typography>
            <TextField required
              id="name"
              name="name"
              label="Enter name of the product"
              type="text"
              variant="standard"
              value={productDetails.category}
              fullWidth onClick={handleClick} / >
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleCategorySelect('Electronics')}>Electronics</MenuItem>
              <MenuItem onClick={() => handleCategorySelect('Clothing')}>Clothing</MenuItem>
              <MenuItem onClick={() => handleCategorySelect('Food')}>Food</MenuItem>
            </Menu>
          </Box>

          {/* Name Section */}
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 2 }}>
            <Typography sx={{ flexShrink: 0 ,marginRight:'20px'}}>Name</Typography>
            <TextField
              required
              margin="dense"
              id="name"
              name="name"
              label="Enter name of the product"
              type="text"
              variant="standard"
              fullWidth
              value={productDetails.name}
              onChange={(e) =>
                setProductDetails({ ...productDetails, name: e.target.value })
              }
            />
          </Box>

          {/* Image Section */}
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 2 }}>
            <Typography sx={{ flexShrink: 0,marginRight:'20px' }}>Image</Typography>
            <TextField
              required
              margin="dense"
              id="image"
              name="image"
              label="Upload product image"
              type="text"
              variant="standard"
              fullWidth
              value={productDetails.image}
              onChange={(e) => setProductDetails({ ...productDetails, image: e.target.value })}
            />
          </Box>

          {/* Price Section */}
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 2 }}>
            <Typography sx={{ flexShrink: 0,marginRight:'20px' }}>Price</Typography>
            <TextField
              required
              margin="dense"
              id="price"
              name="price"
              label="Enter price of the product"
              type="number"
              variant="standard"
              fullWidth
              value={productDetails.price}
              onChange={(e) =>
                setProductDetails({ ...productDetails, price: parseFloat(e.target.value) })
              }
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 2 }}>
            <Typography sx={{ flexShrink: 0 ,marginRight:'20px'}}>Stock</Typography>
            <TextField
              required
              margin="dense"
              id="stock"
              name="stock"
              label="Enter stock of the product"
              type="number"
              variant="standard"
              fullWidth
              value={productDetails.stock}
              onChange={(e) =>
                setProductDetails({ ...productDetails, stock: e.target.value })
              }
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 2 }}>
            <Typography sx={{ flexShrink: 0 ,marginRight:'20px'}}>Unit</Typography>
            <TextField
              required
              margin="dense"
              id="unit"
              name="unit"
              label="Enter unit of the product"
              type="text"
              variant="standard"
              fullWidth
              value={productDetails.unit}
              onChange={(e) =>
                setProductDetails({ ...productDetails, unit: e.target.value })
              }
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveProductDetails}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddProduct;
