import React, { useContext, useState } from "react";
import { ZakatContext } from "./ZakatProvider";
import ZakatDetails from "./ZakatDetails"; // Import the new component

export const ZakatPrice = () => {
    const { zakatFormInfos, setShowResult, saveZakatHistory } = useContext(ZakatContext);
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="bg-green-800 w-1/2 mx-auto h-fit rounded-2xl pb-10 mt-10 p-5">
            <h1 className="relative text-center pt-10 text-3xl font-extrabold text-white after:content-[''] after:h-1 after:w-3/4 after:bg-amber-300 after:absolute after:-bottom-5 after:left-1/2 after:-translate-x-1/2 after:rounded-3xl">
                قيمة الزكاة الواجبة على شركتكم
            </h1>

            <h1 className="text-center pt-10 text-5xl font-extrabold text-white my-5">
                {zakatFormInfos.zakatAmount} د.ج
            </h1>

            <div className="flex justify-center gap-5 mt-8">
                <button className="bg-amber-300 py-2 w-1/3 px-5 rounded-lg font-bold" onClick={saveZakatHistory}>
                    تأكيد
                </button>
                <button className="bg-red-500 py-2 w-1/3 px-5 rounded-lg font-bold text-white" onClick={() => setShowResult(false)}>
                    إلغاء
                </button>
            </div>

            {/* Button to Show Calculation Details */}
            <div className="flex justify-center mt-4">
                <button className="bg-blue-500 py-2 px-6 rounded-lg text-white font-bold hover:bg-blue-600 transition" onClick={() => setShowDetails(true)}>
                    عرض التفاصيل
                </button>
            </div>

            {/* Show Details Modal */}
            {showDetails && <ZakatDetails zakatFormInfos={zakatFormInfos} onClose={() => setShowDetails(false)} />}
        </div>
    );
};
