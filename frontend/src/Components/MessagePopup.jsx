import React from 'react'

export const MessagePopup = ({message,type="info",onClose}) => {
    if (!message) return null;
  return (
   <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
      <div className={`bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center border ${type === 'error' ? 'border-red-500' : 'border-green-500'}`}>
        <h2 className={`text-lg font-semibold mb-2 ${type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {type === "error" ? "Error" : "Success"}
        </h2>
        <p className="text-gray-700 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="custom-button px-4 py-2 rounded-md"
        >
          OK
        </button>
      </div>
    </div>
  )
}
