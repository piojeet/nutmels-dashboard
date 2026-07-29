import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { LuUserCheck } from 'react-icons/lu';
import { IoCubeOutline } from 'react-icons/io5';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { CiGlobe, CiSettings } from 'react-icons/ci';
import { FiBarChart2 } from 'react-icons/fi';

function SideBar({ mobile = false }) {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? 'text-yellow-color' : '');

  const menuItems = [
    { path: '/', label: 'Home', icon: <GridViewRoundedIcon className='text-[25px]' /> },
    { path: '/order', label: 'Order', icon: <ShoppingCartOutlinedIcon className='text-[25px]' /> },
    { path: '/crm-customer-profile', label: 'CRM', icon: <LuUserCheck size={25} /> },
    { path: '/products', label: 'Product', icon: <IoCubeOutline size={25} /> },
    { path: '/blog', label: 'Blog', icon: <HiOutlineClipboardList size={25} /> },
    { path: '/seo', label: 'UI/SEO', icon: <CiGlobe size={25} /> },
    { path: '/reports', label: 'Reports', icon: <FiBarChart2 size={25} /> },
    { path: '/setting', label: 'Setting', icon: <CiSettings size={25} /> },
  ];

  if (mobile) {
    return (
      <nav className='rounded-[24px] border border-white-color/10 bg-black-color/60 px-2 py-2 shadow-side-bar backdrop-blur-xl'>
        <ul className='flex items-center justify-between gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          {menuItems.map((item) => (
            <li key={item.path} className='flex-1'>
              <Link to={item.path} className='flex min-w-[68px] flex-col items-center gap-1 rounded-2xl px-2 py-2 text-center'>
                <span className={`flex size-10 items-center justify-center rounded-xl bg-black-color/50 text-white-color/50 shadow-side-bar ${isActive(item.path)}`}>
                  {item.icon}
                </span>
                <span className={`text-[11px] leading-4 text-white-color/50 ${isActive(item.path)}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <div>
      <ul className='flex flex-col gap-4'>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path} className='flex flex-col items-center gap-2'>
              <span className={`flex size-[35px] items-center justify-center rounded-xl bg-black-color/50 text-white-color/50 shadow-side-bar backdrop-blur-xl ${isActive(item.path)}`}>
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
