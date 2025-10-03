import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons for mobile toggle

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const navLinks = [
    { path: "/Home", label: "الرئيسية" },
    { path: "/About", label: "عن الزكاة" },
    { path: "/ZakatCalculator", label: "حاسبة الزكاة" },
    { path: "/Awkaf", label: "مشاريع الوقف" },
    { path: "/Contact", label: "تواصل مباشرة معنا" },
    { path: "/userhistory/", label: "تاريخ الزكاة" },
    { path: "/userInfos", label: "معلومات المستخدم" },
  ];

  return (
    <header
      dir="rtl"
      className="bg-gradient-to-r from-green-600 via-emerald-700 to-teal-800 text-white shadow-md fixed pb-2 top-0 w-full z-50"
    >
      <nav className="navbar flex items-center justify-between px-4 py-3 md:px-8 ">
        {/* Logo */}
        <Link
          to="/home"
          className="text-2xl logo md:text-3xl font-bold tracking-wide hover:text-green-300 transition duration-300"
        >
          أوقاف
        </Link>

        {/* Desktop Navigation */}
        <div className="navlinks hidden   mx-auto md:flex items-center gap-6">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`link  relative text-[0.9em] hover:text-green-300 transition duration-300 ${
                location.pathname === path ? "text-green-300 font-semibold" : ""
              }`}
            >
              {label}
              {location.pathname === path && (
                <span className="absolute top-6 left-0 w-full h-0.5 bg-green-300 "></span>
              )}
            </Link>
          ))}
          
        </div>
        <button
            onClick={handleLogout}
            className="max-md:hidden text-[0.8em] logout px-5 py-2 bg-green-400 rounded-3xl hover:bg-green-500 transition"
          >
            تسجيل الخروج
          </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[rgba(0,0,0,.1)] backdrop-blur-[50px] flex flex-col items-center gap-5 py-4">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsOpen(false)}
              className={`w-full  text-center  text-[0.8em] hover:text-green-300 transition duration-300 ${
                location.pathname === path ? "text-green-300 font-semibold" : ""
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="text-[0.8em] px-3 py-2 bg-green-400 rounded-3xl hover:bg-green-500 transition"
          >
            تسجيل الخروج
          </button>
        </div>
      )}
    </header>
  );
};
