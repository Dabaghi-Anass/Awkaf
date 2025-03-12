import * as React from 'react';
import { useContext ,useState} from 'react';
import { ZakatContext } from '../Components/ZakatProvider';
import { ZakatPrice } from './ZakatPrice';

export const CalForm = () => {
    const { zakatFormInfos, setZakatFormInfos, setIsUnnaire, calculateZakat, showResault } = useContext(ZakatContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const rawValue = value.replace(/,/g, "");
        if (!isNaN(rawValue) && rawValue >= 0) {
            setZakatFormInfos(prev => ({ ...prev, [name]: rawValue }));
        }
    };

    const formatNumber = (num) => (!num ? "" : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    return (
        <div className="flex flex-col mt-15">
            <form className=" mx-auto h-[35em] w-[40em] bg-[#035116] rounded-3xl shadow-md py-5 px-10 truncate overflow-y-auto"
                onSubmit={(e) => { e.preventDefault(); calculateZakat(); }}>
                <h1 className="text-center py-3 mb-5 text-5xl font-bold text-white">حاسبة الزكاة</h1>

                {/* Input Fields */}
                {[
                    { label: "السيولة النقدية", name: "liquidites" },
                    { label: "المخزون المعد للبيع", name: "stocks" },
                    { label: "الاستثمارات", name: "investissements" },
                    { label: "الممتلكات للاستخدام الداخلي", name: "bienUsageInterne" },
                    { label: "الأصول المؤجرة", name: "bienLocation" },
                    { label: "الديون المستحقة على العملاء", name: "creancesClients" },
                    { label: "الأموال غير المتاحة", name: "fondsNonDispo" },
                    { label: "المخزون غير القابل للبيع", name: "stocksInvendable" }
                ].map(({ label, name }) => (
                    <div className="flex flex-col gap-1 mb-5" key={name}>
                        <label className="text-yellow-400 text-[1em]">{label}</label>
                        <div className="relative w-full">
                            <input
                                className="cal-input w-full p-2 border border-gray-500 rounded-md pr-10 text-right"
                                type="text"
                                name={name}
                                min={0}
                                value={formatNumber(zakatFormInfos[name])}
                                onChange={handleChange}
                                placeholder='00,000'
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">د.إ</span>
                        </div>
                    </div>
                ))}

                {/* Select Dropdown */}
                <div className="flex flex-col gap-1 mb-5">
                    <label className="text-yellow-400 text-[1em]">نوع الحول</label>
                    <select
                        className="cal-input w-full p-2 border border-gray-500 rounded-md mt-1"
                        onChange={(e) => setIsUnnaire(e.target.value === "هجري")}
                    >
                        <option value="ميلادي">ميلادي</option>
                        <option value="هجري">هجري</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button className="text-center py-2 px-6 w-1/2 rounded-md mx-auto mt-8 block bg-amber-400 text-2xl font-bold"
                    type="submit"  onClick={(e) => { e.preventDefault(); calculateZakat(); }}>
                    
                    حساب الزكاة
                </button>
            </form>

            {/* Display Zakat Result */}
            {showResault && <ZakatPrice />}
        </div>
    );
};

