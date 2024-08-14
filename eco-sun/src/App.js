import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdminHome from './pages/AdminHome';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Categories from './pages/Categories';
import AddCategory from './pages/AddCategory';
import AddProduct from './pages/AddProduct';
import ManageUsers from './pages/ManageUsers';
import Orders from './pages/Orders';
import ContactUs from './pages/ContactUs';
import Payment from './pages/Payment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { UserContext } from './UserContext';
import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={user?.role === 'admin' ? <AdminHome /> : <Home />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
