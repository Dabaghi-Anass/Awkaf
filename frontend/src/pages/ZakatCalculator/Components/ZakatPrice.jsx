import React, { useContext, useState } from "react";
import { ZakatContext } from "../../../Components/ZakatProvider";
import { Trash } from "../../../assets/icons/trash";
import { Link } from "react-router-dom";
import { Printed } from "./Printed";
import { formatNumber } from "./CalForm";
import { useLanguage } from "@/Components/LanguageProvider";


export const today = new Date().toISOString().split("T")[0];

export const ZakatPrice = () => {
  const { language, t } = useLanguage();
  const { zakatFormInfos, setShowResult, saveZakatHistory, nissab } = useContext(ZakatContext);

  const zakatTax = (zakatFormInfos.zakatAmount * 1.26).toFixed(2);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50">
        <div className="bg-white rounded-xl shadow-xl max-[510px]:w-[70%] w-full max-w-[30em] relative overflow-hidden animate-scale-in fade-in zoom-in duration-300">
          
          {/* Header */}
          <div className="bg-green4 p-4 text-white relative">
            <h2 className="text-lg font-bold text-center max-[510px]:text-sm">
              {t('zakatResult.title')}
            </h2>
            <p className="text-emerald-100 text-center text-xs">
              {t('zakatResult.subtitle')}
            </p>
            
            {/* Close button */}
            <button
              className={`absolute top-2 ${language === 'ar' ? 'right-2' : 'left-2'} p-1 rounded-full transition`}
              onClick={() => setShowResult(false)}
            >
              <Trash width={30} fill={"#ffffff"} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 text-sm">
            {/* Zakat amounts */}
            <div className="space-y-3 mb-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex justify-between max-[510px]:justify-evenly max-[510px]:p-1 max-[510px]:rounded-sm">
                <span className="text-emerald-800 font-medium max-[510px]:text-xs">
                  {t('zakatResult.zakatAmount')}:
                </span>
                <span className="text-emerald-700 font-bold max-[510px]:text-xs">
                  {formatNumber(zakatFormInfos.zakatAmount)} {language === 'ar' ? 'د.ج' : 'DZD'}
                </span>
              </div>
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 flex justify-between max-[510px]:justify-evenly max-[510px]:p-1 max-[510px]:rounded-sm">
                <span className="text-rose-800 font-medium max-[510px]:text-xs">
                  {t('zakatResult.zakatWithTax')}:
                </span>
                <span className="text-rose-700 font-bold max-[510px]:text-xs">
                  {formatNumber(zakatTax)||0.00} {language === 'ar' ? 'د.ج' : 'DZD'}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between mx-auto bg-gray-200 p-2 rounded max-[510px]:text-xs max-[510px]:w-[80%]">
                <span>{t('zakatResult.nissabValue')}:</span>
                <span className="font-bold">{formatNumber(nissab)} {language === 'ar' ? 'د.ج' : 'DZD'}</span>
              </div>
              <div className="flex justify-between mx-auto bg-gray-200 p-2 rounded max-[510px]:text-xs max-[510px]:w-[80%]">
                <span>{t('zakatResult.zakatBase')}:</span>
                <span className="font-bold">{formatNumber(zakatFormInfos.totalAmount)} {language === 'ar' ? 'د.ج' : 'DZD'}</span>
              </div>
              <div className="flex justify-between mx-auto bg-gray-200 p-2 rounded max-[510px]:text-xs max-[510px]:w-[80%]">
                <span>{t('zakatResult.date')}:</span>
                <span className="font-bold">{today}</span>
              </div>
            </div>

            {/* Contact Notice */}
            <div className={`bg-blue-50 border border-blue-200 rounded p-2 mb-4 text-xs ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {t('zakatResult.contactNotice')}{" "}
              <Link to="/contact" className="text-green3 font-bold hover:underline">
                {t('zakatResult.contactUs')}
              </Link>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={saveZakatHistory}
                className="flex-1 custom-button py-2 rounded-sm"
              >
                {t('zakatResult.save')}
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 custom-button py-2 rounded-sm"
              >
                {t('zakatResult.print')}
              </button>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes scale-in {
            from {
              transform: scale(0.9);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-scale-in {
            animation: scale-in 0.2s ease-out;
          }
        `}</style>
      </div>

      <Printed />
    </>
  );
};