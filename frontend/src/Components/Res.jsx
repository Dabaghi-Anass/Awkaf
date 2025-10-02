import React from 'react';
import '../CSS/reset.css';

export const Res = () => {
  return (
    <div className="reset-container">
      <h2>إعادة تعيين كلمة المرور</h2>
      <p>مرحبًا،</p>
      <p>انقر على الزر أدناه لإعادة تعيين كلمة المرور الخاصة بك:</p>
      <a className="reset-button" href="{{ reset_link }}">إعادة تعيين كلمة المرور</a>
      <p>إذا لم تطلب ذلك، يمكنك تجاهل هذه الرسالة.</p>
    </div>
  );
};
