import React, { useEffect, useState } from "react"
import { Header } from "./Header"
import Footer from "./Footer"


// Mock components for demonstration


export const UserInfos = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    old_password: "",
    password: "",
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("account")

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      setError("لم يتم العثور على رمز الدخول.")
      return
    }

    const fetchUserInfo = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/apif/me/", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error("فشل تحميل معلومات المستخدم.")

        const data = await res.json()
        setFormData((prev) => ({
          ...prev,
          username: data.username || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
        }))
      } catch (err) {
        console.error(err)
        setError("تعذر جلب بيانات المستخدم.")
      }
    }

    fetchUserInfo()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")

    const token = localStorage.getItem("accessToken")
    if (!token) {
      setError("لم يتم العثور على رمز الدخول.")
      return
    }

    if (formData.old_password && !formData.password) {
      setError("يجب إدخال كلمة مرور جديدة إذا قمت بإدخال كلمة المرور القديمة.")
      return
    }

    const payload = {}
    for (const key in formData) {
      if (formData[key]) payload[key] = formData[key]
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/apif/user/update/", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.old_password) {
          setError(data.old_password[0])
        } else if (typeof data === "object") {
          const firstError = Object.values(data)[0]
          setError(Array.isArray(firstError) ? firstError[0] : firstError)
        } else {
          setError("فشل تحديث البيانات.")
        }
        return
      }

      setMessage("تم تحديث الملف الشخصي بنجاح.")
      setFormData((prev) => ({ ...prev, password: "", old_password: "" }))
    } catch (err) {
      setError("خطأ في الخادم.")
    }
  }

  return (
    <>
      <Header />
      
      <div className="min-h-screen my-8 bg-gradient-to-br from-gray-50 to-emerald-50 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto" dir="rtl">
            
            {/* Page Header */}
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">الملف الشخصي</h1>
              <p className="text-gray-600 text-lg">إدارة معلوماتك الشخصية وإعدادات الحساب</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              
              {/* Tab Headers */}
              <div className="bg-green2">
                <div className="flex rounded-xl bg-white/10 p-1">
                  <button
                    onClick={() => setActiveTab("account")}
                    className={`flex-1 py-2 px-4 mx-2 rounded-lg text-center text-[0.8em] font-semibold transition-all duration-200 ${
                      activeTab === "account"
                        ? "bg-white text-green3 shadow-lg"
                        : "text-white hover:bg-white/20"
                    }`}
                  >
                    معلومات الحساب
                  </button>
                  <button
                    onClick={() => setActiveTab("password")}
                    className={`flex-1 py-2 px-4 rounded-lg text-center text-[0.8em] font-semibold transition-all duration-200 ${
                      activeTab === "password"
                        ? "bg-white text-green3 shadow-lg"
                        : "text-white hover:bg-white/20"
                    }`}
                  >
                    كلمة المرور
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                
                {/* Account Tab */}
                {activeTab === "account" && (
                  <div className="space-y-6 ">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2"> معلومات الحساب</h2>
                      <p className="text-gray-600"> قم بتحديث معلومات حسابك.</p>
                    </div>
                   

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="custom-form-label mb-2">
                          اسم المستخدم
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="w-full px-4 py-3 custom-input"
                          placeholder="أدخل اسم المستخدم"
                        />
                      </div>

                      <div>
                        <label className="custom-form-label  mb-2">
                          البريد الإلكتروني
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 custom-input"
                          placeholder="أدخل البريد الإلكتروني"
                        />
                      </div>

                      <div>
                        <label className="custom-form-label  mb-2">
                          الاسم الأول
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 custom-input"
                          placeholder="أدخل الاسم الأول"
                        />
                      </div>

                      <div>
                        <label className="custom-form-label  mb-2">
                          الاسم الأخير
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 custom-input"
                          placeholder="أدخل الاسم الأخير"
                        />
                      </div>
                    </div>

                    <div className="pt-6 border-t text-center border-gray-200">
                      <button
                        onClick={handleSubmit}
                        className=" w-1/2 custom-button"
                      >
                        حفظ التغييرات
                      </button>
                    </div>
                  </div>
                )}

                {/* Password Tab */}
                {activeTab === "password" && (
                  <div className="space-y-6">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">تغيير كلمة المرور</h2>
                      <p className="text-gray-600">قم بإدخال كلمة المرور القديمة والجديدة</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="custom-form-label  mb-2">
                          كلمة المرور الحالية
                        </label>
                        <input
                          type="password"
                          name="old_password"
                          value={formData.old_password}
                          onChange={handleChange}
                          className="w-full px-4 py-3 custom-input"
                          placeholder="أدخل كلمة المرور الحالية"
                        />
                      </div>

                      <div>
                        <label className="custom-form-label  mb-2">
                          كلمة المرور الجديدة
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full px-4 py-3 custom-input"
                          placeholder="أدخل كلمة المرور الجديدة"
                        />
                      </div>
                    </div>

                    <div className="pt-6 border-t text-center border-gray-200">
                      <button
                        onClick={handleSubmit}
                        className=" w-1/2 custom-button"
                      >
                        تحديث كلمة المرور
                      </button>
                    </div>
                  </div>
                )}

                {/* Messages */}
                {message && (
                  <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-emerald-800 font-medium">{message}</p>
                  </div>
                )}
                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">{error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}