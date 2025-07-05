import Footer from "./home/Footer";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import Navbar from "./home/Navbar";
const AppLayout = ({ children }) => {
  const {pathname} = useLocation()
  const hiddenRoutes = ['/register', '/login']
  const hideNavbar = hiddenRoutes.includes(pathname)

  return (
    <div className={`${hideNavbar ? ' bg-gray-100' : 'bg-black'}`}>
        {!hideNavbar && <Navbar />}
        <main className={`max-w-[1440px] w-[90%] ${hideNavbar ? ' bg-gray-100' : 'bg-black'} mx-auto`}>{children}</main>
        <ToastContainer />
        {!hideNavbar && <Footer />}
    </div>
  );
};

export default AppLayout;
