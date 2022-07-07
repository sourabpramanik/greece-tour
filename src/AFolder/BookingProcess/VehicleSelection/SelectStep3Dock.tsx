import React, { useEffect, useState } from "react";


const SelectSteps3Dock = () => {  


  const renderForm = () => {
    return (
      <div className="w-full relative mt-2 px-8 flex flex-col justify-center rounded-lg  shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700  md:divide-y-0">
        {/* Progress Bar */}
        <div class="w-full bg-gray-200 md:h-5 h-3 mb-6 mt-8 rounded-full">
          <div
            class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-3 md:h-5 rounded-full"
            style={{ width: "100.00%" }}
          ></div>
        </div>        
      </div>
    );
  };

  return renderForm();
};

export default SelectSteps3Dock;