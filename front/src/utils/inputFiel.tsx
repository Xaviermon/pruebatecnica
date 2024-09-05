import React, { ChangeEvent } from "react";
import { Loading } from "../assets/Icons";

interface InputFieldProps {
  placeholder: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  errors?: {
    [key: string]: {
      type: string;
      message: string;
    };
  };
  labelText: string;
  requiredText?: string;
  xlColSpan?: string;
  patternValue?: RegExp;
  patternText?: string;
  disabled?: boolean;
  loading?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  name,
  onChange,
  type,
  errors,
  labelText,
  requiredText,
  xlColSpan = "xl:col-span-2",
  patternValue,
  disabled,
  loading,
}) => {
  return (
    <div className={`col-span-12 md:col-span-6 lg:col-span-4 ${xlColSpan}`}>
      <div className="flex flex-col">
        <label className="text-left text-sm">{labelText}</label>
        <div className="relative flex w-full items-center focus:outline-none">
          <input
            name={name}
            onChange={onChange}
            required={!!requiredText}
            pattern={patternValue?.toString()}
            readOnly={!!disabled}
            type={type}
            className="px-2 py-[3px] placeholder-slate-300 placeholder-italic text-slate-600 relative bg-white rounded focus:border-[--color-green] text-sm border border-slate-300 outline-none focus:outline-none w-full"
            placeholder={placeholder}
            disabled={!!disabled}
          />
          {loading && (
            <div className="absolute right-1">
              <Loading />
            </div>
          )}
        </div>
        {errors?.[name]?.type === "required" && (
          <p className="text-red-500 text-sm">{errors[name].message}</p>
        )}
        {errors?.[name]?.type === "pattern" && (
          <p className="text-red-500 text-sm">{errors[name].message}</p>
        )}
      </div>
    </div>
  );
};

export default InputField;
