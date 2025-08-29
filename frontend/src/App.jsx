import React, { useContext,useEffect, useState } from "react";
import { ZakatContext } from "./Components/ZakatProvider";
import { ZakatPrice } from "./Components/ZakatPrice";
import { MessagePopup } from "./Components/MessagePopup";

function App() {

  const { nissab, setZakatFormInfos,setShowResult,showResult,setPopup,popup } = useContext(ZakatContext);

  const [methodCalcul,setMethodCalcul]=useState("Maliki");

  const [formData, setFormData] = useState([
    {name:"1",label:"النقود وما في حكمها",children:[
      {name: 'x1', label: 'نقدية بالصندوق', children: Array(0)},
      {name: 'x2', label: 'نقدية لدى المصارف (جارية/تحت الطلب)', children: Array(0)},
      {name: 'x3', label: 'شيكات مصادق عليها', children: Array(0)},   
      {name: 'x4', label: 'العملات الأجنبية', children: Array(0)},
      {name: 'x5', label: 'أصول رقمية/نقود مشفّرة متاحة', children: Array(0)},
      {name: 'x6', label: 'ودائع أمانة/حسابات ثابتة يمكن التصرف فيها', children: Array(0)},
      {name: 'x7', label: 'قرض حسن مُقرض (حتى يُقبض)', children: Array(0)},
      {name: 'x8', label: 'إيرادات مستحقة غير مقبوضة', children: Array(0)},
      {name: 'x9', label: 'نقود من بيع أصول غير زكوية', children: Array(0)},
    ]},

    {name: '2', label: 'الذمم المدينة (الديون المرجوّة)',children:[
      {name: 'y1', label: 'ديون حالّة مرجوّة على العملاء', children: Array(0)},
      {name: 'y2', label: 'ديون مؤجّلة مرجوّة', children: Array(0)},
      {name: 'y3', label: 'أوراق قبض', children: Array(0)},
      {name: 'y4', label: 'ديون لي مرجوّة (قرض حسن/بيع احتكاري)', children: Array(0)},
      {name: 'y5', label: 'ديون عن بيع أصول غير زكوية/غير تجارية', children: Array(0)},
      {name: 'y6', label: 'إيرادات إيجار/كراء حل أجلها', children: Array(0)},
      {name: 'y7', label: 'ديون مشكوك فيها/ميؤوس منها', children: Array(0)},
    ]},

    {name: '3', label: 'الاستثمارات الزكوية',children:[
      {name: 'z1', label: 'أسهم/صكوك/حصص للتجارة', children: Array(0)},
      {name: 'z2', label: 'حصص عقارية للتجارة', children: Array(0)},
      {name: 'z3', label: 'استثمارات سندات/أذون خزينة', children: Array(0)},
      {name: 'z4', label: 'أسهم بنية العائد (احتفاظ)', children: Array(0)},
    ]},

    {name: '4', label: 'عروض التجارة والمخزون',children:[
      {name: 'a1', label: 'بضاعة تامة الصنع', children: Array(0)},
      {name: 'a2', label: 'بضاعة تحت التشغيل', children: Array(0)},
      {name: 'a3', label: 'مواد أولية', children: Array(0)},
      {name: 'a4', label: 'بضاعة في الطريق', children: Array(0)},
      {name: 'a5', label: 'بضاعة أمانة لدى الغير', children: Array(0)},
      {name: 'a6', label: 'قطع غيار بقصد المتاجرة', children: Array(0)},
      {name: 'a7', label: 'عروض تجارة بهبة/إرث', children: Array(0)},
      {name: 'a8', label: 'عقارات محتكرة للتجارة', children: Array(0)},
      {name: 'a9', label: 'بضاعة كاسدة/غير معدّة للبيع', children: Array(0)},
    ]},

    /*{name: '5', label: 'البنود الزكوية الخاصة',children:[
      {name: 'b1', label: 'للتجارة', children: Array(0)},
      {name: 'b2', label: 'المحتكرة', children: Array(0)},
      {name: 'b3', label: 'عروض كاسدة مخزنة', children: Array(0)},
      {name: 'b4', label: 'محصل عليها بهبة أو إرث', children: Array(0)},
    ]},
 */
    {name: '6', label: 'الالتزامات واجبة الخصم',children:[
      {name: 'c1', label: 'قروض قصيرة الأجل مستحقة خلال الحول', children: Array(0)},
      {name: 'c2', label: 'أوراق دفع/دائنون', children: Array(0)},
      {name: 'c3', label: 'حقوق موظفين (أجور/إجازات)', children: Array(0)},
      {name: 'c4', label: 'ضرائب مستحقة خلال الحول', children: Array(0)},
      {name: 'c5', label: 'أرباح مضاربة للغير', children: Array(0)},
      {name: 'c6', label: 'تأمينات العملاء للرد', children: Array(0)},
      {name: 'c7', label: 'احتياطيات عامة/مخصصات تقديرية', children: Array(0)},
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


const calcZakat = (method) => {
  const values = flattenData(formData);
  console.log("Values:", values);

  const commonAssets = 
    (values.x1 || 0) + (values.x2 || 0) + (values.x3 || 0) +
    (values.x4 || 0) + (values.x5 || 0) + (values.x6 || 0) +
    (values.a1 || 0) + (values.a4 || 0) + (values.a5 || 0) ;
    
  let zakatBase = 0;

    switch(method){
      case "Maliki":
        
        break;
      case "AAOIFI":
        zakatBase = commonAssets + (values.y1 || 0) + (values.y2 || 0) + (values.y3 || 0) + (values.y4 || 0) +
        (values.z2 || 0) + (values.z3 || 0) + (values.z4 || 0) + (values.a1 || 0)+ (values.z1 || 0) +
        (values.a2 || 0) + (values.a3 || 0) + (values.a4 || 0) + (values.a5 || 0) + (values.a6 || 0) +
        (values.a7 || 0) + (values.a8 || 0) - ((values.c1 || 0) + (values.c2 || 0) + (values.c4 || 0) +
        (values.c5 || 0) + (values.c6 || 0) );
        
        break;
      case "Alioua":

        zakatBase = commonAssets + (values.x7 || 0) + (values.x8 || 0) + (values.x9 || 0) + (values.y1 || 0) +
        (values.y2 || 0) + (values.y3 || 0) + (values.y4 || 0) + (values.y5 || 0)+ (values.y6 || 0) +
        (values.y7 || 0) + (values.z1 || 0) + (values.z2 || 0) + (values.z3 || 0) + (values.z4 || 0) +
        (values.a1 || 0) + (values.a2 || 0) +(values.a3 || 0) + (values.a4 || 0)+(values.a5 || 0) + (values.a6 || 0) +
        (values.a7 || 0) + (values.a8 || 0) -  ((values.c1 || 0) + (values.c2 || 0) + (values.c4 || 0) +
        (values.c5 || 0) + (values.c6 || 0)+(values.c3 || 0)  );
       

        break;
      case"Net":
        zakatBase = commonAssets + (values.a1 || 0) + (values.a4 || 0) + (values.a5 || 0) ;
        break;
    }
    


  
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


    console.log(methodCalcul);

  return (
     <div dir="rtl" className="flex   min-h-svh w-full  flex-col items-center justify-center mx-auto  ">
      <div className=" w-3/4 mx-auto my-3 py-2 px-3 border-2 rounded-[10px] border-gray-700   ">
        <div className="form-pattern mx-auto    rounded-lg " >
        
          {renderInputs(formData)}
          <div className="mb-5">
            <label className="font-semibold text-green-600 text-[1em]">إختر طريقة الحساب</label>
            <select
              className="w-full custom-form-label p-2 border border-gray-300 rounded-lg text-sm pr-10 text-right mt-1"
              onChange={(e) => setMethodCalcul(e.target.value)}
              
            >
              <option value="Maliki" >معادلة حساب زكاة الشركات مالكي</option>
              <option value="AAOIFI">معادلة حساب زكاة الشركات AAOIFI </option>
              <option value="Alioua">معادلة باسم عليوة</option>
              <option value="Net">معادلة طريقة صافي الغنى</option>
              
            </select>
          </div>
          <button className="custom-button mx-auto block rounded-md" onClick={() => calcZakat(methodCalcul)}>حساب</button>

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
