import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: "حساب دقيق للزكاة",
      description: "احسب زكاتك وفقاً للمذاهب الإسلامية المعتمدة",
      icon: "📊"
    },
    {
      title: "واجهة سهلة الاستخدام",
      description: "تصميم بسيط ومفهوم لجميع الفئات العمرية",
      icon: "💻"
    },
    {
      title: "حماية البيانات",
      description: "أمان عالي وخصوصية تامة للمعلومات المالية",
      icon: "🔒"
    },
    {
      title: "إرشادات شرعية",
      description: "معلومات موثقة ومراجع شرعية معتمدة",
      icon: "📚"
    }
  ];

  const services = [
    {
      title: "زكاة الأموال النقدية",
      description: "احسب زكاة النقود والودائع البنكية",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      title: "زكاة الذهب والفضة",
      description: "حساب زكاة المجوهرات والمعادن النفيسة",
      color: "from-amber-500 to-amber-600"
    },
    {
      title: "زكاة التجارة",
      description: "زكاة البضائع وعروض التجارة",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "زكاة الشركات",
      description: "حساب زكاة الأسهم والشركات التجارية",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const testimonials = [
    {
      name: "أحمد محمد",
      role: "رجل أعمال",
      content: "منصة ممتازة ودقيقة في الحسابات، سهلت علي كثيراً حساب زكاة أموالي",
      rating: 5
    },
    {
      name: "فاطمة العلي",
      role: "ربة منزل",
      content: "واجهة بسيطة وسهلة، استطعت حساب زكاة مجوهراتي بكل يسر",
      rating: 5
    },
    {
      name: "عبدالله السالم",
      role: "تاجر",
      content: "معلومات شرعية موثقة ودقة في الحسابات، أنصح الجميع باستخدامها",
      rating: 5
    }
  ];

  const newsItems = [
    {
      date: "2025-01-15",
      title: "تحديث جديد في حاسبة الزكاة يشمل المعايير المحدثة",
      excerpt: "أضافت المنصة معايير جديدة لحساب الزكاة وفقاً لآخر الفتاوى الشرعية المعتمدة..."
    },
    {
      date: "2025-01-10", 
      title: "ورشة تعليمية مجانية حول أحكام زكاة الأموال",
      excerpt: "تنظم المنصة ورشة تعليمية مجانية للتعريف بأحكام الزكاة وطرق حسابها الصحيحة..."
    },
    {
      date: "2025-01-05",
      title: "إطلاق خدمة الاستشارات الشرعية المجانية",
      excerpt: "يمكن للمستخدمين الآن الحصول على استشارات شرعية مجانية حول أحكام الزكاة..."
    }
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ز</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-800">حاسبة الزكاة</h1>
                <p className="text-xs text-gray-500">منصة موثوقة لحساب الزكاة</p>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
              <Link to="/" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">الرئيسية</Link>
              <Link to="/calculator" className="text-gray-600 hover:text-emerald-600 transition-colors">احسب الزكاة</Link>
              <Link to="/about" className="text-gray-600 hover:text-emerald-600 transition-colors">عن الزكاة</Link>
              <Link to="/guide" className="text-gray-600 hover:text-emerald-600 transition-colors">دليل الاستخدام</Link>
              <Link to="/contact" className="text-gray-600 hover:text-emerald-600 transition-colors">اتصل بنا</Link>
            </nav>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Link 
                to="/calculator" 
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-all duration-300 font-semibold"
              >
                احسب الآن
              </Link>
              <button className="lg:hidden p-2">
                <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
                <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
                <div className="w-6 h-0.5 bg-gray-600"></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                احسب زكاتك
                <span className="block text-yellow-400">بدقة وسهولة</span>
              </h1>
              <p className="text-lg lg:text-xl mb-8 text-emerald-100 leading-relaxed">
                منصة شاملة وموثوقة لحساب الزكاة وفقاً للأحكام الشرعية المعتمدة، 
                مع إرشادات مفصلة وحسابات دقيقة لجميع أنواع الأموال
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/calculator" 
                  className="bg-yellow-500 text-emerald-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  ابدأ الحساب الآن
                </Link>
                <Link 
                  to="/about" 
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-emerald-900 transition-all duration-300"
                >
                  تعلم عن الزكاة
                </Link>
              </div>
              <div className="flex items-center justify-center lg:justify-start mt-8 space-x-6 space-x-reverse text-sm text-emerald-200">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full ml-2"></span>
                  مجاني تماماً
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full ml-2"></span>
                  دقيق وموثوق
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full ml-2"></span>
                  آمن ومحمي
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-center">حساب سريع للزكاة</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">المبلغ الإجمالي (د.ج)</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="أدخل المبلغ"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">نوع المال</label>
                    <select className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
                      <option value="">اختر نوع المال</option>
                      <option value="cash">نقود</option>
                      <option value="gold">ذهب</option>
                      <option value="trade">تجارة</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-yellow-500 text-emerald-900 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                  >
                    احسب الزكاة
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              لماذا تختار منصتنا؟
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              نقدم لك أفضل الخدمات لحساب الزكاة بدقة وموثوقية عالية
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              خدماتنا المتنوعة
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              احسب زكاة جميع أنواع الأموال والممتلكات
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link 
                key={index} 
                to="/calculator"
                className="group"
              >
                <div className={`bg-gradient-to-br ${service.color} rounded-2xl p-6 text-white transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl`}>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-white/90 leading-relaxed">{service.description}</p>
                  <div className="mt-4 flex items-center text-white/80 group-hover:text-white transition-colors">
                    <span className="ml-2">احسب الآن</span>
                    <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl lg:text-5xl font-bold">10,000+</div>
              <div className="text-emerald-200">مستخدم راضي</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl lg:text-5xl font-bold">50,000+</div>
              <div className="text-emerald-200">عملية حساب</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl lg:text-5xl font-bold">99.9%</div>
              <div className="text-emerald-200">دقة الحسابات</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl lg:text-5xl font-bold">24/7</div>
              <div className="text-emerald-200">خدمة مستمرة</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              ماذا يقول عملاؤنا؟
            </h2>
            <p className="text-lg text-gray-600">
              آراء وتجارب حقيقية من مستخدمي المنصة
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News/Blog Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                آخر الأخبار والمقالات
              </h2>
              <p className="text-lg text-gray-600">
                ابق على اطلاع بآخر التحديثات والمقالات المفيدة
              </p>
            </div>
            <Link 
              to="/news" 
              className="self-start md:self-center mt-4 md:mt-0 text-emerald-600 hover:text-emerald-700 font-semibold flex items-center"
            >
              <span className="ml-2">عرض الكل</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <article key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="text-sm text-emerald-600 mb-2">{new Date(item.date).toLocaleDateString('ar-SA')}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.excerpt}</p>
                  <Link 
                    to="/news" 
                    className="inline-flex items-center mt-4 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                  >
                    <span className="ml-2">اقرأ المزيد</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            ابدأ بحساب زكاتك اليوم
          </h2>
          <p className="text-lg lg:text-xl mb-8 text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            انضم إلى آلاف المستخدمين الذين يثقون في منصتنا لحساب زكاة أموالهم بدقة وموثوقية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/calculator" 
              className="bg-yellow-500 text-emerald-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
            >
              احسب زكاتك الآن
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-emerald-900 transition-all duration-300"
            >
              تحدث معنا
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center ml-3">
                  <span className="text-white font-bold text-lg">ز</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl">حاسبة الزكاة</h3>
                  <p className="text-sm text-gray-400">منصة موثوقة لحساب الزكاة</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                نساعدك على حساب زكاتك بدقة وسهولة وفقاً للأحكام الشرعية المعتمدة
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">الخدمات</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/calculator" className="hover:text-emerald-400 transition-colors">حاسبة الزكاة</Link></li>
                <li><Link to="/gold" className="hover:text-emerald-400 transition-colors">زكاة الذهب</Link></li>
                <li><Link to="/money" className="hover:text-emerald-400 transition-colors">زكاة الأموال</Link></li>
                <li><Link to="/trade" className="hover:text-emerald-400 transition-colors">زكاة التجارة</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">المعلومات</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/about" className="hover:text-emerald-400 transition-colors">عن الزكاة</Link></li>
                <li><Link to="/guide" className="hover:text-emerald-400 transition-colors">دليل الاستخدام</Link></li>
                <li><Link to="/faq" className="hover:text-emerald-400 transition-colors">الأسئلة الشائعة</Link></li>
                <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">الشروط والأحكام</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">تواصل معنا</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="ml-2">📧</span>
                  info@zakatcalculator.dz
                </li>
                <li className="flex items-center">
                  <span className="ml-2">📱</span>
                  +213 XXX XXX XXX
                </li>
                <li className="flex items-center">
                  <span className="ml-2">📍</span>
                  الجزائر العاصمة، الجزائر
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="text-center md:text-right">
                <p className="text-gray-400">
                  &copy; 2025 حاسبة الزكاة. جميع الحقوق محفوظة.
                </p>
              </div>
              <div className="flex justify-center md:justify-start space-x-6 space-x-reverse mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  <span className="sr-only">فيسبوك</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  <span className="sr-only">تويتر</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  <span className="sr-only">إنستغرام</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.752 13.63 3.752 12.017c0-1.614.446-2.879 1.374-3.676.875-.807 2.026-1.297 3.323-1.297 1.297 0 2.448.49 3.323 1.297.928.797 1.374 2.062 1.374 3.676 0 1.613-.446 2.878-1.374 3.674-.875.807-2.026 1.297-3.323 1.297zm7.83-9.363c-.446 0-.807-.361-.807-.807 0-.446.361-.807.807-.807.446 0 .807.361.807.807 0 .446-.361.807-.807.807zm-4.262 1.374c-1.613 0-2.878 1.297-2.878 2.878 0 1.613 1.265 2.878 2.878 2.878 1.613 0 2.878-1.265 2.878-2.878 0-1.581-1.265-2.878-2.878-2.878z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  <span className="sr-only">يوتيوب</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .text-4xl {
            font-size: 2rem;
          }
          
          .text-6xl {
            font-size: 2.5rem;
          }
          
          .py-16 {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
          
          .py-24 {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }
          
          .px-8 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
          
          .py-4 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          
          .grid {
            gap: 1.5rem;
          }
          
          .space-x-8 > :not([hidden]) ~ :not([hidden]) {
            margin-right: 1rem;
            margin-left: 0;
          }
          
          .rounded-2xl {
            border-radius: 1rem;
          }
          
          .shadow-2xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
        }
        
        @media (max-width: 460px) {
          .text-3xl {
            font-size: 1.5rem !important;
          }
          
          .text-4xl {
            font-size: 1.75rem !important;
          }
          
          .text-5xl {
            font-size: 2rem !important;
          }
          
          .text-6xl {
            font-size: 2.25rem !important;
          }
          
          .text-lg {
            font-size: 1rem !important;
          }
          
          .text-xl {
            font-size: 1.125rem !important;
          }
          
          .py-16 {
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }
          
          .py-20 {
            padding-top: 2.5rem !important;
            padding-bottom: 2.5rem !important;
          }
          
          .py-24 {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }
          
          .px-4 {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
          
          .px-6 {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          
          .px-8 {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }
          
          .py-3 {
            padding-top: 0.625rem !important;
            padding-bottom: 0.625rem !important;
          }
          
          .py-4 {
            padding-top: 0.75rem !important;
            padding-bottom: 0.75rem !important;
          }
          
          .mb-6 {
            margin-bottom: 1rem !important;
          }
          
          .mb-8 {
            margin-bottom: 1.5rem !important;
          }
          
          .mb-12 {
            margin-bottom: 2rem !important;
          }
          
          .p-6 {
            padding: 1rem !important;
          }
          
          .p-8 {
            padding: 1.25rem !important;
          }
          
          .gap-4 {
            gap: 0.75rem !important;
          }
          
          .gap-6 {
            gap: 1rem !important;
          }
          
          .gap-8 {
            gap: 1.5rem !important;
          }
          
          .space-y-4 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 0.75rem !important;
          }
          
          .space-y-6 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 1rem !important;
          }
          
          .rounded-xl {
            border-radius: 0.75rem !important;
          }
          
          .rounded-2xl {
            border-radius: 1rem !important;
          }
          
          .w-16 {
            width: 3rem !important;
          }
          
          .h-16 {
            height: 3rem !important;
          }
          
          .w-10 {
            width: 2rem !important;
          }
          
          .h-10 {
            height: 2rem !important;
          }
          
          .text-2xl {
            font-size: 1.25rem !important;
          }
          
          .leading-tight {
            line-height: 1.25 !important;
          }
          
          .leading-relaxed {
            line-height: 1.5 !important;
          }
        }
        
        /* Custom animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
    </div>
  );
};

export default HomePage;