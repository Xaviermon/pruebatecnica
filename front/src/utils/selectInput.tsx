import React, { ChangeEvent } from "react";

interface Option {
  value?: string | number;
  name?: string;
}

interface InputSelectProps {
  options: Option[];
  name: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  errors?: {
    [key: string]: {
      type: string;
      message: string;
    };
  };
  labelText: string;
  requiredText?: string;
  disabled?: boolean;
  xlColSpan?: string;
}

const InputSelect: React.FC<InputSelectProps> = ({
  options,
  name,
  onChange,
  errors,
  labelText,
  disabled,
  xlColSpan = "xl:col-span-2",
}) => {
  return (
    <div className={`col-span-12 md:col-span-6 lg:col-span-4 ${xlColSpan}`}>
      <div className="flex flex-col">
        <label className="text-left text-sm">{labelText}</label>
        <div className="relative flex w-full flex-wrap items-stretch focus:outline-none">
          <select
            name={name}
            className="px-2 py-1 placeholder-slate-300 placeholder-italic text-slate-600 relative bg-white rounded focus:border-[--color-green] text-sm border border-slate-300 outline-none focus:outline-none w-full pr-10"
            onChange={onChange}
            disabled={!!disabled}
          >
            <option value={0}>Select</option>
            {options?.map(({ value, name }) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </select>
        </div>
        {errors?.[name]?.type === "required" && (
          <p className="text-red-500 text-sm">{errors[name].message}</p>
        )}
        {errors?.[name]?.type === "validate" && (
          <p className="text-red-500 text-sm">{errors[name].message}</p>
        )}
      </div>
    </div>
  );
};

export default InputSelect;
