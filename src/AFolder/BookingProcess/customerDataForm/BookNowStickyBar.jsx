import React, { useContext } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import FormContext from "context/formContext";
import { navigate } from "gatsby";

const BookNowStickyBar = (vehicleSelected, props) => {
  const { onBookNowClick, processing } = props;

  const onNavigationBack = () => {
    navigate(`/vehicle-selection`);
  };
  return (
    <div className="w-full mt-2 px-8 flex flex-col justify-center rounded-lg  shadow-xl dark:shadow-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 divide-y divide-neutral-200 dark:divide-neutral-700  md:divide-y-0">
      <div className="py-4 flex md:flex-row justify-between items-center">
        <div className="flex justify-between items-center space-x-6">
          <div className="space-y-1">
            <div className="text-xs md:text-sm text-white font-normal">
              {vehicleSelected?.vehicleSelected?.name}
            </div>
            <div className="text-xs md:text-sm text-white font-semibold">
              € {vehicleSelected?.vehicleSelected?.price}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigationBack()}
            className="h-10 md:h-10 px-2 rounded-lg bg-transparent border-2 border-white hover:bg-white flex items-center justify-center text-white hover:text-primary-700 focus:outline-none text-xs md:text-sm font-semibold"
          >
            <span>
              <MdKeyboardArrowLeft size={18} />
            </span>
          </button>
          <button
            onClick={onBookNowClick}
            type="button"
            className="h-10 md:h-10 px-2 rounded-lg bg-white hover:bg-primary-700 flex items-center justify-center text-purple-500 hover:text-white focus:outline-none text-xs md:text-sm font-semibold"
          >
            {!processing ? (
              <>
                <span>Next: Final Details</span>
                <MdKeyboardArrowRight size={18} />
              </>
            ) : (
              <svg
                role="status"
                className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-400 fill-primary-6000"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookNowStickyBar;
