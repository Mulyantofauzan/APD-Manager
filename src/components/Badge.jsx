import React from 'react';

const Badge = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'badge-primary',
    success: 'badge-success',
    danger: 'badge-danger',
    warning: 'badge-warning',
  };

  return (
    <span className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
