import { createContext, useState, useContext } from 'react';

// Create context
const AlertContext = createContext();

// Custom hook to use the alert context
export const useAlert = () => useContext(AlertContext);

// Provider component
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ show: false, message: '', type: 'info' });

  // Show alert function
  const showAlert = (message, type = 'info') => {
    setAlert({ show: true, message, type });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      setAlert({ show: false, message: '', type: 'info' });
    }, 5000);
  };

  // Hide alert function
  const hideAlert = () => {
    setAlert({ show: false, message: '', type: 'info' });
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;