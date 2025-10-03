import React, { useEffect, useState } from "react"
import { Header } from "../Components/Header"
import Footer from "../Components/Footer"
import { MessagePopup } from "@/Components/MessagePopup"


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
  const[isLoading,setIsLoading]=useState(false);
  const [error, setError] = useState({})
  const [activeTab, setActiveTab] = useState("account")
  const [popup,setPopup]=useState({message:'',type:''});

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
     setPopup({message:"لم يتم العثور على رمز الدخول.",type:"error"})
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
        setPopup({message:"حدث خطاء",type:"error"})
      }
    }

    fetchUserInfo()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validate = (values) => {
        const errors = {};
        if (!values.password.trim()) {
            errors.password = "كلمة المرور  الجديدة مطلوبة!";
        }
        if (!values.old_password.trim()) {
            errors.old_password =" كلمة المرور القديمة مطلوبة!";
        }
        return errors;
    };

  const handleSubmit = async (e) => {
    e.preventDefault()
   
   if(activeTab==="password"){
    const errors = validate(formData);
    setError(errors);
    if (Object.keys(errors).length > 0) return;
   }
    
   

    

    const token = localStorage.getItem("accessToken")
    if (!token) {
     setPopup({message:"لم يتم العثور على رمز الدخول.",type:"error"})

      return
    }

    if (formData.old_password && !formData.password) {
      setPopup({message:"يرجىادخال كلمة المرور",type:"error"})
      return
    }

   const payload = {}
  for (const key in formData) {
    if (formData[key]) payload[key] = formData[key]
  }

  // 🚨 Only keep password fields if on password tab
  if (activeTab !== "password") {
    delete payload.password
    delete payload.old_password
  }



    
    setIsLoading(true);
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
          setPopup({message:data.old_password,type:"error"})
        } else if (typeof data === "object") {
          const firstError = Object.values(data)[0]
          setPopup({message:firstError,type:"error"})
        } else {
          setPopup({message:data,type:"error"})
        }
        return
      }
      setIsLoading(false);

      setPopup({message:'تم تحديث البيانات بنجاح',type:'success'})
      setFormData((prev) => ({ ...prev, password: "", old_password: "" }))
    } catch (err) {
      setPopup({message:"حدث خطاء",type:"error"})
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
              <div className="bg-green4">
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
                        className=" w-1/2 custom-button py-2 rounded-sm"
                      >
                        {isLoading ? "جاري التحديث..." : "تحديث المعلومات"}
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
                        required
                          type="password"
                          name="old_password"
                          value={formData.old_password}
                          onChange={handleChange}
                          className="w-full px-4 py-3 custom-input"
                          placeholder="أدخل كلمة المرور الحالية"
                        />
                         {error.old_password && <p className="text-red-500 text-sm  mt-2">{error.old_password}</p>}
                      </div>
                     

                      <div>
                        <label className="custom-form-label  mb-2">
                          كلمة المرور الجديدة
                        </label>
                        <input
                        required
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full px-4 py-3 custom-input"
                          placeholder="أدخل كلمة المرور الجديدة"
                        />
                        {error.password && <p className="text-red-500 text-sm  mt-2">{error.password}</p>}
                      </div>
                      
                    </div>

                    <div className="pt-6 border-t text-center border-gray-200">
                      <button
                        onClick={handleSubmit}
                        className=" w-1/2 custom-button py-2 rounded-sm"
                      >
                        {isLoading ? "جاري التحديث..." : "تحديث كلمة المرور"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Messages */}
                 <MessagePopup
                   message={popup.message}
                   type={popup.type}
                   onClose={() => setPopup({ message: "", type: "" })}
                 />
               
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}