import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ZakatContext } from "./ZakatProvider";

export const ZakatPrice = () => {
    const { zakatFormInfos, setShowResault,saveZakatHistory } = useContext(ZakatContext);

    return (
        <div className="bg-[#035116] w-1/ mx-auto  h-fit rounded-2xl pb-10 mt-10 p-5">
            <h1 className="relative text-center pt-10 text-3xl font-extrabold text-white after:content-[''] after:h-1 after:w-3/4 after:bg-amber-300 after:absolute after:-bottom-5 after:left-1/2 after:-translate-x-1/2 after:rounded-3xl">
                قيمة الزكاة الواجبة على شركتكم
            </h1>

            <h1 className="text-center pt-10 text-5xl font-extrabold text-white my-5">
                {zakatFormInfos.zakatAmount} د.إ
            </h1>

            

            <div className="flex justify-center gap-5 mt-8">
                <button className="bg-amber-300 py-2 w-1/3 px-5 rounded-lg font-bold" onClick={ saveZakatHistory }>تأكيد</button>
                <button className="bg-red-500 py-2 w-1/3 px-5 rounded-lg font-bold text-white"  onClick={() => setShowResault(false)}>إلغاء</button>
            </div>

        </div>
    );
};

