


import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/UserContext";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const [openSideMenu, setOpenSideMenu] = useState(true);

  return (
    <div>
      <Navbar openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} />

      {user && (
        <div className="flex min-h-[calc(100vh-61px)]">
          {/* Sidebar: hidden on small screens unless open */}
          <div
            className={`fixed lg:static top-[61px] left-0 z-20 bg-white transition-all duration-300 ${
              openSideMenu ? 'block w-64' : 'hidden'
            }`}
          >
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main content area */}
          <div
            className={`grow p-6 transition-all duration-300 ${
              openSideMenu ? '   lg:ml-10' : ''
            }`}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;



