import { WarninIcon } from '@/assets/Svg/WarninIcon';
import {Money} from "@/assets/icons/Money"
import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { formatNumber } from './CalForm';
import { ZakatContext } from "../../../Components/ZakatProvider";
import { useLanguage } from '@/Components/LanguageProvider';

export const GoldPrice = () => {
  const { language, t } = useLanguage();
  const NISSAB_GOLD_GRAMS = 85;
  const [goldPricePerGram, setGoldPricePerGram] = useState("");
  const {nissab, setNissab} = useContext(ZakatContext);
  
  const calculateNissab = () => {
    const goldPrice = parseFloat(goldPricePerGram.replace(/,/g, ""));
    if (goldPrice > 0) {
      const calculatedNissab = goldPrice * NISSAB_GOLD_GRAMS;
      setNissab(calculatedNissab);
      return calculatedNissab;
    }
    return 0;
  };

  useEffect(() => {
    calculateNissab();
  }, [goldPricePerGram]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  const handleGoldPriceChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(value) && value >= 0) {
      setGoldPricePerGram(value);
    }
  };

  return (
    <div className="mx-auto px-6 mb-8 max-[515px]:px-0">
      <div className="priceGold max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-6 shadow-lg max-[515px]:p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`bg-yellow-100 p-3 rounded-full ${language === 'ar' ? 'ml-4' : 'mr-4'}`}>
                <span className="text-2xl"><Money></Money></span>
              </div>
              <div>
                <h3 className="font-bold text-yellow-800 mb-2 text-lg max-[515px]:text-sm">
                  {t('goldPrice.title')}
                </h3>
                
                {/* Gold Price Input */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-yellow-800 mb-2">
                    {t('goldPrice.inputLabel')}
                  </label>
                  <div className="relative max-w-xs">
                    <input
                      type="text"
                      value={formatNumber(goldPricePerGram)}
                      onChange={handleGoldPriceChange}
                      className={`w-full px-4 py-3 bg-white border border-yellow-300 rounded-lg ${language === 'ar' ? 'text-right' : 'text-left'} focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200  max-[515px]:p-2 max-[515px]:text-xs`}
                      placeholder={t('goldPrice.placeholder')}
                    />
                    <span className={`absolute ${language === 'ar' ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-yellow-600 text-sm font-medium`}>
                      {language === 'ar' ? 'د.ج' : 'DZD'}
                    </span>
                  </div>
                </div>

                {/* Nissab Display */}
                {goldPricePerGram && parseFloat(goldPricePerGram.replace(/,/g, "")) > 0 && (
                  <div className="bg-yellow-100/50 border border-yellow-300 rounded-lg p-4">
                    <div className="space-y-2">
                      <p className="text-yellow-800 text-sm">
                        <span className="font-semibold">{t('goldPrice.pricePerGram')}:</span> {formatCurrency(parseFloat(goldPricePerGram.replace(/,/g, "")))}
                      </p>
                      <p className="text-yellow-800 text-sm">
                        <span className="font-semibold">{t('goldPrice.nissab')} (85 {t('goldPrice.grams')}):</span> {formatCurrency(nissab)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Information about gold price */}
          <div className="mt-4 pt-4 border-t border-yellow-200 ">
            <p className={`text-yellow-700 text-xs flex items-center `}>
              <span className={language === 'ar' ? 'ml-2' : 'mr-2'}>
                <WarninIcon></WarninIcon>
              </span>
              {t('goldPrice.infoText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}