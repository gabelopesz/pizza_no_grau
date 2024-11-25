import Menu from "./Components/Menu/Menu";
import UserCrud from "./Components/UserCrud/UserCrud";
import ProductsCrud from "./Components/ProductsCrud/ProductsCrud";
import CouponCrud from "./Components/CouponCrud/CouponCrud";
import CategoriesCrud from "./Components/CategoriesCrud/CategoriesCrud";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="" element={<Menu />} />
      <Route path="/user" element={<UserCrud />} />
      <Route path="/products" element={<ProductsCrud />} />
      <Route path="/coupon" element={<CouponCrud />} />
      <Route path="/categories" element={<CategoriesCrud />} />

      
    </Routes>
  </Router>
  );
}

export default App;