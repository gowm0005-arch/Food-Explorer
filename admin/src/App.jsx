import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import Add from './pages/Add/Add'
import Addstore from './pages/Addstore/addstore'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Login from './pages/Login/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const isAuthenticated = () => localStorage.getItem('adminLoggedIn') === 'true'

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  return isAuthenticated()
    ? children
    : <Navigate replace state={{ from: location }} to="/login" />
}

const AdminLayout = () => (
  <>
    <Navbar />
    <hr />
    <div className="app-content">
      <Sidebar />
      <Routes>
        <Route path="add" element={<Add />} />
        <Route path="add-store" element={<Addstore />} />
        <Route path="list" element={<List />} />
        <Route path="orders" element={<Orders />} />
        <Route path="" element={<Navigate replace to="/list" />} />
      </Routes>
    </div>
  </>
)

const App = () => {
  return (
    <div className='app'>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
