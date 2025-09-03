import React, { useEffect, useState } from "react"
import { Header } from "./Header"
import Footer from "./Footer"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

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
      <div dir="rtl" className="flex w-full max-w-lg flex-col gap-6 mx-auto mt-28">
        <Tabs defaultValue="account" dir="rtl">
          <TabsList className="flex justify-center bg-green-400">
            <TabsTrigger value="account">الحساب</TabsTrigger>
            <TabsTrigger value="password">كلمة المرور</TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account">
            <form onSubmit={handleSubmit}>
              <Card className={"border-green-400"}>
                <CardHeader>
                  <CardTitle>إعدادات الحساب</CardTitle>
                  <CardDescription>
                    قم بتحديث معلومات حسابك ثم اضغط على زر الحفظ.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">اسم المستخدم</Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="first_name">الاسم الأول</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last_name">الاسم الأخير</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="submit">حفظ التغييرات</Button>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>

          {/* Password Tab */}
          <TabsContent value="password">
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>تغيير كلمة المرور</CardTitle>
                  <CardDescription>
                    قم بإدخال كلمة المرور القديمة والجديدة لحفظ التغييرات.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="old_password">كلمة المرور القديمة</Label>
                    <Input
                      id="old_password"
                      type="password"
                      name="old_password"
                      value={formData.old_password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">كلمة المرور الجديدة</Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">حفظ كلمة المرور</Button>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>
        </Tabs>

        {/* Messages */}
        {message && <p className="text-green-600 text-sm">{message}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
      <Footer />
    </>
  )
}
