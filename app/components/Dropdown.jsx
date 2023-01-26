import { useState } from "react";

import { Listbox } from "@headlessui/react";

import Button from "./Button";
import { Link } from "@remix-run/react";

export default function Dropdown({
  id,
  name,
  options = [],
  value,
  onChange,
  disabled = false,
  ...otherProps
}) {
  return (
    <Listbox
      id={id}
      name={name}
      value={value}
      type="button"
      disabled={disabled}
      {...otherProps}
    >
      <div className="flex-1 relative">
        <Listbox.Button
          as={Button}
          className="relative whitespace-nowrap w-fit flex flex-row items-center justify-between gap-2"
        >
          <span>
            {
              options.find(function (_option) {
                return _option.value === value;
              })?.label
            }
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width={16}
            height={16}
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Listbox.Button>
        <Listbox.Options className="whitespace-nowrap flex flex-col absolute z-10 w-fit mt-2 bg-white border border-neutral-200 rounded-md focus:outline-none">
          {options.map(function (_option) {
            return (
              <Listbox.Option
                as={Link}
                to={`?sort=${_option.value}`}
                value={_option.value}
                className={function ({ active, selected }) {
                  return [
                    "relative w-full px-3 py-1 font-medium cursor-pointer text-sm rounded-md",
                    active ? "bg-white" : "",
                    selected ? "text-blue-500" : "",
                  ].join(" ");
                }}
                key={_option.value}
              >
                {_option.label}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
