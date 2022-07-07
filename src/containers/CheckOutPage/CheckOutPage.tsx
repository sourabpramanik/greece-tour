import { Tab } from "@headlessui/react";
import { PencilAltIcon } from "@heroicons/react/outline";
import React, { FC, Fragment, useState, useEffect } from "react";
import visaPng from "images/vis.png";
import mastercardPng from "images/mastercard.svg";
import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import { navigate } from "gatsby";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import StartRating from "components/StartRating/StartRating";
import NcModal from "shared/NcModal/NcModal";
import SelectStepsForm from "AFolder/BookingProcess/VehicleSelection/SelectStepsForm";
import { Dialog, Transition } from "@headlessui/react";
import { FiUser, FiBriefcase } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import TransferSearchForm from "AFolder/transfer/TransferSearchForm";
import { REACT_APP_REST_RESOURCE_BASE_END_POINT } from "AFolder/constants/apiEndpoints";
import axios from "axios";
import { DEMO_CAR_LISTINGS } from "data/listings";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentsPage from "./PaymentsPage";
import BgGlassmorphism from "AFolder/components/BgGlassmorphism";

export interface CheckOutPageProps {
  className?: string;
}

const stripePromise = loadStripe("pk_test_okk0TZerRWR9ZCyiLFGJ1OYK002vAhrkeS");

