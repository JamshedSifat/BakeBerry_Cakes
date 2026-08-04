import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const MainLayouts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top */}
      <Navbar />

      {/* Middle */}
      <main className=" mt-16 flex-1">
        <Outlet />
      </main>

      {/* Bottom */}
      <Footer />
    </div>
  );
};

export default MainLayouts;