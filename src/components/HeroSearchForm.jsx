import React from "react";
import "react-dates/initialize";
import TransferSearchForm from "../AFolder/transfer/TransferSearchForm";

const HeroSearchForm = ({className, currentTab, currentPage}) => {

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
      data-nc-id="HeroSearchForm"
    >
      <TransferSearchForm haveDefaultValue={null}  />
    </div>
  );
};

export default HeroSearchForm;
