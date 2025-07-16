import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 hover:scale-105 active:scale-95",
    secondary: "bg-white text-primary border border-primary hover:bg-primary hover:text-white hover:scale-105 active:scale-95",
    accent: "bg-gradient-to-r from-accent to-success text-white hover:from-accent/90 hover:to-success/90 hover:scale-105 active:scale-95",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:scale-105 active:scale-95",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:scale-105 active:scale-95",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:from-error/90 hover:to-red-600/90 hover:scale-105 active:scale-95",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded",
    md: "px-4 py-2 text-sm rounded",
    lg: "px-6 py-3 text-base rounded-lg",
  };
  
  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20,
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          className="mr-2 animate-spin" 
          size={iconSizes[size]} 
        />
      )}
      {icon && iconPosition === "left" && !loading && (
        <ApperIcon 
          name={icon} 
          className="mr-2" 
          size={iconSizes[size]} 
        />
      )}
      {children}
      {icon && iconPosition === "right" && !loading && (
        <ApperIcon 
          name={icon} 
          className="ml-2" 
          size={iconSizes[size]} 
        />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;