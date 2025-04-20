import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Used to redirect after logout

  const handleLogout = () => {
    // Clear auth data (example: token stored in localStorage)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Redirect to login or home
    navigate("/"); // Change to "/" if you want to go to the home page
  };

  return (
    <header dir="rtl" className="bg-green-900 py-2 text-white shadow-md fixed top-0 w-full z-1000">
      <nav className="bg-green-900 py-3 flex">
        <div className="mx-auto flex flex-wrap jmd:justify-start gap-6 text-[1em]">
          <button
            onClick={handleLogout}
            className="absolute right-5 px-5 py-2 bg-green-400 rounded-3xl hover:bg-green-500"
          >
            تسجيل الخروج
          </button>

          {[
            { path: "/Home", label: "الرئيسية" },
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

        <Link
          to="/home"
          className="text-3xl ml-7 md:text-1xl font-bold tracking-wide hover:text-green-300 transition duration-300"
        >
          أوقاف
        </Link>
      </nav>
    </header>
  );
};
