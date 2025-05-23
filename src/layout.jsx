import { Outlet } from "react-router-dom";
import NextGenNavbar from "./Shared/NextGenNavbar";
import NextGenFooter from "./Shared/NextGenFooter";

function Layout() {
  return (
    <div className="font-sans antialiased text-gray-900 relative overflow-x-hidden min-h-screen flex flex-col">
      <NextGenNavbar />

      <main className="flex-grow">
        <Outlet /> {/* This is where child routes will render */}
      </main>

      <NextGenFooter />
    </div>
  );
}

export default Layout;
