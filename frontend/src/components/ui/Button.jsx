import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import { Slot } from "@radix-ui/react-slot"
// console.log(Slot)
const VARIANT_CLASSES = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  // Add more variants as needed
};

const Button = React.forwardRef(
  ({ variant = 'primary', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        'px-4 py-2 cursor-pointer flex justify-center items-center gap-2 rounded focus:outline-none transition',
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  className: PropTypes.string,
  children: PropTypes.node,
  onclick: PropTypes.func
};

export default Button;