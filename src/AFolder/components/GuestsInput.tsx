import React, { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import { FC } from "react";
import ClearDataButton from "../components/ClearDataButton";

export interface GuestsInputProps {
  defaultValue: {
    guestAdults?: number;
    guestChildren?: number;
    guestInfants?: number;
  };
  onChange?: (data: GuestsInputProps["defaultValue"]) => void;
  fieldClassName?: string;
}

const GuestsInput: FC<GuestsInputProps> = ({
  defaultValue,
  onChange,
  fieldClassName = "[ nc-hero-field-padding ]",
}) => {
  const [guestInputValue, setGuestInputValue] = useState(
    defaultValue
  );

  useEffect(() => {
    setGuestInputValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (onChange) {
      onChange(guestInputValue);
    }
  }, [guestInputValue]);



  return (
    <div
      className={`flex text-left items-center ${fieldClassName} space-x-3 focus:outline-none cursor-pointer`}
    >
      <div className="text-neutral-300 dark:text-neutral-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="nc-icon-field"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      </div>
      <div className="grid grid-cols-2 items-center w-full md:wd-max md:block">        
        {/*<span className="block xl:text-lg font-semibold">
          {guestInputValue || ""} Guests
        </span>*/}
        <span className="block md:hidden text-lg font-semibold leading-none">
          {guestInputValue ? "Passengers" : "Add passengers"}
        </span> 
        <NcInputNumber      
          defaultValue={guestInputValue}
          onChange={(value) => setGuestInputValue(value)}
          max={10}
          min={1}        
        />       
      </div>
    </div>    
  );
};

export default GuestsInput;
