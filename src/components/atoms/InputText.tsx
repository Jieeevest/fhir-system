import React, { useEffect, useState } from "react";
import Select from "./Select";

interface InputTextProps {
  label?: string;
  required?: boolean;
  type?: string;
  size?: "default" | "sm" | "lg";
  border?: "default" | "danger" | "success";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setDialCode?: (dialCode: string) => void;
  value?: string;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
  icon?: string;
  error?: string;
}

const InputText: React.FC<InputTextProps> = ({
  label = "",
  required = false,
  type = "text",
  size = "default",
  border = "default",
  onChange = () => {},
  setDialCode = () => {},
  value = "",
  isDisabled = false,
  placeholder = "",
  className = "",
  icon = "",
  error,
}) => {
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("ID+62");
  const [showPassword, setShowPassword] = useState(false);
  const inputSize = {
    default: "",
    sm: "input-sm",
    lg: "input-lg",
  };

  const borderColor = {
    default: "",
    danger: "border-danger",
    success: "border-success",
  };

  useEffect(() => {
    // Fetch countries data from the URL
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/Jieeevest/08b5d34e14c7db5ae607351de1908c6e/raw/b1dfc63b19ff4123686d54cd774321a71cc51ff1/country-codes.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        console.log("Error fetching countries");
      }
    };

    if (type === "phone") {
      fetchCountries();
    }
  }, [type]);

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
        {label && (
          <label className="form-label max-w-44" htmlFor={label}>
            {label}
            {required && <span className="text-danger">*</span>}
          </label>
        )}
        <div className="relative w-full">
          {icon && (
            <i
              className={`ki-outline hover:text-[20.5px] hover:text-neutral-700 hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out text-xl ${icon} absolute right-3 top-5 transform -translate-y-1/2 text-gray-500`}
            ></i>
          )}

          {type === "password" && (
            <i
              role="button"
              className={`ki-outline hover:text-[20.5px] hover:text-neutral-700 hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out ${
                showPassword ? "ki-eye-slash " : "ki-eye"
              } text-xl ${icon} absolute right-3 ${
                size == "lg" ? "top-6" : "top-5"
              } transform -translate-y-1/2 text-gray-500`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          )}

          <div className="flex justify-between gap-2">
            {type === "phone" && (
              <div className="w-[150px]">
                <Select
                  className={`w-full ${
                    error ? "border-[1px] rounded-lg border-danger" : ""
                  }`}
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setDialCode(e.target.value.substring(2));
                  }}
                  optionValue={countries.map((country) => {
                    return {
                      value: country.code + country.dial_code,
                      label: country.code + " | " + country.dial_code,
                    };
                  })}
                />
              </div>
            )}
            <input
              className={`input w-full ${error ? "border-danger" : ""} ${
                inputSize[size] || ""
              } ${borderColor[border] || ""} 
             ${
               type === "date"
                 ? // ? "appearance-none [&::-webkit-calendar-picker-indicator]:hidden cursor-pointer"
                   ""
                 : ""
             }`}
              max={type === "date" ? "9999-12-31" : ""}
              min={type === "date" ? "2020-01-01" : ""}
              disabled={isDisabled}
              onChange={onChange}
              placeholder={type == "phone" ? "eg. 81234XXXX" : placeholder}
              type={showPassword ? "text" : type == "phone" ? "text" : type}
              value={value}
            />
          </div>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default InputText;
