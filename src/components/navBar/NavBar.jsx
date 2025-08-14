import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Step 1
import logoDark from '../../assets/header-logo-nuts 1 (1).png';
import logoLight from '../../assets/header-logo-nuts 1.png';
import { LuSearch } from "react-icons/lu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiSunHorizonLight } from "react-icons/pi";
import { TbHazeMoon } from "react-icons/tb";
import user from '../../assets/Rectangle 1393.png';
import { FiChevronDown } from 'react-icons/fi';
import ThemeToggle from '../themetoggle/ThemeToggle';

function NavBar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate(); // ✅ Step 2

  const toggleMenu = () => setOpen(!open);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (item) => {
    setOpen(false);
    if (item === 'Profile') navigate('/profile');
    else if (item === 'Account') navigate('/account');
    else if (item === 'Dashboard') navigate('/dashboard');
    else if (item === 'Logout') navigate('/signup'); {
      // example logout action
      console.log('Logging out...');
    }
  };

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className='flex items-center justify-between py-4 relative'>
      <div>
        <img src={theme === 'dark' ? logoDark : logoLight} alt="logo" className="h-10 w-auto" />
      </div>

      <div className='flex items-center gap-3'>
        <button className='size-[45px] bg-black-color/50 backdrop-blur-xl text-white-color/50 flex items-center justify-center rounded-xl cursor-pointer shadow-side-bar'>
          <LuSearch strokeWidth={1.5} size={25} />
        </button>
        <Link to={""} className='size-[45px] bg-black-color/50 backdrop-blur-xl text-white-color/50 flex items-center justify-center rounded-xl cursor-pointer shadow-side-bar'>
          <IoIosNotificationsOutline strokeWidth={1.5} size={25} />
        </Link>
        <ThemeToggle />

        {/* User Profile */}
        <div className='relative' ref={menuRef}>
          <div onClick={toggleMenu} className='flex items-center gap-2 cursor-pointer'>
            <div className='size-[45px] overflow-hidden rounded-xl'>
              <img src={user} alt="User" className='w-full h-full object-cover' />
            </div>
            <div>
              <div className='font-inter-m text-white-color text-sm leading-[24px]'>Aman Priyadarshi</div>
              <div className='flex items-center gap-1 text-sm text-gray-500'>
                Admin <FiChevronDown strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Dropdown */}
          {open && (
            <ul className='absolute right-0 top-[60px] bg-white border shadow-md rounded-md w-40 py-2 z-50'>
              {settings.map((item) => (
                <li
                  key={item}
                  onClick={() => handleMenuClick(item)}
                  className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm'
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
