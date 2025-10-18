import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageProvider";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languageOptions = [
    { code: 'ar', label: 'العربية' },
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
  ];

  const currentLanguage = languageOptions.find(opt => opt.code === language);

  const handleLanguageChange = (code) => {
    setLanguage(code);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0 px-4 sm:px-5 my-4">
        {/* Calculator Link */}
        <Link 
          to="/ma7acil" 
          className="w-full sm:w-auto my-3 inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-green4 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 text-sm sm:text-base"
        >
          حاسبة زكاة المحاصيل
          <span>→</span>
        </Link>

        {/* Language Switcher */}
        {/* Desktop View */}
        <div className="hidden sm:flex items-center gap-2 bg-white rounded-lg shadow-sm p-2">
          {languageOptions.map((option) => (
            <button
              key={option.code}
              onClick={() => handleLanguageChange(option.code)}
              className={`px-3 md:px-4 py-2 rounded-md font-medium transition-all text-sm md:text-base whitespace-nowrap ${
                language === option.code
                  ? 'bg-green4 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Mobile View - Dropdown */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-green4 text-white font-medium rounded-lg hover:shadow-lg transition-all"
          >
            <span className="text-sm">{currentLanguage?.label}</span>
            <ChevronDown 
              size={18} 
              className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 right-0 left-0 bg-white rounded-lg shadow-lg z-50 overflow-hidden border border-gray-200">
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  onClick={() => handleLanguageChange(option.code)}
                  className={`w-full px-4 py-3 text-left font-medium transition-all text-sm border-b border-gray-100 last:border-b-0 ${
                    language === option.code
                      ? 'bg-green4 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};