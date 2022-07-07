import React, { useEffect, useState } from "react";
import LocationInput from "../../components/LocationInput";
import GuestsInput from "../../components/GuestsInput";
import ExperiencesDateSingleInput from "../../components/ExperiencesDateSingleInput";
import ButtonSubmit from "../../components/ButtonSubmit";

import {
  GiBattleship,
  GiCommercialAirplane,
  GiModernCity,
} from "react-icons/gi";
import moment from "moment";

const searchPlaceholder = [
  {
    placeId: "Athens_Airport",
    id: "ChIJYVzn2RqQoRQRqrPuCt8Vsjg",
    title: "Athens Airport",
    subtitle: 'Athens International Airport "Eleftherios Venizelos", Greece ',
    icon: <GiCommercialAirplane size={25} />,
  },
  {
    placeId: "Piraeus_Port",
    id: "ChIJdaoSV9W7oRQRqwqk7sYpM6k",
    title: "Piraeus Port",
    subtitle: "Piraeus Port (All ferries and Cruises)",
    icon: <GiBattleship size={25} />,
  },
  {
    placeId: "Lavrio_Port",
    id: "ChIJw0OVl3H0oRQRKPRZoqtJ6_I",
    title: "Lavrio Port",
    subtitle: "Piraeus Port (All ferries and Cruises)",
    icon: <GiBattleship size={25} />,
  },
  {
    placeId: "Rafina_Port",
    id: "ChIJg6dE4ZqDoRQRCovmgvTXaFY",
    title: "Lavrio Port",
    subtitle: "Piraeus Port (All ferries and Cruises)",
    icon: <GiBattleship size={25} />,
  },
];

const VehicleSearchForm = ({
  haveDefaultValue,
  btnType,
  sendToParent,
  checkUpdates,
}) => {
  const [dateValue, setdateValue] = useState(null);
  const [pickUpInputValue, setPickUpInputValue] = useState(null);
  const [dropOffInputValue, setDropOffInputValue] = useState(null);
  const [guestValue, setGuestValue] = useState(1);

  const [originFocus, setOriginFocus] = useState(false);
  const [dateFocused, setDateFocused] = useState(false);
  const [dropOffFocus, setDropOffFocused] = useState(false);

  useEffect(() => {
    checkButton();
    if (btnType === "filter" && haveDefaultValue) {
      setdateValue(moment(haveDefaultValue?.date));
      setPickUpInputValue(haveDefaultValue?.origin);
      setDropOffInputValue(haveDefaultValue?.destination);
      setGuestValue(haveDefaultValue?.guests);
    } else if (haveDefaultValue) {
      const tada = searchPlaceholder.reduce(
        (result, item) =>
          haveDefaultValue?.locations.some(
            (el) => el.Locations === item.placeId
          )
            ? [...result, item]
            : result,
        []
      );

      // setdateValue(defaultDate)
      setPickUpInputValue(tada[0]);
      setDropOffInputValue(tada[1]);
      // setGuestValue(haveDefaultValue?.guests)
    }
  }, [haveDefaultValue]);

  function click(e) {
    if (pickUpInputValue === null) {
      setOriginFocus(true);
    } else if (dropOffInputValue === null) {
      setDropOffFocused(true);
    } else if (dateValue === null) {
      setDateFocused(true);
    }
  }

  const checkButton = () => {
    if (haveDefaultValue == null || btnType == null) {
      return (
        <ButtonSubmit
          sendDataToParent={(e) => click(e)}
          origin={pickUpInputValue}
          destination={dropOffInputValue}
          date={dateValue}
          guests={guestValue}
          btnType={btnType}
        />
      );
    } else if (
      (haveDefaultValue?.guests === guestValue &&
        haveDefaultValue?.origin.id !== pickUpInputValue?.id) ||
      haveDefaultValue?.destination.id !== dropOffInputValue?.id
    ) {
      // return <ButtonSubmit2 label={"Update Route"} bookingWidgetData={data}/>
      return (
        <ButtonSubmit
          sendDataToParent={(e) => click(e)}
          origin={pickUpInputValue}
          destination={dropOffInputValue}
          date={dateValue}
          guests={guestValue}
          onlyGuestsChanged={false}
          checkUpdates={checkUpdates}
          btnType={btnType}
        />
      );
    } else if (haveDefaultValue?.guests !== guestValue) {
      return (
        <ButtonSubmit
          label={"Update Route"}
          origin={pickUpInputValue}
          destination={dropOffInputValue}
          date={dateValue}
          guests={guestValue}
          onlyGuestsChanged={true}
          checkUpdates={checkUpdates}
          btnType={btnType}
        />
      );
    }
  };

  const renderForm = () => {
    return (
      <form className="w-full relative mt-4 md:mt-8 flex flex-col md:flex-row md:items-center rounded-3xl md:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700  md:divide-y-0">
        <LocationInput
          placeHolder="Pick-Up"
          desc="Athens Airport, Piraeus Port Etc.?"
          autoFocus={originFocus}
          defaultValue={pickUpInputValue}
          onChange={(e) => setPickUpInputValue(e)}
          onInputDone={() => setDropOffFocused(btnType == null)}
          onFocusChange={(e) => setOriginFocus(e)}
          searchPlaceholder={searchPlaceholder}
        />

        <LocationInput
          placeHolder="Drop-Off"
          desc="Athens Airport, Piraeus Port Etc.?"
          defaultValue={dropOffInputValue}
          autoFocus={dropOffFocus}
          onChange={(e) => setDropOffInputValue(e)}
          onInputDone={() => setDateFocused(btnType == null)}
          onFocusChange={(e) => setDropOffFocused(e)}
          searchPlaceholder={searchPlaceholder}
        />

        <ExperiencesDateSingleInput
          defaultValue={dateValue}
          onChange={(date) => setdateValue(date)}
          defaultFocus={dateFocused}
          fieldClassName="p-5"
          onFocusChange={(focus) => {
            setDateFocused(focus);
          }}
        />

        <GuestsInput
          defaultValue={guestValue}
          onChange={(data) => {
            setGuestValue(data);
          }}
        />
        {/* BUTTON SUBMIT OF FORM */}
        <div className="px-4 py-4 lg:py-0 mr-6">{checkButton()}</div>
      </form>
    );
  };

  return renderForm();
};

export default VehicleSearchForm;
