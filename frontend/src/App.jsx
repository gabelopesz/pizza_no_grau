import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SideMenu from "./presentation/Components/Menu/SideMenu";
import MyAccount from "./presentation/pages/account/MyAccount";
import AddCategory from "./presentation/pages/categories/AddCategory";
import CategoriesCrud from "./presentation/pages/categories/CategoriesCrud";
import EditCategory from "./presentation/pages/categories/EditCategory";
import Menu from "./presentation/pages/menu/Menu";
import SobrePizzaria from "./presentation/pages/pizzaria/SobrePizzaria";
import AddProduct from "./presentation/pages/products/AddProduct";
import EditProduct from "./presentation/pages/products/EditProduct";
import ProductCRUD from "./presentation/pages/products/ProductCRUD";
import AddUser from "./presentation/pages/users/AddUser";
import EditUser from "./presentation/pages/users/EditUser";
import UserCRUD from "./presentation/pages/users/UserCRUD";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <SideMenu />
        <div className="content-container">
          <SideMenu />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/categories" element={<CategoriesCrud />} />
              <Route path="/add-categories" element={<AddCategory />} />
              <Route path="/edit-category/:id" element={<EditCategory />} />
              <Route path="/users" element={<UserCRUD />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/edit-user/:id" element={<EditUser />} />
              <Route path="/products" element={<ProductCRUD />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              <Route path="/account" element={<MyAccount />} />
              <Route path="/pizzaria" element={<SobrePizzaria />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;