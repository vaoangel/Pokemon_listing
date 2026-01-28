"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CustomDropdownProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder: string;
}

export function CustomDropdown({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        htmlFor={id}
        className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"
      >
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-4 py-3 pr-10 border-2 border-gray-300 dark:border-gray-600 rounded-xl",
          "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100",
          "focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:focus:ring-blue-500 dark:focus:border-blue-500",
          "font-medium shadow-sm cursor-pointer transition-all",
          "hover:border-red-400 dark:hover:border-blue-400",
          "flex items-center justify-between"
        )}
      >
        <span className={value ? "" : "text-gray-400 dark:text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={cn("w-5 h-5 transition-transform", isOpen && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-xl overflow-hidden">
          <div className="max-h-64 overflow-y-auto custom-scrollbar">
            <button
              type="button"
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-gray-600 transition-colors",
                !value && "bg-red-100 dark:bg-gray-600 font-semibold",
                value && "text-gray-700 dark:text-gray-300"
              )}
            >
              {placeholder}
            </button>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-gray-600 transition-colors",
                  value === option.value &&
                    "bg-red-100 dark:bg-gray-600 font-semibold",
                  value !== option.value && "text-gray-700 dark:text-gray-300"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
