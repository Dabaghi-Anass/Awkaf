import React, { useContext,useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import { Button } from "@/components/ui/button"
import { ZakatContext } from "./Components/ZakatProvider";
import { ZakatPrice } from "./Components/ZakatPrice";
import { MessagePopup } from "./Components/MessagePopup";

function App() {

    const { nissab, setZakatFormInfos,setShowResult,showResult,setPopup,popup } = useContext(ZakatContext);

  const [formData, setFormData] = useState([
    {name:"1",label:"النقديات و المعادن الثمينة",children:[
      {name: 'x1', label: 'النقود الورقية', children: Array(0)},
      {name: 'x2', label: 'النقود في حسابات جارية', children: Array(0)},
      {name: 'x3', label: 'شيك المصادق', children: Array(0)},   
      {name: 'x4', label: 'العملات الأجنبية', children: Array(0)},
      {name: 'x5', label: 'العملات المشفرة', children: Array(0)},
      {name: 'x6', label: 'الذهب و الفضة و الأحجار الكريمة', children: Array(0)},
      {name: 'x7', label: 'أدوات و أواني فضية و ذهبية', children: Array(0)},
    ]},

    {name: '2', label: 'ديون لك',children:[
      {name: 'y1', label: 'ديون تجارية مرجوة', children: Array(0)},
      {name: 'y2', label: 'ديون مشكوك فيها', children: Array(0)},
      {name: 'y3', label: 'ديون من بيع أصول غير زكوية', children: Array(0)},
    ]},

    {name: '3', label: 'ديون عليك',children:[
      {name: 'z1', label: 'ديون أخذت لشراء أصول  زكوية', children: Array(0)},
      {name: 'z2', label: 'ديون لشراذ أصول غير زكوية', children: Array(0)},
    ]},

    {name: '4', label: 'الإستثمارات و الأسهم و الصناديق',children:[
      {name: 'a1', label: 'أسهم للتجارة', children: Array(0)},
      {name: 'a2', label: 'أسهم للاحتفاظ و تحقيق الأرباح', children: Array(0)},
      {name: 'a3', label: 'صناديق تقاعد و إدخار', children: Array(0)},
      {name: 'a4', label: 'صكوك و سندات', children: Array(0)},
    ]},

    {name: '5', label: 'عروض التجارة',children:[
      {name: 'b1', label: 'للتجارة', children: Array(0)},
      {name: 'b2', label: 'المحتكرة', children: Array(0)},
      {name: 'b3', label: 'عروض كاسدة مخزنة', children: Array(0)},
      {name: 'b4', label: 'محصل عليها بهبة أو إرث', children: Array(0)},
    ]},

    {name: '6', label: 'المخزون',children:[
      {name: 'c1', label: 'المخزون', children: Array(0)},
      {name: 'c2', label: 'غير قابل للبيع', children: Array(0)}
    ]},

    {name: '7', label: 'الضرائب و الخصومات',children:[
      {name: 'f1', label: 'عربون في بيع غير قابل للفسخ', children: Array(0)},
      {name: 'f2', label: 'أمانات الغير', children: Array(0)},
      {name: 'f3', label: 'ضرائب الدخل /الثروة واجبة الدفع خلال 12 شهر', children: Array(0)},
    ]},
   
  ]);

  
  const updateFieldValue = (fields, targetName, newValue) => {
    return fields.map(field => {
      if (field.name === targetName) {
        return { ...field, value: newValue };
      }
      if (field.children && field.children.length > 0) {
        return { ...field, children: updateFieldValue(field.children, targetName, newValue) };
      }
      return field;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const rawValue = value.replace(/,/g, "");
    if (!isNaN(rawValue) && rawValue >= 0) {
      setFormData(prev => updateFieldValue(prev, name, rawValue));
    }
  };

const flattenData = (fields, acc = {}) => {
  fields.forEach(field => {
    if (field.children && field.children.length > 0) {
      flattenData(field.children, acc);
    } else {
      acc[field.name] = Number(field.value) || 0;
    }
  });
  return acc;
};


const calcZakat = () => {
  const values = flattenData(formData);
  console.log("Values:", values);

  const assets = 
    (values.x1 || 0) + (values.x2 || 0) + (values.x3 || 0) +
    (values.x4 || 0) + (values.x5 || 0) + (values.x6 || 0) +
    (values.x7 || 0) + (values.y1 || 0) +
    (values.a1 || 0) + (values.a2 || 0) + (values.a3 || 0) + (values.a4 || 0) +
    (values.b1 || 0) + (values.b2 || 0) + (values.b3 || 0) + (values.b4 || 0) +
    (values.c1 || 0) + (values.c2 || 0);

  const liabilities =
    (values.z1 || 0) + (values.z2 || 0) +
    (values.f1 || 0) + (values.f2 || 0) + (values.f3 || 0) +
    (values.y2 || 0) + (values.y3 || 0);

  const zakatBase = assets - liabilities;
  const zakat = zakatBase > nissab ? zakatBase*0.025 :0; 

  const calculationDate = new Date().toISOString().split("T")[0]; 
    
            setZakatFormInfos(prevState => ({
                ...prevState,
                zakatAmount:zakat.toFixed(3),  
                totalAmount: zakatBase.toFixed(3),  
                calculationDate: calculationDate,
               
            }));

  setShowResult(true);
 
};


  const formatNumber = (num) =>
    !num ? "" : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Recursive rendering
  const renderInputs = (fieldList) =>
    fieldList.map((field, index) => (
      <div key={index}>
        {field.children && field.children.length > 0 ? (
          <>
            <div className="font-semibold text-green-600 text-[1em] mt-4">
              {field.label}
            </div>
            <div className="ml-4">{renderInputs(field.children)}</div>
          </>
        ) : (
          <div className="mb-4">
            <label className="custom-form-label">{field.label}</label>
            <div className="relative w-full">
              <input
                className="custom-form-input"
                type="text"
                name={field.name}
                value={formatNumber(field.value || "")}
                onChange={handleChange}
                placeholder="00,000"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-[0.8em]">دج</span>
            </div>
          </div>
        )}
      </div>
    ));


 

  return (
     <div dir="rtl" className="flex min-h-svh w-full flex-col items-center justify-center  ">
      <div className=" w-full mx-auto   ">
        <div className="form-pattern mx-auto    rounded-lg " >
        
          {renderInputs(formData)}

          <button className="custom-button mx-auto block rounded-md" onClick={calcZakat}>Calcul me </button>

        </div>
        {showResult && <ZakatPrice />}
    
      </div>
       <MessagePopup
              message={popup.message}
              type={popup.type}
              onClose={() => setPopup({ message: "", type: "" })}
            />

       
    </div>
  );
}

export default App;
