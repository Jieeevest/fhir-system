import React, { useState } from "react";

interface TooltipProps {
  className?: string;
  text?: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  className = "",
  text = "Hey, a delightful tooltip is here!",
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return text ? (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <div
          id="tooltip"
          role="tooltip"
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 my-1 bg-gray-800 text-white text-xs rounded-lg shadow-lg p-2 z-50 whitespace-nowrap"
        >
          {text}
        </div>
      )}
    </div>
  ) : (
    children
  );
};

export default Tooltip;
