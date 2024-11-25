import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CategoriesCrud from "./presentation/pages/CategoriesCrud.jsx";
import AddCategory from "./presentation/pages/AddCategory.jsx";
import EditCategory from "./presentation/pages/EditCategory.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redireciona a rota raiz para /categories */}
        <Route path="/" element={<Navigate to="/categories" />} />

        {/* Página principal de gerenciamento de categorias */}
        <Route path="/categories" element={<CategoriesCrud />} />

        {/* Página para adicionar uma nova categoria */}
        <Route path="/add-category" element={<AddCategory />} />

        {/* Página para editar uma categoria existente */}
        <Route path="/edit-category/:id" element={<EditCategory />} />
      </Routes>
    </Router>
  );
};

export default App;
