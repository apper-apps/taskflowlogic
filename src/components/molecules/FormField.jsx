import React from "react";
import { cn } from "@/utils/cn";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";

const FormField = ({ 
  label, 
  type = "text", 
  required = false, 
  error,
  className,
  children,
  ...props 
}) => {
  const renderInput = () => {
    if (children) {
      return children;
    }
    
    switch (type) {
      case "textarea":
        return <Textarea error={!!error} {...props} />;
      case "select":
        return <Select error={!!error} {...props} />;
      default:
        return <Input type={type} error={!!error} {...props} />;
    }
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label required={required}>
          {label}
        </Label>
      )}
      {renderInput()}
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default FormField;