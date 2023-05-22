import React, { InputHTMLAttributes } from "react";

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const InputForm = ({
  label,
  name,
  required = true,
  type,
  ...props
}: InputFormProps) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className="mt-2">
        <input
          id={name}
          type={type}
          required={required}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ee8726] sm:text-sm sm:leading-6"
          {...props}
        />
      </div>
    </div>
  );
};
