import React from "react";

interface InputCheckboxProps {
  label?: string;
  checked?: boolean;
  size?: "sm" | "lg";
  onChange?: (checked: boolean) => void;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  className?: string;
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({
  label,
  checked,
  size,
  onChange,
  isReadOnly,
  isDisabled,
  className = "",
}) => {
  const checkboxSize = {
    sm: "checkbox-sm",
    lg: "checkbox-lg",
  };

  return (
    <div className={`relative ${className}`}>
      <label className="form-label flex items-center gap-2.5">
        <input
          className={`checkbox ${size && checkboxSize[size]} ${
            isReadOnly && "cursor-not-allowed"
          }`}
          type="checkbox"
          checked={checked ? checked : false}
          onChange={(e) => onChange && onChange(e.target.checked)}
          aria-checked={checked}
          disabled={isDisabled}
        />
        {label}
      </label>
    </div>
  );
};

export default InputCheckbox;
