import { Outlet } from "react-router";
import Header from "src/components/Header";

const Layout = () => {
  return (
    <div className="bg-primary h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
