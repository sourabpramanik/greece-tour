import React, { useEffect, useState } from "react";
import LocationInput from "../../components/LocationInput";
import { FiUser, FiBriefcase } from "react-icons/fi";
import { BsCalendarX } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import NcImage from "shared/NcImage/NcImage";
import seletedCarImage from "images/cars/2.png";
import StartRating from "components/StartRating/StartRating";
import InfoLink from "components/InfoLink/InfoLink";
import ButtonSubmit2 from "../../components/ButtonSubmit2";

const SelectStepsDock = ({ vehicle }) => {

  const renderForm = () => {

    return (
      <div className="w-full relative mt-2 px-8 flex flex-col justify-center rounded-lg  shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700  md:divide-y-0">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 md:h-5 h-3 mb-6 mt-8 rounded-full">
          <div
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-3 md:h-5 rounded-full"
            style={{width: "33.33%"}}
           />
        </div>
        {/* Selected Car Area */}
        <div className="hidden md:flex xl:flex flex-col md:flex-row justify-between items-start py-4 w-full space-y-2">
          {/* Car Image */}
          <div className="-ml-8">
            {/*<img src={vehicle.Image.url} className="object-contain h-48 w-68"  alt={"Best Value Vehicle"}/>*/}
            <img src={seletedCarImage} className="object-contain h-48 w-68" />
          </div>
          {/* Car Details */}
          <div className="flex-col items-start space-y-3 md:py-0 py-6">
            <h2 className="text-xl font-semibold">
              <span className="line-clamp-1">{vehicle?.VehicleName}</span>
            </h2>
            <h2 className="text-l">
              <span className="line-clamp-1">{vehicle?.CategoryName}</span>
            </h2>
            <StartRating reviewCount="333" point="4.9" />
            <InfoLink />
            <div className="text-sm text-neutral-500 dark:text-neutral-400 font-normal flex items-center">
              <FiUser size={18} />
              <span className="px-3">Seats {vehicle?.MaxPeople} people</span>
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400 font-normal flex items-center">
              <FiBriefcase size={18} />
              <span className="px-3">Fits {vehicle?.MaxLuggage} suitcases</span>
            </div>
          </div>
          {/* Info and Date Button */}
          <div className="flex-col items-start space-y-3 w-full md:w-max">
            <div className="text-sm text-neutral-500 dark:text-neutral-400 font-normal flex items-center">
              <BsCalendarX size={18} color="#556CE4" />
              <span className="px-3">Cancelation up to day before</span>
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400 font-normal flex items-center">
              <FaRegHandshake size={18} color="#556CE4" />
              <span className="px-3">Meet and greet at the spot</span>
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400 font-normal flex items-center">
              <MdTimer size={18} color="#556CE4" />
              <span className="px-3">Free Waiting Time</span>
            </div>
            <div className="flex justify-center items-center py-6 w-full">
              { vehicle?.price &&
              <ButtonSubmit2 label={vehicle.price + " €"} selectedVehicle={vehicle} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  };

  return renderForm();
};

export default SelectStepsDock;
