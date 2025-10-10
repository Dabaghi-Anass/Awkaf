import React from "react";

export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = "تأكيد", cancelText = "إلغاء" }) => {
  if (!isOpen) return null;

  return (
    <div dir="rtl" className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
   
              <h3 className="font-bold">{title}</h3>
          
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="text-gray-700 text-right leading-relaxed max-sm:text-sm">{message}</p>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-2 flex gap-3 justify-start">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium max-sm:text-sm shadow-lg"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium max-sm:text-sm shadow-lg"
          >
            {confirmText}
          </button>
        </div>
      </div>
      
      <style >{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};