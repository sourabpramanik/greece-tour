import React, { useState } from "react";
import SelectStepsDock from "./SelectStepsDock";
import SelectStep2Dock from "./SelectStep2Dock";
import SelectSteps3Dock from "./SelectStep3Dock";

const SelectStepsForm = ({
  error,
  className,
  vehicle,
  stepNumber,
  stepLabel,
  transferRouteData,
  errorState,
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
  const renderTab = () => {
    return (
      <div className="flex justify-between w-full px-4">
        <span>{stepLabel}</span>
        <span className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400">
          Step {stepNumber} of 3
        </span>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <>
        {stepNumber === 1 ? <SelectStepsDock vehicle={vehicle} /> : null}
        {stepNumber === 2 ? (
          <SelectStep2Dock
            errorState={errorState}
            transferRouteData={transferRouteData}
            arrFlightNumber={arrFlightNumber}
            landingTime={landingTime}
            dropAddress={dropAddress}
            addReturn={addReturn}
            depFilghtNumber={depFilghtNumber}
            pickUpTime={pickUpTime}
            returnDate={returnDate}
            pickUpAddress={pickUpAddress}
            onArrFlightNumberChange={onArrFlightNumberChange}
            onLandingTimeChange={onLandingTimeChange}
            onDropAddressChange={onDropAddressChange}
            onAddReturnChange={onAddReturnChange}
            onDepFilghtNumberChange={onDepFilghtNumberChange}
            onPickUpTimeChange={onPickUpTimeChange}
            onReturnDateChange={onReturnDateChange}
            onPickUpAddressChange={onPickUpAddressChange}
          />
        ) : null}
        {stepNumber === 3 ? <SelectSteps3Dock /> : null}
      </>
    );
  };

  return (
    <div
      className={`nc-SelectStepsForm w-full ${className}`}
      data-nc-id="SelectStepsForm"
    >
      {renderTab()}
      {renderForm()}
    </div>
  );
};

export default SelectStepsForm;
