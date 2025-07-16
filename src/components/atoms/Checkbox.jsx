import React from "react";
import { cn } from "@/utils/cn";

const Checkbox = React.forwardRef(({ 
  className, 
  checked = false,
  onChange,
  ...props 
}, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "custom-checkbox",
        className
      )}
      checked={checked}
      onChange={onChange}
      ref={ref}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;