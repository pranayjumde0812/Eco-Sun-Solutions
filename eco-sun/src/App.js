import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import AdminHome from './pages/AdminHome';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Categories from './pages/Categories';
import AddCategory from './pages/AddCategory';
import AddProduct from './pages/AddProduct';
import ManageUsers from './pages/ManageUsers';
// import Orders from './pages/Orders';
import ContactUs from './pages/ContactUs';
import Payment from './pages/Payment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './context/ProtectedRoute';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import MyOrders from './components/MyOrders';
import PaymentPage from './components/PaymentPage'; // Adjust the path if necessary

import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<ProtectedRoute element={<Home />} role="CUSTOMER" />} />
            <Route path="/admin" element={<ProtectedRoute element={<AdminHome />} role="ADMIN" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/categories" element={<ProtectedRoute element={<Categories />} role="ADMIN" />} />
            <Route path="/add-category" element={<ProtectedRoute element={<AddCategory />} role="ADMIN" />} />
            <Route path="/add-product" element={<ProtectedRoute element={<AddProduct />} role="ADMIN" />} />
            <Route path="/manage-users" element={<ProtectedRoute element={<ManageUsers />} role="ADMIN" />} />

            {/* <Route path="/orders" element={<ProtectedRoute element={<Orders />} role="CUSTOMER" />} /> */}
            
            <Route path="/payment" element={<PaymentPage />} />
        <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/products" element={<ProtectedRoute element={<ProductList />} role="CUSTOMER" />} />
            <Route path="/products/:id" element={<ProtectedRoute element={<ProductDetail />} role="CUSTOMER" />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/payment" element={<ProtectedRoute element={<Payment />} role="CUSTOMER" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;