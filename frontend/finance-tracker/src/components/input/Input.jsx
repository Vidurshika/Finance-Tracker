import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="mb-4">
      {label && (
        <label className="text-[13px] text-black font-semibold mb-1 block">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          className="w-full bg-slate-100 outline-none border border-slate-300 rounded px-4 py-2 pr-10 text-sm text-black"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {isPassword && (
          <div
            className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <FaRegEye size={18} />
            ) : (
              <FaRegEyeSlash size={18} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
