import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoDark from '../../assets/header-logo-nuts 1 (1).png';
import logoLight from '../../assets/header-logo-nuts 1.png';
import { LuSearch } from 'react-icons/lu';
import { IoIosNotificationsOutline } from 'react-icons/io';
import user from '../../assets/Rectangle 1393.png';
import { FiChevronDown } from 'react-icons/fi';
import ThemeToggle from '../themetoggle/ThemeToggle';

function NavBar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleMenuClick = (item) => {
    setOpen(false);

    if (item === 'Profile') navigate('/profile');
    else if (item === 'Account') navigate('/account');
    else if (item === 'Dashboard') navigate('/dashboard');
    else if (item === 'Logout') {
      navigate('/signup');
      console.log('Logging out...');
    }
  };

  return (
    <div className='relative flex flex-wrap items-center justify-between gap-3 py-3 sm:py-4'>
      <Link to='/' className='shrink-0'>
        <img src={theme === 'dark' ? logoDark : logoLight} alt='logo' className='h-8 w-auto sm:h-10' />
      </Link>

      <div className='ml-auto flex items-center gap-2 sm:gap-3'>
        <button className='flex size-10 items-center justify-center rounded-xl bg-black-color/50 text-white-color/50 shadow-side-bar backdrop-blur-xl sm:size-[45px]'>
          <LuSearch strokeWidth={1.5} size={22} />
        </button>

        <Link to='' className='flex size-10 items-center justify-center rounded-xl bg-black-color/50 text-white-color/50 shadow-side-bar backdrop-blur-xl sm:size-[45px]'>
          <IoIosNotificationsOutline strokeWidth={1.5} size={22} />
        </Link>

        <ThemeToggle />

        <div className='relative' ref={menuRef}>
          <button
            type='button'
            onClick={() => setOpen((previous) => !previous)}
            className='flex items-center gap-2 rounded-2xl border border-white-color/10 bg-black-color/30 px-2 py-1.5 backdrop-blur-xl sm:gap-3 sm:px-2.5'
          >
            <div className='size-10 overflow-hidden rounded-xl sm:size-[45px]'>
              <img src={user} alt='User' className='h-full w-full object-cover' />
            </div>

            <div className='hidden text-left sm:block'>
              <div className='text-sm leading-5 font-inter-m text-white-color'>Aman Priyadarshi</div>
              <div className='flex items-center gap-1 text-xs text-white-color/50'>
                Admin <FiChevronDown strokeWidth={1.5} />
              </div>
            </div>
          </button>

          {open && (
            <ul className='absolute right-0 top-[calc(100%+10px)] z-50 w-40 rounded-xl border border-white-color/10 bg-white-color px-2 py-2 text-black-color shadow-md'>
              {settings.map((item) => (
                <li key={item} onClick={() => handleMenuClick(item)} className='cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-black-color/5'>
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
