import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCategory from './presentation/pages/categories/AddCategory';
import EditCategory from './presentation/pages/categories/EditCategory';
import CategoriesCrud from './presentation/pages/categories/CategoriesCrud';
import AddUser from './presentation/pages/users/AddUser';
import EditUser from './presentation/pages/users/EditUser';
import UserCRUD from './presentation/pages/users/UserCRUD';
import AddProduct from './presentation/pages/products/AddProduct';
import EditProduct from './presentation/pages/products/EditProduct';
import ProductCRUD from './presentation/pages/products/ProductCRUD';
import Navbar from './presentation/Components/Navbar/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/categories" element={<CategoriesCrud />} />
        <Route path="/add-categories" element={<AddCategory />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
        <Route path="/users" element={<UserCRUD />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/product" element={<ProductCRUD />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />

      </Routes>
    </Router>
  );
};

const Home = () => <div>Home Page</div>;
const Menu = () => <div>Menu Page</div>;
const Usuarios = () => <div>Usuários Page</div>;
const Cupons = () => <div>Cupons Page</div>;
const Produtos = () => <div>Produtos Page</div>;

export default App;
