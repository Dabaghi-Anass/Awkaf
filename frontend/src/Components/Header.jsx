import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation(); // Get the current path

  return (
    <header dir="rtl" className="bg-green-900 text-white shadow-md mb-8 fixed top-0 w-full z-1000">
      {/* Top Section - Logo */}
      <div className="container mx-auto py-4 text-center bg-red md:text-right">
        <Link to="/" className="text-lg md:text-1xl font-medium tracking-wide hover:text-green-300 transition duration-300">
          منصة حساب زكاة الشركات وتوجيهها للوقف والتنمية
        </Link>
      </div>

      {/* Bottom Section - Navigation */}
      <nav className="bg-green-800 py-3">
        <div className="container mx-auto flex flex-wrap justify-center md:justify-start gap-6 text-[0.8em]">
          {[
            { path: "/", label: "الرئيسية" },
            { path: "/About", label: "عن الزكاة" },
            { path: "/ZakatCalculator", label: "حاسبة الزكاة" },
            { path: "/Awkaf", label: "مشاريع الوقف" },
            { path: "/Contact", label: "تواصل مباشرة معنا" },
            { path: "/userhistory/", label: "تاريخ الزكاة" },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`relative px-3 py-1 hover:text-green-300 transition duration-300 ${
                location.pathname === path ? "text-green-300 font-semibold" : ""
              }`}
            >
              {label}
              {location.pathname === path && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-green-300"></span>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

