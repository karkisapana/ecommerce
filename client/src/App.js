import {Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import About from './pages/About';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import ForgotPasssword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import PrivateRoute from './components/Routes/AdminRoute';
import Dashboard from './pages/user/Dashboard';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';


import React from 'react'

const App = () => {
  return (
   
  

    <Routes>
        <Route path="/" element={<HomePage />} />

        
          <Route path="/dashboard" element={<PrivateRoute />} >
          <Route path="user" element = {<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
          </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />

          <Route path="admin/users" element={<Users />} />
        </Route>


      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPasssword />} />
      <Route path='/login' element={<Login />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/policy' element={<Policy />} />
      <Route path='*' element={<Pagenotfound/>} />
      <Route path='/about' element={<About />} />

      </Routes>
  )
}

export default App

