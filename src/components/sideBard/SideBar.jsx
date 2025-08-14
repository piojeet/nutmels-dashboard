import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { LuUserCheck } from "react-icons/lu";
import { IoCubeOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from 'react-icons/hi';
import { CiGlobe, CiSettings } from 'react-icons/ci';
import { FiBarChart2 } from 'react-icons/fi';

function SideBar() {
  const location = useLocation();

  // Helper to apply active color
  const isActive = (path) => location.pathname === path ? "text-yellow-color" : "";

  // Menu config
  const menuItems = [
    { path: "/", label: "Home", icon: <GridViewRoundedIcon className="text-[25px]" /> },
    { path: "/order", label: "Order", icon: <ShoppingCartOutlinedIcon className="text-[25px]" /> },
    { path: "/crm-customer-profile", label: "CRM", icon: <LuUserCheck size={25} /> },
    { path: "/products", label: "Product", icon: <IoCubeOutline size={25} /> },
    { path: "/blog", label: "Blog", icon: <HiOutlineClipboardList size={25} /> },
    { path: "/seo", label: "UI/SEO", icon: <CiGlobe size={25} /> },
    { path: "/reports", label: "Reports", icon: <FiBarChart2 size={25} /> },
    { path: "/settings", label: "Setting", icon: <CiSettings size={25} /> },
  ];

  return (
    <div>
      <ul className="flex flex-col gap-6">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path} className="flex flex-col items-center gap-2">
              <span className={`size-[45px] bg-black-color/50 backdrop-blur-xl text-white-color/50 flex items-center justify-center rounded-xl cursor-pointer shadow-side-bar ${isActive(item.path)}`}>
                {item.icon}
              </span>
              <span className={`text-white-color/50 ${isActive(item.path)}`}>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
