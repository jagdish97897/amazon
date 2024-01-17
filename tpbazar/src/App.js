import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Nav from './Components/admin/nav/Nav';
import Sidebar from './Components/admin/sidebar/Sidebar';



import SubCategory from './Components/admin/subcategory/SubCategory';

import EditCategory from './Components/admin/category/EditCategory';
import EditSubCategory from './Components/admin/subcategory/EditSubCategory';
import Category from './Components/admin/category/Category';


function App() {
  return (
    <>
     
      <BrowserRouter>
      <Nav />
        <Routes>  
          <Route path='/' element={<Sidebar />}>
         
          <Route path='/' element={<Category />}></Route>
          <Route path='/editcategory/:pcategoryid' element={<EditCategory />}></Route>
          
          <Route path='/subcategory' element={<SubCategory />}></Route> 
          <Route path='/editsubcategory/:subcategoryid' element={<EditSubCategory />}></Route> 

          </Route> 

        </Routes>
      </BrowserRouter>
    </>
  )
  
}

export default App
