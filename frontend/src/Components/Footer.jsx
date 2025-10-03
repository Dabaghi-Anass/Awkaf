import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-green-900 to-green-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fillOpacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Partners Section */}
      <div className="relative border-b border-gray-700/50">
        <div className="container mx-auto px-6 py-16" dir="rtl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              شركاؤنا المميزون
            </h2>
            <div className="w-24 h-1 bg-green-400 mx-auto rounded-full"></div>
            <p className="text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
              نفتخر بشراكتنا مع المؤسسات الرائدة في خدمة المجتمع
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Partner 1 */}
            <div className="group">
              <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-white mb-2">
                  مصرف السلام
                </h3>
                <p className="text-gray-300 text-center">
                  شريك مصرفي موثوق في الخدمات المالية الإسلامية
                </p>
              </div>
            </div>

            {/* Partner 2 */}
            <div className="group">
              <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-white mb-2">
                  وزارة الشؤون الدينية والأوقاف
                </h3>
                <p className="text-gray-300 text-center">
                  الجهة الرسمية المشرفة على الأوقاف والشؤون الدينية
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        <div className="container mx-auto px-6 py-16" dir="rtl">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Platform Info */}
            <div className="lg:col-span-1">
              <div className="mb-8">
                <div className="flex items-center justify-start mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center ml-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">منصة الزكاة</h2>
                </div>
                <h1 className="text-3xl font-bold text-white leading-tight mb-6">
                  منصة حساب زكاة الشركات<br />
                  وتوجيهها للوقف والتنمية
                </h1>
                <p className="text-gray-300 leading-relaxed text-lg">
                  منصة إسلامية متخصصة في حساب وتوجيه الزكاة لخدمة المجتمع وتحقيق التنمية المستدامة
                </p>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">تابعونا</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300 group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1200 1227" fill="none"><g clipPath="url(#clip0_1_2)"><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="black"/></g><defs><clipPath id="clip0_1_2"><rect width="1200" height="1227" fill="white"/></clipPath></defs></svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors duration-300 group">
                    <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                 
                  <a href="#" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300 group">
                    <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact & Links */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-8">
                
                {/* Contact Information */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <svg className="w-6 h-6 ml-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    للتواصل معنا
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center group">
                      <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center ml-4 group-hover:bg-green-600/30 transition-colors">
                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">رقم الهاتف</p>
                        <p className="text-white font-semibold text-lg">06666666</p>
                      </div>
                    </div>

                    <div className="flex items-center group">
                      <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center ml-4 group-hover:bg-blue-600/30 transition-colors">
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">البريد الإلكتروني</p>
                        <p className="text-white font-semibold text-lg">Email@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-center group">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center ml-4 group-hover:bg-purple-600/30 transition-colors">
                        <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">العنوان</p>
                        <p className="text-white font-semibold text-lg">الجزائر العاصمة</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <svg className="w-6 h-6 ml-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    خدماتنا
                  </h3>
                  
                  <nav>
                    <ul className="space-y-3">
                      {[
                        { to: '/', label: 'الرئيسية',  },
                        { to: '/About', label: 'عن الزكاة',  },
                        { to: '/ZakatCalculator', label: 'حاسبة الزكاة',  },
                        { to: '/Awkaf', label: 'مشاريع الوقف',  },
                        { to: '/Contact', label: 'اتصل بنا',  }
                      ].map((link, index) => (
                        <li key={index}>
                          <Link
                            to={link.to}
                            className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group py-2"
                          >
                            
                            <span className="font-medium group-hover:translate-x-2 transition-transform">
                              {link.label}
                            </span>
                            <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700/50 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-right" dir="rtl">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">
                © 2024 منصة الزكاة. جميع الحقوق محفوظة
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                سياسة الخصوصية
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}