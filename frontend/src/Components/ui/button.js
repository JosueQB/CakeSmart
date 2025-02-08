import React from 'react';

export const Button = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 ${className}`}
    >
      {children}
    </button>
  );
};
