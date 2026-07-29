import React, { useEffect, useState } from 'react';
import { PiSunHorizonLight } from 'react-icons/pi';
import { TbHazeMoon } from 'react-icons/tb';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Check localStorage on load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsDark(false);
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  // Handle toggle
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }

  };

  return (
    <button
      onClick={toggleTheme}
      className="size-[35px] bg-black-color/50 backdrop-blur-xl text-white-color/50 flex items-center justify-center rounded-xl cursor-pointer shadow-side-bar"
      title="Toggle Theme"
    >
      {isDark ? (
        <PiSunHorizonLight strokeWidth={1.5} size={20} />
      ) : (
        <TbHazeMoon strokeWidth={1.5} size={20} />
      )}
    </button>
  );
}
