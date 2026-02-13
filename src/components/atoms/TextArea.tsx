import React from "react";

interface TextAreaProps {
  label?: string;
  required?: boolean;
  size?: "default" | "sm" | "lg";
  border?: "default" | "danger" | "success";
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  value?: string;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label = "",
  required = false,
  size = "default",
  border = "default",
  onChange,
  rows = 6,
  value,
  isDisabled = false,
  placeholder = "",
  className = "",
  maxLength,
  error,
}) => {
  const inputSize = {
    default: "",
    sm: "textarea-sm",
    lg: "textarea-lg",
  };

  const borderColor = {
    default: "",
    danger: "border-danger",
    success: "border-success",
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-wrap lg:flex-nowrap gap-2.5">
        {/* Label */}
        {label && (
          <label className="form-label max-w-44 pt-1.5" htmlFor={label}>
            {label}
            {required && <span className="text-danger">*</span>}
          </label>
        )}
        <div className="relative w-full">
          <textarea
            className={`textarea w-full ${error ? "border-danger" : ""} ${
              inputSize[size] || ""
            } ${borderColor[border] || ""}`}
            disabled={isDisabled}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            value={value}
            maxLength={maxLength || 150}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default TextArea;
