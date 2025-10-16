import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageProvider";


Link

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <>
     <div className="flex justify-between px-5 my-4">
      <Link to="/ma7acil" className="my-3  inline-flex items-center gap-2 px-4 py-2 bg-green4 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
        حاسبة زكاة المحاصيل
        <span>→</span>
      </Link>
      <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-2">
     
      <button
        onClick={() => setLanguage('ar')}
        className={`px-4 py-2 rounded-md font-medium transition-all ${
          language === 'ar'
            ? 'bg-green4 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        العربية
      </button>
      <button
        onClick={() => setLanguage('fr')}
        className={`px-4 py-2 rounded-md font-medium transition-all ${
          language === 'fr'
            ? 'bg-green4 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Français
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 rounded-md font-medium transition-all ${
          language === 'en'
            ? 'bg-green4 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        English
      </button>
    </div>
     </div>
    </>
    
  );
};