import React from "react";
import "react-dates/initialize";
import { navigate } from "gatsby";
import TransferSearchForm from "../../transfer/TransferSearchForm";

const VehicleSelectionForm = ({ className, defaultValue }) => {

  return (
    <div
      className={`nc-HeroSearchForm w-full my-5 lg:py-0 ${className} `}
      data-nc-id="HeroSearchForm"
    >
      <TransferSearchForm haveDefaultValue={defaultValue} btnType={"filter"} />
    </div>
  );
};

export default VehicleSelectionForm;
