
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../Components/Loader";
 // chemin selon ton organisation
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
export const AdminLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    secretKey: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false); // ← ajout du state de chargement

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOtpChange = (e) => {
    setOtpCode(e.target.value);
    setOtpError("");
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
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/apif/admin/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          secret_key: data.secretKey,
        }),
      });

      const result = await response.json();
      

      if (response.ok && result.message === "OTP sent to your email. Enter OTP to proceed.") {
        setOtpSent(true);
        alert("OTP sent to your email. Enter it below.");
      } else if (result.access && result.refresh) {
        localStorage.setItem("accessToken", result.access);
        localStorage.setItem("refreshToken", result.refresh);
        navigate("/DashboardAdmin");
      } else {
        alert(result.detail || "Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!otpCode.trim()) {
      setOtpError("يرجى إدخال رمز OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/apif/admin/verify/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: data.username, otp: otpCode }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", result.access_token);
        localStorage.setItem("refreshToken", result.refresh_token);

        const meResponse = await fetch("http://127.0.0.1:8000/apif/me/", {
          headers: {
            Authorization: `Bearer ${result.access_token}`,
          },
        });

        if (!meResponse.ok) {
          alert("Failed to get user info.");
          return;
        }

        const userInfo = await meResponse.json();

        if (userInfo.is_staff) {
          navigate("/DashboardAdmin");
        } else {
          navigate("/home");
        }
      } else {
        setOtpError(result.error || "فشل التحقق من OTP!");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      setOtpError("حدث خطأ أثناء التحقق من OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Affiche le loader pendant le chargement
  if (loading) return <Loader />;

  return (
    <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[22em]">
        <h2 className="text-[1.2em] font-bold text-center text-gray-700 mb-6">
          {otpSent ? "تحقق من OTP" : "تسجيل دخول المشرف"}
        </h2>
        <form onSubmit={otpSent ? handleOtpSubmit : handleSubmit} noValidate className="space-y-4">
          {!otpSent ? (
            <>
              <div>
                <label className="block text-[0.8em] text-gray-600 mb-1">إسم المستخدم</label>
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  className="w-full px-3 py-1 custom-input"
                />
                {formErrors.username && <p className="text-red-500 text-[0.7em] mt-1">{formErrors.username}</p>}
              </div>
              <div>
                <label className="block text-[0.8em] text-gray-600 mb-1">كلمة المرور</label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="w-full px-3 py-1 custom-input"
                />
                {formErrors.password && <p className="text-red-500 text-[0.7em] mt-1">{formErrors.password}</p>}
                <Link className="text-[0.7em] text-green-600 hover:underline block mt-1" to="/forgot-password">نسيت كلمة المرور؟</Link>
              </div>
              <div>
                <label className="block text-[0.8em] text-gray-600 mb-1">المفتاح السري</label>
                <input
                  type="password"
                  name="secretKey"
                  value={data.secretKey}
                  onChange={handleChange}
                  className="w-full px-3 py-1 custom-input"
                />
                {formErrors.secretKey && <p className="text-red-500 text-[0.7em] mt-1">{formErrors.secretKey}</p>}
              </div>
              <button type="submit" className="w-full custom-button py-1 rounded-[5px]">
                تسجيل الدخول
              </button>
            </>
          ) : (
            <>
               <div className="max-w-md mx-auto p-6 space-y-4">
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
                            <InputOTPSlot index={0} className="w-10 h-10 text-lg border-gray-300 " />
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
                            
                            className="w-full b custom-button py-2 rounded-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading || otpCode.length !== 6}
                        >
                            {loading ? "جاري التحقق..." : "تحقق من OTP"}
                        </button>
                </div>
              
            </>
          )}
        </form>
      </div>
    </div>
  );
};
