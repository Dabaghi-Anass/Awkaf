import React, { useContext } from 'react';
import '../CSS/ZakatAmount.css';
import { ZakatContext } from './ZakatProvider';

export const ZakatAmount = ({ showResault, saveZakatHistory, setShowInputs, setShowResault }) => {
    const { zakatFormInfos } = useContext(ZakatContext); // ✅ Get data from context

    return (
        <>
            {showResault && (
                <>
                    <div className="result-container">
                        <h2>قيمة الزكاة الواجبة على شركتكم</h2>
                        <div className="line-ver"></div>
                        <div className="zakat-amount">
                            {zakatFormInfos.zakatAmount && Number(zakatFormInfos.zakatAmount) <= 0
                                ? "No zakat to pay"
                                : zakatFormInfos.zakatAmount || "N/A"}
                        </div>
                        {zakatFormInfos.zakatAmount && Number(zakatFormInfos.zakatAmount) <= 0
                            ? null
                            : (
                                <p>
                                    لقد قمنا بحساب زكاتك . ندعوك لاستخدام زكاتك في الوقف، حيث ستسهم
                                    في مشاريع مستدامة تحقق فائدة طويلة الأمد للمجتمع. بادر بالمساهمة بزكاتك للوقف ودع أثرها الإيجابي
                                    يمتد لأجيال قادمة.
                                </p>
                            )}
                    </div>
                    <div className="zakat-form-btns-container center">
                        <button className="save-btn" onClick={saveZakatHistory}>Save</button>
                        <button className="previous-btn" onClick={() => { setShowInputs(false); setShowResault(false); }}>Previous</button>
                    </div>
                </>
            )}
        </>
    );
};

