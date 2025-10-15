import { useLanguage } from "./LanguageProvider";




export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-2">
      <button
        onClick={() => setLanguage('ar')}
        className={`px-4 py-2 rounded-md font-medium transition-all ${
          language === 'ar'
            ? 'bg-emerald-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        العربية
      </button>
      <button
        onClick={() => setLanguage('fr')}
        className={`px-4 py-2 rounded-md font-medium transition-all ${
          language === 'fr'
            ? 'bg-emerald-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Français
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 rounded-md font-medium transition-all ${
          language === 'en'
            ? 'bg-emerald-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        English
      </button>
    </div>
  );
};