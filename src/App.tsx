import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header.tsx';
import Content from './components/Content.tsx';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Home from './components/Home.tsx';
function App() {

  const [grocery,setGrocery]=useState([]);
  const getGrocery=async()=>{
  const responseData=  await fetch('http://localhost:8000/groceries');
  const result=await responseData.json();
  console.log("REsult=",result);
  
  setGrocery(result);
  }
  useEffect(()=>{
getGrocery();
  },[])
  return (
    <div className="App">
     <Router>
<Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/groceries' element={<Content/>}/>
      </Routes>
     </Router>
{/* <Content/> */}

    </div>
  );
}

export default App;
