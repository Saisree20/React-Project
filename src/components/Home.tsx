import { Button, FormControl, FormHelperText, FormLabel, Select, TextField } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate=useNavigate();
  return (
    <div style={{marginTop:'10%'}}>
       <FormControl defaultValue="" required>
      <FormLabel sx={{display:'flex',justifyContent:'flex-start'}}>Name</FormLabel>
      <TextField placeholder="Write your name here" />
      <FormLabel sx={{display:'flex',justifyContent:'flex-start'}}>Role</FormLabel>
      <Select defaultValue={10} onChange={(e)=>console.log("You have selected=>",e.target.value)
      }>
    <option value={1}>Admin</option>
    <option value={2}>Customer</option>
    <option value={3}>Supplier</option>

    </Select>
    <Button sx={{marginTop:'15px',backgroundColor:'#19d263',color:'white'}} onClick={()=>navigate('/groceries')}>Login</Button>
    </FormControl>
    </div>
  )
}

export default Home