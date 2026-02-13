import React from "react";

interface ButtonProps {
  text?: string | React.ReactNode;
  appearance?:
    | "primary"
    | "success"
    | "info"
    | "danger"
    | "warning"
    | "dark"
    | "light";
  type?: "default" | "outline" | "pill";
  icon?: string;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  isDisabled?: boolean;
}

const DefaultButton: React.FC<ButtonProps> = ({
  text = "Button",
  appearance = "primary",
  type = "default",
  icon,
  onClick,
  onMouseOver,
  onMouseLeave,
  className = "",
  isDisabled = false,
}) => {
  const buttonType = {
    default: "",
    outline: "btn-outline",
    pill: "badge-clear",
  };
  return (
    <button
      className={`flex justify-center items-center ${className} btn ${
        !isDisabled ? `btn-${appearance}` : "bg-gray-300 cursor-not-allowed"
      }  ${buttonType[type]}`}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      disabled={isDisabled}
    >
      {icon && <i className={`ki-outline ${icon} mr-2`}></i>}
      <span>{text}</span>
    </button>
  );
};

export default DefaultButton;
