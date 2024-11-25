import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserCrud from "./presentation/pages/UserCRUD.jsx";
import AddUser from "./presentation/pages/AddUser.jsx";
import EditUser from "./presentation/pages/EditUser.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserCrud />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} /> {/* Rota para edição */}
      </Routes>
    </Router>
  );
}

export default App;