const CheckOutPage: FC<CheckOutPageProps> = ({
  className = "min-h-screen relative",
}) => {
  const [open, setOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [totalPayable, setTotalPayable] = useState(0);

  const [routeData, setRoutData] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formState, setFormState] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const routeDetailsAndPrices = JSON.parse(
      localStorage.getItem("routeDetailsAndPrices")
    );
    const vehicleDetail = JSON.parse(localStorage.getItem("selectedVehicle"));
    const formData = JSON.parse(localStorage.getItem("formState"));
    const secret = localStorage.getItem("clientSecret");

    if (
      !routeDetailsAndPrices ||
      !routeDetailsAndPrices.origin ||
      !routeDetailsAndPrices.destination ||
      !routeDetailsAndPrices.date ||
      !routeDetailsAndPrices.guests ||
      //|| (localData.date && moment().isAfter(localData.date))
      !routeDetailsAndPrices.fetchedPrices
    ) {
      alert("Please Check The Selected Time, Must be at least one hour later");
      localStorage.removeItem("routeDetailsAndPrices");
      navigate("/");
    } else {
      setRoutData(routeDetailsAndPrices);
      setSelectedVehicle(vehicleDetail);
      setFormState(formData);
      setClientSecret(secret);
    }
  }, []);

  const CarImage = DEMO_CAR_LISTINGS[0].featuredImage;

  const handleOpenModal = () => {
    setOpen((prev) => !prev);
  };
  let options = { weekday: "short", month: "long", day: "numeric" };

  useEffect(() => {
    if (formState) {
      handleTotalPayable();
    }
  }, [formState]);

  const handleTotalPayable = () => {
    let totalExtras = 0;
    formState.extrasArr.map((item) => {
      if (!isNaN(item.price)) {
        totalExtras += item.price * item.count;
        return;
      }
    });
    setTotalPayable(
      formState.addReturn
        ? selectedVehicle.price * 2 + totalExtras
        : selectedVehicle.price + totalExtras
    );
  };
  console.log(formState);

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        {/* vehicle details */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className="object-contain aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <NcImage src={CarImage} className="pl-1" />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {selectedVehicle.CategoryName}
              </span>
              <span className="text-base font-medium mt-1 block">
                {selectedVehicle.VehicleName}
              </span>
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
              <FiUser size={18} />
              <span className="px-3">
                Seats {selectedVehicle.MaxPeople} people
              </span>
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
              <FiBriefcase size={18} />
              <span className="px-3">
                Fits {selectedVehicle.MaxLuggage} suitcases
              </span>
            </span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            <StartRating />
          </div>
        </div>

        {/* Transfer Detail */}
        <div className="relative pt-5">
          <div
            onClick={() => {
              navigate(`/vehicle-selection`);
            }}
            className="absolute cursor-pointer text-neutral-600 dark:text-neutral-400 flex items-center right-0"
          >
            <span className="text-xs">Edit</span>
            <AiOutlineEdit size={18} />
          </div>
          {/*Transfer date*/}
          <div className="w-full text-center text-xs text-neutral-500 space-x-3">
            <span>
              {new Date(routeData.date).toLocaleDateString("default", options)}
            </span>
            <span>
              {new Date(formState.landingTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* Transfer Locations */}
          <div className="w-full mx-auto mt-2">
            <div className="flex pb-3 w-full justify-between">
              <div className="flex-1">
                <div className="w-2 h-2 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
                  <span className="text-white text-center w-full">
                    <i className="fa fa-check w-full fill-current white"></i>
                  </span>
                </div>
              </div>

              <div className="w-full align-center items-center align-middle content-center flex">
                <div className="w-full bg-green-300 rounded items-center align-middle align-center flex-1">
                  <div
                    className="bg-green-light text-xs leading-none text-center text-grey-darkest rounded "
                    style={{ width: "100%", padding: "0.2% 0%" }}
                  ></div>
                </div>
              </div>

              <div className="flex-1">
                <div className="w-2 h-2 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
                  <span className="text-white text-center w-full">
                    <i className="fa fa-check w-full fill-current white"></i>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex content-center justify-between w-full">
              <div className="text-sm text-start">{routeData.origin.title}</div>

              <div className="text-sm text-end">
                {routeData.destination.title}
              </div>
            </div>
          </div>
        </div>
        {formState.pickUpTime && (
          <div className="relative pb-5">
            <div className="cursor-pointer text-neutral-600 dark:text-neutral-400 flex justify-center right-0">
              <span className="text-md pb-2">Return</span>
            </div>
            {/*Transfer date*/}
            <div className="w-full text-center text-xs text-neutral-500 space-x-3">
              <span>
                {new Date(formState.returnDate).toLocaleDateString(
                  "default",
                  options
                )}
              </span>
              <span>
                {new Date(formState.pickUpTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {/* Transfer Locations */}
            <div className="w-full mx-auto mt-2 mb-4 pb-4">
              <div className="flex pb-3 w-full justify-between">
                <div className="flex-1">
                  <div className="w-2 h-2 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
                    <span className="text-white text-center w-full">
                      <i className="fa fa-check w-full fill-current white"></i>
                    </span>
                  </div>
                </div>

                <div className="w-full align-center items-center align-middle content-center flex">
                  <div className="w-full bg-green-300 rounded items-center align-middle align-center flex-1">
                    <div
                      className="bg-green-light text-xs leading-none text-center text-grey-darkest rounded "
                      style={{ width: "100%", padding: "0.2% 0%" }}
                    ></div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="w-2 h-2 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
                    <span className="text-white text-center w-full">
                      <i className="fa fa-check w-full fill-current white"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex content-center justify-between w-full">
                <div className="text-sm text-start">
                  {routeData.destination.title}
                </div>

                <div className="text-sm text-end">{routeData.origin.title}</div>
              </div>
            </div>
          </div>
        )}
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="space-y-1">
          {/* Customer Detail */}
          <div className="flex w-full justify-between items-start mb-4 pb-2">
            <div className="flex flex-col items-start space-y-1">
              <span>
                {formState.fName} {formState.lName}
              </span>
              <span className="text-neutral-600 dark:text-neutral-400 text-sm">
                {formState.email}
              </span>
              <span className="text-neutral-600 dark:text-neutral-400 text-sm">
                +{formState.countryCode}-{formState.phoneNumber}
              </span>
            </div>
            <div
              className="cursor-pointer text-neutral-600 dark:text-neutral-400 flex items-center right-0"
              onClick={() => navigate(`/customer-data-form`)}
            >
              <span className="text-xs">Edit</span>
              <AiOutlineEdit size={18} />
            </div>
          </div>
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

          <div className="flex justify-between text-neutral-600 dark:text-neutral-400 text-sm w-full pt-4">
            <span className="flex-1">Total Passengers:</span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {routeData.guests}
            </span>
          </div>
          <div className="text-neutral-600 dark:text-neutral-400 text-sm">
            <span className="flex-1">
              {formState.extrasArr.map((item, index) => (
                <div className={item.checked ? "pb-1" : "pb-0"} key={index}>
                  {item.checked && (
                    <div className="flex items-center justify-between space-x-3">
                      <span className="flex-1">{item.label}: </span>
                      {index !== 2 && item.count && (
                        <span className="text-neutral-900 dark:text-neutral-100">
                          {item.count}
                        </span>
                      )}
                      {item.note && (
                        <span className="text-neutral-900 dark:text-neutral-100">
                          {item.note}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </span>
          </div>
        </div>

        {/* Price Detail */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Price detail</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>
              €
              {formState.addReturn
                ? selectedVehicle.price * 2
                : selectedVehicle.price}
            </span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Equipments & extras charges</span>
            <span>
              €
              {formState.addReturn
                ? totalPayable - selectedVehicle.price * 2
                : totalPayable - selectedVehicle.price}
            </span>
          </div>
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>€{totalPayable}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderModal = () => {
    return (
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => handleOpenModal()}
          className=" fixed inset-0 z-50"
        >
          <div className="min-h-screen overflow-y-scroll px-1 text-center md:mx-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-10 dark:bg-opacity-40" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={`w-full md:w-5/12 inline-block mt-2 mb-14 text-left align-middle transition-all transform bg-white border border-black border-opacity-5 shadow-xl rounded-2xl sm:my-8 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-900 dark:text-neutral-300`}
              >
                <div className="py-2 flex flex-col items-start relative">
                  <Dialog.Title className="flex justify-end w-full">
                    {/*<h2 className="text-md font-semibold">About this category</h2>*/}
                    <ButtonClose onClick={() => handleOpenModal()}>
                      Close
                    </ButtonClose>
                  </Dialog.Title>
                  <Dialog.Description
                    className="w-full overflow-y-scroll customScrollbar"
                    style={{ height: "80vh" }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center mx-3 ">
                      <div className="flex-shrink-0 w-full sm:w-40">
                        <div className="object-contain aspect-w-2 aspect-h-1 sm:aspect-h-4 rounded-2xl overflow-hidden">
                          <NcImage src={CarImage} className="pl-1" />
                        </div>
                      </div>
                      <div className="pt-4 pb-5 sm:px-5 space-y-3">
                        <div>
                          <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                            {selectedVehicle.CategoryName}
                          </span>
                          <span className="text-base font-medium mt-1 block">
                            {selectedVehicle.VehicleName}
                          </span>
                        </div>
                        <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
                          <FiUser size={18} />
                          <span className="px-3">
                            Seats {selectedVehicle.MaxPeople} people
                          </span>
                        </span>
                        <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
                          <FiBriefcase size={18} />
                          <span className="px-3">
                            Fits {selectedVehicle.MaxLuggage} suitcases
                          </span>
                        </span>
                        <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
                        <StartRating />
                      </div>
                    </div>
                    {/* Transfer Detail */}
                    <div className="relative py-5 mx-3">
                      <div
                        onClick={() => {
                          navigate(`/vehicle-selection`);
                        }}
                        className="absolute cursor-pointer text-neutral-600 dark:text-neutral-400 flex items-center right-0"
                      >
                        <span className="text-xs">Edit</span>
                        <AiOutlineEdit size={18} />
                      </div>
                      {/*Transfer date*/}
                      <div className="w-full text-center text-xs text-neutral-500 space-x-3">
                        <span>
                          {new Date(routeData.date).toLocaleDateString(
                            "default",
                            options
                          )}
                        </span>
                        <span>
                          {new Date(formState.landingTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>

                      {/* Transfer Locations */}
                      <div className="w-full mx-auto mt-2">
                        <div className="flex pb-3 w-full justify-between">
                          <div className="flex-1">
                            <div className="w-2 h-2 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
                              <span className="text-white text-center w-full">
                                <i className="fa fa-check w-full fill-current white"></i>
                              </span>
                            </div>
                          </div>

                          <div className="w-full align-center items-center align-middle content-center flex">
                            <div className="w-full bg-green-300 rounded items-center align-middle align-center flex-1">
                              <div
                                className="bg-green-light text-xs leading-none text-center text-grey-darkest rounded "
                                style={{ width: "100%", padding: "0.2% 0%" }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex-1">
                            <div className="w-2 h-2 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
                              <span className="text-white text-center w-full">
                                <i className="fa fa-check w-full fill-current white"></i>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex content-center justify-between w-full">
                          <div className="text-sm text-start">
                            {routeData.origin.title}
                          </div>

                          <div className="text-sm text-end">
                            {routeData.destination.title}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/**/}
                    {formState.pickUpTime && (
                      <div className="relative pb-5 mb-2">
                        <div className="cursor-pointer text-neutral-600 dark:text-neutral-400 flex justify-center right-0">
                          <span className="text-md pb-2">Return</span>
                        </div>
                        {/*Transfer date*/}
                        <div className="w-full text-center text-xs text-neutral-500 space-x-3">
                          <span>
                            {new Date(formState.returnDate).toLocaleDateString(
                              "default",
                              options
                            )}
                          </span>
                          <span>
                            {new Date(formState.pickUpTime).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>

                        {/* Transfer Locations */}
                        <div className="w-full mx-auto mt-2 mb-4 pb-4">
                          <div className="flex pb-3 w-full justify-between">
                            <div className="flex-1">
                              <div className="w-2 h-2 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
                                <span className="text-white text-center w-full">
                                  <i className="fa fa-check w-full fill-current white"></i>
                                </span>
                              </div>
                            </div>

                            <div className="w-full align-center items-center align-middle content-center flex">
                              <div className="w-full bg-green-300 rounded items-center align-middle align-center flex-1">
                                <div
                                  className="bg-green-light text-xs leading-none text-center text-grey-darkest rounded "
                                  style={{ width: "100%", padding: "0.2% 0%" }}
                                ></div>
                              </div>
                            </div>

                            <div className="flex-1">
                              <div className="w-2 h-2 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
                                <span className="text-white text-center w-full">
                                  <i className="fa fa-check w-full fill-current white"></i>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex content-center justify-between w-full">
                            <div className="text-sm text-start">
                              {routeData.destination.title}
                            </div>

                            <div className="text-sm text-end">
                              {routeData.origin.title}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/**/}
                    <div className="border-b border-neutral-200 dark:border-neutral-700 mx-3"></div>

                    <div className="space-y-1 py-4 mx-3">
                      {/* Customer Detail */}
                      <div className="flex w-full justify-between items-start py-2">
                        <div className="flex flex-col items-start space-y-1">
                          <span>
                            {formState.fName} {formState.lName}
                          </span>
                          <span className="text-neutral-600 dark:text-neutral-400 text-sm">
                            {formState.email}
                          </span>
                          <span className="text-neutral-600 dark:text-neutral-400 text-sm">
                            +{formState.countryCode}-{formState.phoneNumber}
                          </span>
                        </div>
                        <div
                          className="cursor-pointer text-neutral-600 dark:text-neutral-400 flex items-center right-0"
                          onClick={() => navigate(`/customer-data-form`)}
                        >
                          <span className="text-xs">Edit</span>
                          <AiOutlineEdit size={18} />
                        </div>
                      </div>
                      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

                      <div className="flex justify-between text-neutral-600 dark:text-neutral-400 text-sm w-full pt-2">
                        <span className="flex-1">Total Passengers:</span>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">
                          {routeData.guests}
                        </span>
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                        <span className="flex-1">
                          {formState.extrasArr.map((item, index) => (
                            <div
                              className={item.checked ? "pb-1" : "pb-0"}
                              key={index}
                            >
                              {item.checked && (
                                <div className="flex items-center justify-between space-x-3">
                                  <span className="flex-1">{item.label}: </span>
                                  {index !== 2 && item.count && (
                                    <span className="text-neutral-900 dark:text-neutral-100">
                                      {item.count}
                                    </span>
                                  )}
                                  {item.note && (
                                    <span className="text-neutral-900 dark:text-neutral-100">
                                      {item.note}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </span>
                      </div>
                    </div>

                    {/* Price Detail */}
                    <div className="flex flex-col py-4 space-y-4 mx-3">
                      <h3 className="text-2xl font-semibold">Price detail</h3>
                      <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span>Service charge</span>
                        <span>€{selectedVehicle.price}</span>
                      </div>
                      <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span>Equipments & extras charges</span>
                        <span>€{totalPayable - selectedVehicle.price}</span>
                      </div>
                      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>€{totalPayable}</span>
                      </div>
                    </div>
                  </Dialog.Description>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderMain = () => {
    return (
      <>
        <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-4 px-2 sm:p-6 xl:p-8 shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-900">
          <div className="relative">
            <span
              onClick={() => handleOpenModal()}
              className="block lg:hidden underline  mt-4 cursor-pointer"
            >
              View booking details
            </span>
          </div>
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold">Pay with</h3>
            <div className="pt-10">
              <Tab.Group>
                <Tab.List className="flex">
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                          selected
                            ? "bg-neutral-800 text-white"
                            : "text-neutral-6000 dark:text-neutral-400"
                        }`}
                      >
                        Card
                      </button>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                          selected
                            ? "bg-neutral-800 text-white"
                            : " text-neutral-6000 dark:text-neutral-400"
                        }`}
                      >
                        Cash
                      </button>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                          selected
                            ? "bg-neutral-800 text-white"
                            : " text-neutral-6000 dark:text-neutral-400"
                        }`}
                      >
                        Paypal
                      </button>
                    )}
                  </Tab>
                </Tab.List>

                <div className="w-14 border-b border-neutral-200 my-5"></div>
                <Tab.Panels className="border-transparent focus:border-transparent focus:ring-0 noFocus">
                  <Tab.Panel className="space-y-5 border-transparent focus:border-transparent focus:ring-0 noFocus">
                    {renderStripeTab()}
                  </Tab.Panel>
                  <Tab.Panel className="space-y-5 border-transparent focus:border-transparent focus:ring-0 noFocus">
                    <div className="space-y-1">
                      <Label>Email </Label>
                      <Input type="email" defaultValue="example@gmail.com" />
                    </div>
                    <div className="space-y-1">
                      <Label>Password </Label>
                      <Input type="password" defaultValue="***" />
                    </div>
                    <div className="space-y-1">
                      <Label>Messager for author </Label>
                      <Textarea placeholder="..." />
                      <span className="text-sm text-neutral-500 block">
                        Write a few sentences about yourself.
                      </span>
                    </div>
                    <div className="pt-4">
                      <ButtonPrimary>Confirm and pay</ButtonPrimary>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderStripeTab = () => {
    const options = {
      clientSecret: clientSecret,
      appearance: {
        theme: "night",
      },
    };
    return (
      <>
        {showSpinner && (
          <div className="flex justify-center items-center noFocus">
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
          </div>
        )}
        {options.clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <PaymentsPage
              setShowSpinner={(e) => setShowSpinner(e)}
              price={totalPayable}
            />
          </Elements>
        )}
      </>
    );
  };

  return (
    <>
      <div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
        <BgGlassmorphism />
        {/* Progress Bar */}
        <div className="container ">
          <SelectStepsForm
            className="mt-4"
            stepNumber={3}
            stepLabel="Confirm and payment"
          />
        </div>
        <main className="container pt-11 pb-24 lg:pb-32 flex flex-col-reverse lg:flex-row relative">
          {clientSecret && (
            <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">
              {renderMain()}
            </div>
          )}
          {selectedVehicle && formState && (
            <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
          )}
        </main>
      </div>
      {selectedVehicle && formState && (
        <div className="flex justify-center">{renderModal()}</div>
      )}
    </>
  );
};

export default CheckOutPage;
