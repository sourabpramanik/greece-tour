import React, { useEffect, useCallback } from "react";
import MultiLabelCheckbox from "../../components/MultiLabelCheckbox";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Label from "components/Label/Label";
import { HiOutlineMail } from "react-icons/hi";
import { BiErrorCircle } from "react-icons/bi";
import { BsTelephone, BsFillInfoCircleFill } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import { Menu } from "@headlessui/react";
import NcList from "shared/NcList/NcList";

const Step2FormSection2 = (props) => {
  const {
    fName,
    lName,
    email,
    countryCode,
    phoneNumber,
    errorState,
    onFirstNameChange,
    onLastNameChange,
    onEmailChange,
    onCountryCodeChange,
    onPhoneNumberChange,
  } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 md:space-y-0">
      <h2 className="text-md font-semibold">A Few Details About You</h2>
      <div className="flex flex-col justify-start items-start justify-self-start space-y-8">
        {/* Textfields */}
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-8 md:space-y-0 w-full md:flex-row md:justify-between items-center md:items-start md:space-x-4">
            <div className="relative w-full h-14 flex items-center">
              <Input
                id="fName"
                type="text"
                placeholder="First Name"
                name="fName"
                value={fName}
                onChange={onFirstNameChange}
              />
              <Label isError={errorState.fName} for="fname">
                First Name
              </Label>
            </div>

            <div className="relative w-full h-14 flex items-center">
              <Input
                id="lName"
                type="text"
                placeholder="Last Name"
                name="lName"
                value={lName}
                onChange={onLastNameChange}
              />
              <Label isError={errorState.lName} for="lname">
                Last Name
              </Label>
            </div>
          </div>
          <div className="w-full relative h-14 flex items-center">
            <Input
              id="email"
              type="email"
              placeholder="Your Email"
              className="px-10"
              autcomplete="email"
              name="email"
              value={email}
              onChange={onEmailChange}
            />
            <div
              className={`pointer-events-none absolute inset-y-4 left-0 px-4 z-20 mix-blend-difference`}
            >
              <HiOutlineMail size={20} />
            </div>
            <Label isError={errorState.email} for="email" className="left-10">
              Email Address {errorState.email}
            </Label>
          </div>
          <div className="flex justify-between items-start space-x-4">
            <div className="relative flex flex-row items-center h-14 ">
              <Input
                id="countryCode"
                className="w-20 text-center pl-6"
                // isError={errorState.countryCode}
                autoComplete="tel-country-code"
                size="5"
                maxLength="5"
                name="countryCode"
                value={countryCode}
                onChange={onCountryCodeChange}
              />
              <div
                className={`text-sm absolute top-4.5 z-10 left-4 ${
                  errorState.countryCode
                    ? "text-red-500"
                    : "text-gray-400 dark:text-white"
                } mix-blend-difference`}
              >
                +
              </div>
            </div>
            <div className="relative w-full h-14 flex items-center">
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                className="px-12"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onPhoneNumberChange}
                autoComplete="tel-national"
              />
              <div
                className={`pointer-events-none absolute inset-y-4 left-0 px-4 z-20 mix-blend-difference`}
              >
                <BsTelephone size={20} />
              </div>
              <Label
                for="phone"
                className={"left-10 w-full"}
                isError={errorState.phoneNumber}
              >
                {errorState.phoneNumber
                  ? `Phone no. ${errorState.phoneNumber}`
                  : "Phone Number"}
              </Label>
            </div>
          </div>
          <div className="relative flex items-start text-gray-400 font-normal">
            <BsFillInfoCircleFill size={16} />
            <span className="px-2 text-sm">
              You don't have to worry, we won't call you for anything unrelated
              to the transfer service.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2FormSection2;
