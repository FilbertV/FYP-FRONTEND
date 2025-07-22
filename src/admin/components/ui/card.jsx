import React from 'react';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`rounded-2xl bg-white p-4 shadow-md ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="text-gray-700">{children}</div>;
};