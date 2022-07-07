import React, { useEffect, useState } from "react";
import {PhoneOutgoingIcon, MailIcon} from "@heroicons/react/solid";

export interface SwitchDarkModeProps {
  className?: string;
}
const PhoneCall: React.FC<SwitchDarkModeProps> = ({ className = "" }) => {

  function _toogleDarkMode() {

  }

  return (
    <button
      onClick={_toogleDarkMode}
      className={`text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center ${className}`}
    >
      <a href="mailto:info@example.gr" target="_blank" rel="noopener noreferrer">
        <span className="sr-only">Email Us Now</span>
        <MailIcon className="w-7 h-7" aria-hidden="true" />
      </a>
    </button>
  );
};

export default PhoneCall;
