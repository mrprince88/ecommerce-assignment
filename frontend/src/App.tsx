import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cart from "src/pages/Cart";
import Home from "src/pages/Products";
import Layout from "src/layout";

import OrderConfirmation from "src/pages/OrderConfirmation";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="/order/confirmation" element={<OrderConfirmation />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
};

export default App;
