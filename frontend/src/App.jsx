import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CategoriesCrud from "./presentation/pages/CategoriesCrud.jsx";
import AddCategory from "./presentation/pages/AddCategory.jsx";
import EditCategory from "./presentation/pages/EditCategory.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/categories" />} />
        <Route path="/categories" element={<CategoriesCrud />} />
        <Route path="/add-categories" element={<AddCategory />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
      </Routes>
    </Router>
  );
};

export default App;
