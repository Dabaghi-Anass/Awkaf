import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, ArrowRight } from 'lucide-react';
import { useApi } from '@/ApiProvider';
import { MessagePopup } from '@/Components/MessagePopup';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [popup, setPopup] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const api = useApi();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otpCode];
      newOtp[index] = value;
      setOtpCode(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username.trim()) {
      errors.username = 'اسم المستخدم مطلوب!';
    }
    if (!values.password.trim()) {
      errors.password = 'كلمة المرور مطلوبة!';
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validate(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);

    const [result, status, error] = await api.post('/token/', formData);

    if (!error && status >= 200 && status < 300) {
      if (result.message === 'OTP sent to your email. Enter OTP to proceed.') {
        setOtpSent(true);
        setPopup({
          message: 'تم إرسال رمز OTP إلى بريدك الإلكتروني.',
          type: 'success',
        });
      } else if (result.access && result.refresh) {
        setPopup({
          message: 'تم تسجيل الدخول بنجاح.',
          type: 'success',
        });
        localStorage.setItem('accessToken', result.access);
        localStorage.setItem('refreshToken', result.refresh);
        navigate('/Home');
      } else {
        setLoginError(result.detail || 'إسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } else if (status === 403) {
      setLoginError('حسابك غير مفعل. تحقق من بريدك الإلكتروني لتفعيل الحساب.');
    } else {
      console.error('Login failed:', error || result);
      console.log(error);
      setLoginError('حدث خطأ غير متوقع. حاول مرة أخرى لاحقًا.');
    }

    setIsLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    let otp = otpCode.join('');
    if (!otp.trim()) {
      alert('يرجى إدخال رمز OTP.');
      return;
    }

    setIsLoading(true);

    const body = {
      username: formData.username,
      otp: otp,
    };

    const [tokens, status, error] = await api.post('/token/verify/', body);

    if (!error && status >= 200 && status < 300) {
      setPopup({ message: 'تم التحقق من OTP بنجاح.', type: 'success' });
      navigate('/home');
    } else {
      console.error('OTP verification failed:', error || tokens);
      setPopup({
        message: 'فشل التحقق من OTP. حاول مرة أخرى.',
        type: 'error',
      });
    }

    setIsLoading(false);
  };
  return (
    <div
      className='min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50'
      dir='rtl'
    >
      <MessagePopup
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: '', type: '' })}
      />
      {/* Islamic Pattern Background */}
      <div className='absolute inset-0 opacity-5'>
        <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <pattern
              id='islamic-pattern'
              x='0'
              y='0'
              width='100'
              height='100'
              patternUnits='userSpaceOnUse'
            >
              <path
                d='M50 10 L60 30 L80 30 L65 42 L70 62 L50 50 L30 62 L35 42 L20 30 L40 30 Z'
                fill='#059669'
              />
              <circle
                cx='50'
                cy='50'
                r='15'
                fill='none'
                stroke='#059669'
                strokeWidth='2'
              />
              <path
                d='M50 0 L50 100 M0 50 L100 50'
                stroke='#059669'
                strokeWidth='1'
              />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#islamic-pattern)' />
        </svg>
      </div>

      <div className='relative z-10 flex items-center justify-center min-h-screen p-4'>
        <div className='w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center'>
          {/* Image Section */}
          <div className='hidden lg:flex flex-col items-center justify-center p-8'>
            <div className='relative w-full max-w-lg'>
              {/* Decorative Islamic Frame */}
              <div className='absolute -top-6 -right-6 w-24 h-24 border-t-4 border-r-4 border-emerald-600 rounded-tr-3xl'></div>
              <div className='absolute -bottom-6 -left-6 w-24 h-24 border-b-4 border-l-4 border-emerald-600 rounded-bl-3xl'></div>

              <div className='relative bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-8 shadow-2xl'>
                {/* Illustration */}
                <svg viewBox='0 0 400 400' className='w-full h-auto'>
                  {/* Background mosque silhouette */}
                  <path
                    d='M50 300 L50 200 L100 150 L150 200 L150 300 Z'
                    fill='#059669'
                    opacity='0.1'
                  />
                  <circle
                    cx='125'
                    cy='150'
                    r='20'
                    fill='#059669'
                    opacity='0.1'
                  />
                  <path
                    d='M250 300 L250 200 L300 150 L350 200 L350 300 Z'
                    fill='#059669'
                    opacity='0.1'
                  />
                  <circle
                    cx='325'
                    cy='150'
                    r='20'
                    fill='#059669'
                    opacity='0.1'
                  />

                  {/* Man giving charity */}
                  <ellipse
                    cx='160'
                    cy='320'
                    rx='40'
                    ry='8'
                    fill='#047857'
                    opacity='0.2'
                  />
                  <ellipse
                    cx='280'
                    cy='320'
                    rx='35'
                    ry='8'
                    fill='#047857'
                    opacity='0.2'
                  />

                  {/* Poor person (sitting) */}
                  <path
                    d='M260 280 L260 240 L280 230 L300 240 L300 280 Q290 290 280 290 Q270 290 260 280 Z'
                    fill='#065f46'
                  />
                  <circle cx='280' cy='215' r='18' fill='#8B4513' />
                  <path
                    d='M270 210 Q280 205 290 210'
                    stroke='#000'
                    strokeWidth='2'
                    fill='none'
                  />
                  <circle cx='275' cy='215' r='2' fill='#000' />
                  <circle cx='285' cy='215' r='2' fill='#000' />
                  <path
                    d='M280 225 Q280 228 280 230'
                    stroke='#000'
                    strokeWidth='1'
                    fill='none'
                  />
                  <path
                    d='M275 232 Q280 235 285 232'
                    stroke='#000'
                    strokeWidth='1.5'
                    fill='none'
                  />
                  <rect
                    x='255'
                    y='280'
                    width='50'
                    height='40'
                    rx='5'
                    fill='#d97706'
                  />

                  {/* Charitable person (standing) - with beard */}
                  <path
                    d='M140 200 L140 160 L160 150 L180 160 L180 200 L170 260 L150 260 Z'
                    fill='#047857'
                  />
                  <circle cx='160' cy='135' r='20' fill='#8B4513' />
                  {/* Beard */}
                  <path
                    d='M147 145 Q160 155 173 145 L173 152 Q160 160 147 152 Z'
                    fill='#654321'
                  />
                  <path
                    d='M150 130 Q160 125 170 130'
                    stroke='#000'
                    strokeWidth='2'
                    fill='none'
                  />
                  <circle cx='155' cy='135' r='2' fill='#000' />
                  <circle cx='165' cy='135' r='2' fill='#000' />
                  <path
                    d='M157 143 Q160 145 163 143'
                    stroke='#000'
                    strokeWidth='2'
                    fill='none'
                  />
                  {/* Thobe/Islamic dress */}
                  <rect
                    x='135'
                    y='200'
                    width='50'
                    height='60'
                    rx='5'
                    fill='#10b981'
                  />
                  <path
                    d='M155 160 Q155 180 180 200'
                    stroke='#8B4513'
                    strokeWidth='8'
                    strokeLinecap='round'
                    fill='none'
                  />

                  {/* Money/coins being given */}
                  <circle
                    cx='200'
                    cy='220'
                    r='12'
                    fill='#fbbf24'
                    stroke='#f59e0b'
                    strokeWidth='2'
                  />
                  <text
                    x='200'
                    y='225'
                    textAnchor='middle'
                    fontSize='16'
                    fill='#92400e'
                    fontWeight='bold'
                  >
                    $
                  </text>
                  <circle
                    cx='220'
                    cy='235'
                    r='10'
                    fill='#fbbf24'
                    stroke='#f59e0b'
                    strokeWidth='2'
                  />
                  <circle
                    cx='215'
                    cy='210'
                    r='8'
                    fill='#fbbf24'
                    stroke='#f59e0b'
                    strokeWidth='2'
                  />

                  {/* Hearts/blessings */}
                  <path
                    d='M180 120 Q180 110 190 110 Q200 110 200 120 Q200 110 210 110 Q220 110 220 120 Q220 135 200 150 Q180 135 180 120 Z'
                    fill='#ef4444'
                    opacity='0.6'
                  />
                </svg>

                <div className='mt-6 text-center'>
                  <h3 className='text-2xl font-bold text-emerald-800 mb-2'>
                    الصدقة تطفئ الخطيئة
                  </h3>
                  <p className='text-emerald-700 text-sm'>
                    مَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ
                    اللَّهِ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form Section */}
          <div className='w-full max-w-md mx-auto'>
            <div className='bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-emerald-100'>
              {/* Header with Islamic decoration */}
              <div className='bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white relative overflow-hidden'>
                <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16'></div>
                <div className='absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12'></div>
                <div className='relative z-10'>
                  <div className='flex justify-center mb-3'>
                    <div className='w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center'>
                      <svg
                        width='32'
                        height='32'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' />
                      </svg>
                    </div>
                  </div>
                  <h2 className='text-2xl font-bold text-center mb-1'>
                    {otpSent ? 'تحقق من الرمز' : 'تسجيل الدخول'}
                  </h2>
                  <p className='text-emerald-100 text-center text-sm'>
                    {otpSent
                      ? 'أدخل الرمز المرسل إلى بريدك'
                      : 'مرحباً بك مرة أخرى'}
                  </p>
                </div>
              </div>

              <div className='p-8'>
                {!otpSent ? (
                  <div className='space-y-5'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        اسم المستخدم
                      </label>
                      <div className='relative'>
                        <User className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                        <input
                          type='text'
                          name='username'
                          value={formData.username}
                          onChange={handleChange}
                          className='w-full pr-11 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition'
                          placeholder='أدخل اسم المستخدم'
                        />
                      </div>
                      {formErrors.username && (
                        <p className='text-red-500 text-xs mt-1 mr-1'>
                          {formErrors.username}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        كلمة المرور
                      </label>
                      <div className='relative'>
                        <Lock className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name='password'
                          value={formData.password}
                          onChange={handleChange}
                          className='w-full pr-11 pl-11 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition'
                          placeholder='أدخل كلمة المرور'
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                        >
                          {showPassword ? (
                            <EyeOff className='w-5 h-5' />
                          ) : (
                            <Eye className='w-5 h-5' />
                          )}
                        </button>
                      </div>
                      {formErrors.password && (
                        <p className='text-red-500 text-xs mt-1 mr-1'>
                          {formErrors.password}
                        </p>
                      )}
                      <Link
                        to='/forgot-password'
                        className='text-sm text-emerald-600 hover:text-emerald-700 font-medium mt-2 inline-block'
                      >
                        نسيت كلمة المرور؟
                      </Link>
                      {loginError && (
                        <p className='text-red-500 text-sm mt-2'>
                          {loginError}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className='w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                    >
                      {isLoading ? (
                        <div className='w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin'></div>
                      ) : (
                        <>
                          <span>تسجيل الدخول</span>
                          <ArrowRight className='w-5 h-5' />
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className='space-y-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-4 text-center'>
                        أدخل رمز التحقق المكون من 6 أرقام
                      </label>
                      <div className='flex gap-2 justify-center' dir='ltr'>
                        {otpCode.map((digit, index) => (
                          <input
                            key={index}
                            onPaste={() => {
                              if (index) return;
                              window.navigator.clipboard
                                .readText()
                                .then((otp) => {
                                  if (/^\d{6}$/.test(otp)) {
                                    const newOtp = otp.split('');
                                    setOtpCode(newOtp);
                                    document.getElementById('otp-5').focus();
                                  } else {
                                    alert('رمز OTP غير صالح.');
                                  }
                                });
                            }}
                            id={`otp-${index}`}
                            type='text'
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className='w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition'
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleOtpSubmit}
                      disabled={isLoading || otpCode.join('').length !== 6}
                      className='w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {isLoading ? 'جاري التحقق...' : 'تحقق من الرمز'}
                    </button>

                    <div className='space-y-2'>
                      <button
                        onClick={() => alert('تم إرسال رمز جديد')}
                        className='w-full text-emerald-600 hover:text-emerald-700 font-medium text-sm py-2'
                      >
                        إعادة إرسال الرمز
                      </button>
                      <button
                        onClick={() => {
                          setOtpSent(false);
                          setOtpCode(['', '', '', '', '', '']);
                        }}
                        className='w-full text-gray-600 hover:text-gray-700 font-medium text-sm py-2'
                      >
                        العودة إلى تسجيل الدخول
                      </button>
                    </div>
                  </div>
                )}

                <div className='mt-6 pt-6 border-t border-gray-200 text-center'>
                  <p className='text-gray-600 text-sm'>
                    لا تملك حساب؟{' '}
                    <Link
                      className='text-emerald-600 hover:text-emerald-700 font-semibold'
                      to='/register'
                    >
                      إنشاء حساب
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Quote */}
            <div className='mt-6 text-center'>
              <p className='text-emerald-800 text-sm font-medium px-4'>
                "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
