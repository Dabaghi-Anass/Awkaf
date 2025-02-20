import React from 'react'
import '../CSS/ZakatAmount.css'
export const ZakatAmount = ({zakatFormInfos,showResault,saveZakatHistory,setShowInputs}) => {
  return (
    <>
        {showResault&&(
                        <>
                            <div className="result-container">
                            <h2>قيمة الزكاة الواجبة على شركتكم</h2>
                            <div className="line-ver"></div>
                            <div className="zakat-amount">{zakatFormInfos.zakatAmount}</div>
                            <p>
                            لقد قمنا بحساب زكاتك . ندعوك لاستخدام زكاتك في الوقف، حيث ستسهم
                            في مشاريع مستدامة تحقق فائدة طويلة الأمد للمجتمع. بادر بالمساهمة بزكاتك للوقف ودع أثرها الإيجابي
                            يمتد لأجيال قادمة.
                            </p>
                        </div>
                            <div className="zakat-form-btns-container center">

                            <button className="save-btn" onClick={saveZakatHistory}>Save</button>
                            <button className="previous-btn" onClick={()=>{setShowInputs(false) ;setShowResault(false)} }>Previous</button>
                           </div>
                        
                        </>
                            
                        
                        )}
    </>
  )
}
