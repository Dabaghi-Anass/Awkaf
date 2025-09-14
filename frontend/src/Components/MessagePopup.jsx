import React from 'react';

export const MessagePopup = ({ message, type = "info", onClose }) => {
  if (!message) return null;

  // Icon components based on type
  const getIcon = () => {
    switch (type) {
      case 'error':
        return (
          <div className="bg-red-100 p-3 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        );
      case 'success':
        return (
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="bg-amber-100 p-3 rounded-full mb-4">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  // Get styling based on type
  const getStyles = () => {
    switch (type) {
      case 'error':
        return {
          borderColor: 'border-red-300',
          headerColor: 'text-red-700',
          buttonColor: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800',
          backgroundGradient: 'from-red-50 to-rose-50'
        };
      case 'success':
        return {
          borderColor: 'border-green-300',
          headerColor: 'text-green-700',
          buttonColor: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
          backgroundGradient: 'from-green-50 to-emerald-50'
        };
      case 'warning':
        return {
          borderColor: 'border-amber-300',
          headerColor: 'text-amber-700',
          buttonColor: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700',
          backgroundGradient: 'from-amber-50 to-orange-50'
        };
      default:
        return {
          borderColor: 'border-blue-300',
          headerColor: 'text-blue-700',
          buttonColor: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
          backgroundGradient: 'from-blue-50 to-indigo-50'
        };
    }
  };

  // Get title based on type
  const getTitle = () => {
    switch (type) {
      case 'error':
        return 'خطأ';
      case 'success':
        return 'نجح';
      case 'warning':
        return 'تحذير';
      default:
        return 'معلومة';
    }
  };

  const styles = getStyles();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4 animate-in fade-in duration-300">
      <div className={`bg-gradient-to-br ${styles.backgroundGradient} rounded-2xl shadow-2xl max-w-md w-full text-center border-2 ${styles.borderColor} transform animate-in zoom-in slide-in-from-bottom-4 duration-300 overflow-hidden`}>
        
        {/* Header with decorative background */}
        <div className="relative p-6 pb-4">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-white bg-opacity-30"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-20 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-20 rounded-full translate-y-8 -translate-x-8"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className="flex justify-center">
              {getIcon()}
            </div>
            
            {/* Title */}
            <h2 className={`text-xl font-bold mb-3 ${styles.headerColor}`}>
              {getTitle()}
            </h2>
            
            {/* Message */}
            <p className="text-gray-700 text-sm leading-relaxed mb-6 px-2">
              {message}
            </p>
          </div>
        </div>

        {/* Button section */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className={`w-full ${styles.buttonColor} text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
              type === 'error' ? 'focus:ring-red-500' :
              type === 'success' ? 'focus:ring-green-500' :
              type === 'warning' ? 'focus:ring-amber-500' :
              'focus:ring-blue-500'
            }`}
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              موافق
            </span>
          </button>
        </div>

        {/* Close button (X) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 hover:bg-white hover:bg-opacity-50 rounded-full transition-all duration-200 z-20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Bottom accent line */}
        <div className={`h-1 w-full ${
          type === 'error' ? 'bg-gradient-to-r from-red-400 to-rose-400' :
          type === 'success' ? 'bg-gradient-to-r from-green-400 to-emerald-400' :
          type === 'warning' ? 'bg-gradient-to-r from-amber-400 to-orange-400' :
          'bg-gradient-to-r from-blue-400 to-indigo-400'
        }`}></div>
      </div>
    </div>
  );
};