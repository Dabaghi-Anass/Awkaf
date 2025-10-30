import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useApi } from '@/ApiProvider';

export const Header = () => {
  const api = useApi();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const handleLogout = async () => {
    await api.post('/logout/');
    setIsOpen(false);
    navigate('/');
  };
  const fetchUserInfo = async () => {
    try {
      const [data, status, error] = await api.get('/me/');
      if (error) throw new Error('فشل تحميل معلومات المستخدم.');
      setCurrentUser((prev) => ({
        ...prev,
        username: data.username || '',
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        email: data.email || '',
      }));
    } catch (err) {
      console.error(err);
      setPopup({ message: 'حدث خطاء', type: 'error' });
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const navLinks = [
    { path: '/Home', label: 'الرئيسية' },
    { path: '/About', label: 'عن الزكاة' },
    { path: '/ZakatCalculator', label: 'حاسبة الزكاة' },
    { path: '/Awkaf', label: 'مشاريع الوقف' },
    { path: '/Contact', label: 'تواصل مباشرة معنا' },
    { path: '/userhistory/', label: 'تاريخ الزكاة' },
    { path: '/userInfos', label: 'معلومات المستخدم' },
  ];
  const timeoutRef = React.useRef(null);
  return (
    <header
      dir='rtl'
      className='bg-gradient-to-r from-green-600 via-emerald-700 to-teal-800 text-white shadow-md fixed top-0 w-full z-50'
    >
      <nav className=' flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4'>
        {/* Logo */}
        <Link
          to='/home'
          className='text-xl sm:text-2xl md:text-3xl font-bold tracking-wide hover:text-green-200 transition-colors duration-300 flex-shrink-0'
        >
          أوقاف
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden  lg:flex items-center gap-2 lg:gap-6 mx-auto'>
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`relative px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-all duration-300 hover:text-green-200 ${
                location.pathname === path ? 'text-green-200' : ''
              }`}
            >
              {label}
              {location.pathname === path && (
                <span className='absolute bottom-0 right-0 left-0 h-0.5 bg-green-200 transition-all duration-300' />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Logout Button */}
        <div className='relative hidden md:block flex-shrink-0'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='px-4 lg:px-6 py-2 bg-green-700 hover:bg-green-800 rounded-full font-medium transition-all duration-300 hover:shadow-lg flex items-center gap-2'
          >
            <span>
              {currentUser?.first_name} {currentUser?.last_name}
            </span>
            <Menu size={18} />
          </button>

          {isOpen && (
            <>
              <div
                className='fixed inset-0 z-40'
                onClick={() => setIsOpen(false)}
              />
              <div
                className='absolute left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-lg z-50 py-2'
                onMouseLeave={() => {
                  timeoutRef.current = setTimeout(() => {
                    setIsOpen(false);
                  }, 2000);
                }}
                onMouseEnter={() => {
                  clearTimeout(timeoutRef.current);
                }}
              >
                <div className='px-4 py-3 border-b border-gray-200'>
                  <p className='font-semibold'>
                    {currentUser?.first_name} {currentUser?.last_name}
                  </p>
                  <p className='text-xs text-gray-500'>{currentUser?.email}</p>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className='w-full text-right px-4 py-2 hover:bg-red-50 text-red-600 font-medium transition-colors duration-200'
                >
                  تسجيل الخروج
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden p-2 hover:bg-green-700/50 rounded-lg transition-colors duration-300 flex-shrink-0'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle menu'
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='bg-gradient-to-b from-green-700/90 to-teal-800/90 backdrop-blur-md border-t border-green-500/30 px-3 py-3 space-y-2'>
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsOpen(false)}
              className={`block w-full text-right px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                location.pathname === path
                  ? 'bg-green-400/30 text-green-200 font-semibold'
                  : 'text-white hover:bg-green-600/50'
              }`}
            >
              {label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className='w-full text-sm px-4 py-2.5 mt-3 bg-green-400 hover:bg-green-500 text-gray-900 font-semibold rounded-lg transition-all duration-200 hover:shadow-lg'
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </header>
  );
};
