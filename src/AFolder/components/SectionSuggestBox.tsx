import React from "react";
import { BiTransferAlt } from "react-icons/bi";
import FormContext from "context/formContext";

interface SectionSuggestionBoxProps {
  className?: string;
  handleToggle?: () => void;
}

const SectionSuggestionBox = (props: SectionSuggestionBoxProps) => {
  const { addReturn, onAddReturnChange, transferRouteData, vehicleSelected } =
    props;

  return (
    <>
      {!addReturn && transferRouteData && vehicleSelected && (
        <div className="w-full relative mt-2 px-8 flex flex-col justify-center rounded-lg  shadow-xl dark:shadow-2xl bg-primary-6000 text-white dark:bg-neutral-2000 divide-y divide-neutral-200 dark:divide-neutral-700  md:divide-y-0">
          <div className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex justify-between items-center md:space-x-6">
              <BiTransferAlt size={28} className="hidden md:block" />
              <div className="space-y-2">
                <div className="text-md font-semibold">
                  Heading back to {transferRouteData.origin.title}?
                </div>
                <div className="text-md font-normal">
                  {transferRouteData.destination.title} to{" "}
                  {transferRouteData.origin.title} for {"$"}
                  {vehicleSelected.price} extra.
                </div>
              </div>
            </div>
            <button
              onClick={onAddReturnChange}
              type="button"
              className="h-12 md:h-12 px-4 rounded-lg bg-transparent border-2 border-white hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none text-base font-semibold"
            >
              <span>Add Your Return</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SectionSuggestionBox;
