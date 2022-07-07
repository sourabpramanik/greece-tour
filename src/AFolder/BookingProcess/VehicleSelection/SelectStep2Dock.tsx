import React, { useCallback, useEffect, useState } from "react";
import ButtonSubmit2 from "../components/ButtonSubmit2";
import { Tab } from "@headlessui/react";
import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import { FiClock } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { BsCalendarEvent } from "react-icons/bs";
import CustomTimepicker from "shared/CustomTimepicker/CustomTimepicker";
import CustomDatepicker from "shared/CustomDatepicker/CustomDatepicker";

const SelectStepsDock = ({
  register,
  errorState,
  transferRouteData,
  arrFlightNumber,
  landingTime,
  dropAddress,
  addReturn,
  depFilghtNumber,
  pickUpTime,
  returnDate,
  pickUpAddress,
  onArrFlightNumberChange,
  onLandingTimeChange,
  onDropAddressChange,
  onAddReturnChange,
  onDepFilghtNumberChange,
  onPickUpTimeChange,
  onReturnDateChange,
  onPickUpAddressChange,
}) => {
  const renderForm = () => {
    return (
      <div className="w-full relative mt-2 px-8 flex flex-col justify-center rounded-lg  shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-900 ">
        {/* Progress Bar */}
        <div class="w-full bg-gray-200 md:h-5 h-3 mb-6 mt-8 rounded-full">
          <div
            class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-3 md:h-5 rounded-full"
            style={{ width: "66.66%" }}
          ></div>
        </div>
        {/* Selected Car Area */}
        <div className="flex flex-col justify-between items-start pt-4 w-full space-y-2">
          {/* Transfer Start-End */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:items-start space-y-8 md:space-y-0 md:py-0 py-6 w-full">
            <div className="flex flex-row md:flex-col items-start space-x-2 md:space-x-0 space-y-0 md:space-y-2">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                Starting From:
              </p>
              <p className="text-sm font-semibold">
                {transferRouteData?.origin.title}
              </p>
            </div>
            <div className="flex flex-col xl:flex-row justify-between items-end xl:space-x-4 space-y-10 md:space-y-6 xl:space-y-0">
              <div className="w-full relative h-14 flex items-center">
                <Input
                  id="a_f_n"
                  placeholder="arrival flight number"
                  name="arrFlightNumber"
                  value={arrFlightNumber}
                  onChange={onArrFlightNumberChange}
                />
                <Label for="a_f_n">
                  <span>Arrival flight number (optional)</span>
                </Label>
              </div>
              <div className="space-y-1 w-full relative">
                <div className="relative h-14 flex items-center">
                  <div className="pointer-events-none absolute inset-y-4.5 left-0 px-4  text-gray-400">
                    <FiClock size={20} className="pointer-events-none" />
                  </div>
                  <div className="absolute inset-y-2 left-0 z-20 flex items-center pl-8 w-full">
                    <CustomTimepicker
                      value={landingTime}
                      handleTimeChange={onLandingTimeChange}
                    />
                  </div>
                  <Input
                    readOnly
                    id="landingTime"
                    placeholder="landingTime"
                    value={
                      landingTime
                        ? new Date(landingTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""
                    }
                    className="pl-16 cursor-pointer"
                  />
                  <Label
                    for="landingTime"
                    isError={errorState.landingTime}
                    className="left-10"
                  >
                    Landing time
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Transfer Start-End Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:pt-12 py-6 space-y-8 md:space-y-0 w-full  items-start">
            <div className="flex flex-row md:flex-col items-start space-x-2 md:space-x-0 space-y-0 md:space-y-2">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                Going To:
              </p>
              <p className="text-sm font-semibold">
                {transferRouteData?.destination.title}
              </p>
            </div>
            <div className="relative h-14 flex items-center">
              <Input
                ref={register}
                id="drop-address"
                placeholder="placeholder"
                name="dropAddress"
                value={dropAddress}
                onChange={onDropAddressChange}
              />
              <Label for="drop-address" isError={errorState.dropAddress}>
                Drop off address
              </Label>
            </div>
          </div>
        </div>

        {/* Return Dock */}
        {addReturn && (
          <>
            <div className="relative w-full my-10">
              <hr className="w-full bg-gray-900" />
              <span
                onClick={onAddReturnChange}
                className={`absolute cursor-pointer ${
                  window.innerWidth < 800
                    ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    : "top-1/2 right-0 -translate-y-1/2"
                } w-max px-2 text-sm font-semibold text-red-500 bg-white dark:bg-neutral-900 flex items-center justify-center space-x-1`}
              >
                <span>Remove Return</span>
                <MdClose size={16} style={{ fontWeight: 700 }} />
              </span>
            </div>
            <div className="flex flex-col justify-between items-start py-4 w-full space-y-2">
              {/* Transfer Start-End */}
              <div className="grid grid-cols-1 md:grid-cols-2 md:items-start space-y-8 md:space-y-0 md:py-0 py-6 w-full">
                <div className="flex flex-row md:flex-col items-start space-x-2 md:space-x-0 space-y-0 md:space-y-2">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                    Returning From:
                  </p>
                  <p className="text-sm font-semibold">
                    {transferRouteData?.destination.title}
                  </p>
                </div>
                <div className="felx flex-col items-center">
                  <div className="flex flex-col xl:flex-row justify-between items-end xl:space-x-4 space-y-10 md:space-y-6 xl:space-y-0">
                    <div className="space-y-1 w-full relative">
                      <div className="relative h-14 flex items-center">
                        <div className="pointer-events-none absolute inset-y-4.5 left-0 px-4 z-20 text-gray-400">
                          <BsCalendarEvent
                            size={20}
                            className="pointer-events-none"
                          />
                        </div>
                        <div className="absolute inset-y-2 left-0 z-20 flex items-center pl-10 w-full">
                          <CustomDatepicker
                            value={returnDate}
                            handleTimeChange={onReturnDateChange}
                          />
                        </div>
                        <Input
                          id="returnDate"
                          placeholder="returnDate"
                          value={
                            returnDate
                              ? new Date(returnDate).toLocaleDateString()
                              : ""
                          }
                          className="cursor-pointer pl-16"
                        />
                        <Label
                          for="returnDate"
                          isError={errorState.returnDate}
                          className="left-10"
                        >
                          Return Date
                        </Label>
                      </div>
                    </div>
                    <div className="space-y-1 w-full relative">
                      <div className="relative h-14 flex items-center">
                        <div className="pointer-events-none absolute inset-y-4.5 left-0 px-4 z-20 text-gray-400">
                          <FiClock size={20} className="pointer-events-none" />
                        </div>
                        <div className="absolute inset-y-2 left-0 z-20 flex items-center pl-8 w-full">
                          <CustomTimepicker
                            value={pickUpTime}
                            handleTimeChange={onPickUpTimeChange}
                          />
                        </div>
                        <Input
                          id="pickUpTime"
                          placeholder="pickUpTime"
                          value={
                            pickUpTime
                              ? new Date(pickUpTime).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : ""
                          }
                          className="cursor-pointer pl-16"
                        />
                        <Label
                          for="pickUpTime"
                          isError={errorState.pickUpTime}
                          className="left-10"
                        >
                          Pick up time
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="relative my-8 h-14 flex items-center">
                    <Input
                      id="pickUpAddress"
                      placeholder="placeholder"
                      name="pickUpAddress"
                      value={pickUpAddress}
                      onChange={onPickUpAddressChange}
                    />
                    <Label
                      for="pickUpAddress"
                      isError={errorState.pickUpAddress}
                    >
                      Pick up address
                    </Label>
                  </div>
                </div>
              </div>

              {/* Transfer Start-End Input */}
              <div className="grid grid-cols-1 md:grid-cols-2 md:pt-12 py-6 space-y-8 md:space-y-0 w-full  items-start">
                <div className="flex flex-row md:flex-col items-start space-x-2 md:space-x-0 space-y-0 md:space-y-2">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                    Returning To:
                  </p>
                  <p className="text-sm font-semibold">
                    {transferRouteData?.origin.title}
                  </p>
                </div>
                <div className="flex flex-col xl:flex-row justify-between items-end xl:space-x-4 space-y-10 md:space-y-2 xl:space-y-0">
                  <div className="w-full relative h-14 flex items-center">
                    <Input
                      id="depFilghtNumber"
                      placeholder="Departure flight number"
                      name="depFilghtNumber"
                      value={depFilghtNumber}
                      onChange={onDepFilghtNumberChange}
                    />
                    <Label for="depFilghtNumber">
                      <span>Departure flight number</span>
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <i id="return-toggel"></i>
      </div>
    );
  };

  return renderForm();
};

export default SelectStepsDock;
