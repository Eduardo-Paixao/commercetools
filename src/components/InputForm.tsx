import React, { InputHTMLAttributes } from "react";
// import InputMask from "react-input-mask";
import MaskedInput from "react-maskedinput";

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  mask?: string;
  error?: string;
  touched?: boolean;
}

export const InputForm = ({
  label,
  mask,
  error,
  touched,
  name,
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
        {mask ? (
          <MaskedInput
            name={name}
            mask={mask}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ee8726] sm:text-sm sm:leading-6"
            {...props}
          />
        ) : (
          <input
            name={name}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ee8726] sm:text-sm sm:leading-6"
            {...props}
          />
        )}
        {touched && error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
};
