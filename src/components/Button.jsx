import React from 'react';

const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-cyan-500 text-white hover:bg-cyan-600 active:scale-95 focus:ring-cyan-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:scale-95 focus:ring-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-95 focus:ring-red-500',
    success: 'bg-green-500 text-white hover:bg-green-600 active:scale-95 focus:ring-green-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
