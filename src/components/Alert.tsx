'use client';

import React from 'react';

interface AlertProps {
  title: string;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ title, message, variant = 'info', onClose }) => {
  const getAlertClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700';
      default:
        return 'bg-blue-100 border-blue-500 text-blue-700';
    }
  };

  return (
    <div className={`border-l-4 p-4 mb-4 rounded-r ${getAlertClasses()}`} role="alert">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold">{title}</p>
          <p>{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-sm underline hover:no-underline focus:outline-none"
            aria-label="Close alert"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;