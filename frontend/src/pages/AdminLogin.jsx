import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../Components/Loader";
import { MessagePopup } from "../Components/MessagePopup";
import { useApi } from "@/ApiProvider";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export const AdminLogin = () => {
  const api = useApi();
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    username: "",
    password: "",
    secretKey: "",
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const errors = {};
    if (!data.username.trim()) errors.username = "إسم المستخدم مطلوب!";
    if (!data.password.trim()) errors.password = "كلمة المرور مطلوبة!";
    if (!data.secretKey.trim()) errors.secretKey = "المفتاح السري مطلوب!";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateFields();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      setPopup({ message: "تحقق من المدخلات", type: "error" });
      return;
    }

    setLoading(true);

    // ✅ Use ApiProvider for POST request
    const [result, status, error] = await api.post("/admin/login/", {
      username: data.username,
      password: data.password,
      secret_key: data.secretKey,
    });

    if (!error && status >= 200 && status < 300) {
      if (result.message === "OTP sent to your email. Enter OTP to proceed.") {
        setOtpSent(true);
        setPopup({ 
          message: "تم إرسال رمز OTP إلى بريدك الإلكتروني.", 
          type: "success" 
        });
      } else if (result.access && result.refresh) {
        // Direct login without OTP
        localStorage.setItem("accessToken", result.access);
        localStorage.setItem("refreshToken", result.refresh);
        setPopup({ 
          message: "تم تسجيل الدخول بنجاح", 
          type: "success" 
        });
        setTimeout(() => navigate("/DashboardAdmin"), 1000);
      } else {
        setPopup({ 
          message: result.detail || "فشل تسجيل الدخول", 
          type: "error" 
        });
      }
    } else {
      console.error("Login failed:", error || result);
      
      // Handle specific errors
      let errorMessage = "حدث خطأ أثناء تسجيل الدخول.";
      
      if (result && result.error) {
        if (result.error === "Invalid admin credentials") {
          errorMessage = "بيانات اعتماد المسؤول غير صحيحة";
        } else if (result.error === "User is not verified. Please verify your email first.") {
          errorMessage = "المستخدم غير موثق. يرجى التحقق من بريدك الإلكتروني أولاً";
        } else if (result.error === "Invalid password") {
          errorMessage = "كلمة المرور غير صحيحة";
        } else if (result.error === "Invalid secret key") {
          errorMessage = "المفتاح السري غير صحيح";
        } else {
          errorMessage = result.error;
        }
      }
      
      setPopup({ 
        message: errorMessage, 
        type: "error" 
      });
    }

    setLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    if (!otpCode.trim() || otpCode.length !== 6) {
      setPopup({ 
        message: "يرجى إدخال رمز OTP صحيح (6 أرقام).", 
        type: "error" 
      });
      return;
    }

    setLoading(true);

    // ✅ Use ApiProvider for OTP verification
    const [result, status, error] = await api.post("/admin/verify/", {
      username: data.username,
      otp: otpCode,
    });

    if (!error && status >= 200 && status < 300) {
      

      setPopup({ 
        message: "تم التحقق من OTP بنجاح!", 
        type: "success" 
      });

      // Navigate to admin dashboard after successful verification
       navigate("/DashboardAdmin")
    } else {
      console.error("OTP verification failed:", error || result);
      
      // Handle specific OTP errors
      let errorMessage = "فشل التحقق من OTP!";
      
      if (result && result.error) {
        if (result.error === "Invalid username") {
          errorMessage = "اسم المستخدم غير صحيح";
        } else if (result.error === "Invalid or expired OTP") {
          errorMessage = "رمز OTP غير صحيح أو منتهي الصلاحية";
        } else if (result.error === "OTP has expired. Request a new one.") {
          errorMessage = "انتهت صلاحية رمز OTP. يرجى طلب رمز جديد";
          setOtpSent(false); // Reset to login form
          setOtpCode("");
        } else if (result.error === "Invalid OTP") {
          errorMessage = "رمز OTP غير صحيح";
        } else {
          errorMessage = result.error;
        }
      }
      

      setPopup({ 
        message: errorMessage, 
        type: "error" 
      });
    }

    setLoading(false);
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setOtpCode("");

    const [result, status, error] = await api.post("/admin/login/", {
      username: data.username,
      password: data.password,
      secret_key: data.secretKey,
    });

    if (!error && status >= 200 && status < 300) {
      setPopup({ 
        message: "تم إرسال رمز OTP جديد إلى بريدك الإلكتروني.", 
        type: "success" 
      });
    } else {
      setPopup({ 
        message: "فشل إرسال رمز OTP. حاول مرة أخرى.", 
        type: "error" 
      });
    }

    setLoading(false);
  };

  // Show loader while loading
  

  return (
    <>
      <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[22em]">
          <h2 className="text-[1.2em] font-bold text-center text-gray-700 mb-6">
            {otpSent ? "تحقق من OTP" : "تسجيل دخول المشرف"}
          </h2>
          
          <form 
            onSubmit={otpSent ? handleOtpSubmit : handleSubmit} 
            noValidate 
            className="space-y-4"
          >
            {!otpSent ? (
              <>
                <div>
                  <label className="block text-[0.8em] text-gray-600 mb-1">
                    إسم المستخدم
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                    className="w-full px-3 py-2 custom-input"
                  />
                  {formErrors.username && (
                    <p className="text-red-500 text-[0.7em] mt-1">
                      {formErrors.username}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[0.8em] text-gray-600 mb-1">
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 custom-input"
                  />
                  {formErrors.password && (
                    <p className="text-red-500 text-[0.7em] mt-1">
                      {formErrors.password}
                    </p>
                  )}
                  <Link 
                    className="text-[0.7em] text-green-600 hover:underline block mt-1" 
                    to="/forgot-password"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                <div>
                  <label className="block text-[0.8em] text-gray-600 mb-1">
                    المفتاح السري
                  </label>
                  <input
                    type="password"
                    name="secretKey"
                    value={data.secretKey}
                    onChange={handleChange}
                    className="w-full px-3 py-2 custom-input"
                  />
                  {formErrors.secretKey && (
                    <p className="text-red-500 text-[0.7em] mt-1">
                      {formErrors.secretKey}
                    </p>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="w-full custom-button py-2 rounded-[5px]"
                  disabled={loading}
                >
                  {loading ? "جاري التحميل..." : "تسجيل الدخول"}
                </button>
              </>
            ) : (
              <>
                <div className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="block text-[0.8em] text-gray-600 mb-2">
                      أدخل رمز OTP
                    </label>
                    <div className="flex justify-center" dir="ltr">
                      <InputOTP 
                        maxLength={6} 
                        value={otpCode}
                        onChange={(value) => setOtpCode(value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="w-10 h-10 text-lg border-gray-300" />
                          <InputOTPSlot index={1} className="w-10 h-10 text-lg border-gray-300" />
                          <InputOTPSlot index={2} className="w-10 h-10 text-lg border-gray-300" />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} className="w-10 h-10 text-lg border-gray-300" />
                          <InputOTPSlot index={4} className="w-10 h-10 text-lg border-gray-300" />
                          <InputOTPSlot index={5} className="w-10 h-10 text-lg border-gray-300" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full custom-button py-2 rounded-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading || otpCode.length !== 6}
                  >
                    {loading ? "جاري التحقق..." : "تحقق من OTP"}
                  </button>

                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="w-full text-center text-[0.8em] text-green-600 hover:underline"
                    disabled={loading}
                  >
                    إعادة إرسال رمز OTP
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtpCode("");
                    }}
                    className="w-full text-center text-[0.8em] text-gray-600 hover:underline"
                  >
                    العودة إلى تسجيل الدخول
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      <MessagePopup
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: "", type: "" })}
      />
    </>
  );
};