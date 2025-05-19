import React from 'react';
import { useAlert } from '../contexts/AlertContext';

const AlertMessage = () => {
  const { alert, hideAlert } = useAlert();

  if (!alert.show) return null;

  // Alert styling based on type
  const alertStyles = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700'
  };

  return (
    <div className={`border px-4 py-3 rounded fixed top-20 right-4 w-64 shadow-md ${alertStyles[alert.type]}`} role="alert">
      <div className="flex justify-between items-center">
        <span className="block">{alert.message}</span>
        <button 
          className="ml-2"
          onClick={hideAlert}
        >
          <svg className="fill-current h-4 w-4" role="button" viewBox="0 0 20 20">
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AlertMessage;