import React, { useEffect, useState } from "react";
import { MoonIcon } from "@heroicons/react/solid";
import { SunIcon } from "@heroicons/react/outline";

const PhoneCallItem = ({ className = "" }) => {

  return (
    <button
      onClick={_toogleDarkMode}
      className={`text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center ${className}`}
    >
      <span className="sr-only">Enable dark mode</span>
      {isDarkMode ? (
        <MoonIcon className="w-7 h-7" aria-hidden="true" />
      ) : (
        <SunIcon className="w-7 h-7" aria-hidden="true" />
      )}
    </button>
  );
};

export default PhoneCallItem;
