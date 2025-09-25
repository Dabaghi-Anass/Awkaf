

import React from 'react'

export const Hero = () => {
  return (
    <>
     <div className="relative mt-10 w-full min-h-[24rem] bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-2xl mb-4">
            الزكاة في الإسلام
          </h1>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-95 leading-relaxed max-w-3xl mx-auto">
            عن ابن عمر رضي الله عنهما، أن النبي صلى الله عليه وسلم قال:
            <br />
            <span className="font-semibold text-yellow-200">
              "بني الإسلام على خمس: شهادة أن لا إله إلا الله، وأن محمداً رسول الله، وإقام الصلاة، وإيتاء الزكاة، وحج البيت، وصوم رمضان"
            </span>
          </p>
          <p className="text-xs sm:text-sm opacity-80 mt-3">رواه البخاري ومسلم</p>
        </div>
      </div>
    </>
  )
}
