import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white flex items-center gap-3 transition-all duration-300 transform translate-y-0 ${
        type === "success" ? "bg-teal-600" : "bg-red-500"
      }`}
    >
      <i
        className={`ki-outline ${
          type === "success" ? "ki-check-circle" : "ki-cross-circle"
        } text-xl`}
      ></i>
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Toast;
