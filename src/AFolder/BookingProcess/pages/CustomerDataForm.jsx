import React, { FC, useEffect, useState, useRef, useReducer } from "react";
import { navigate } from "gatsby";
import BgGlassmorphism from "../../components/BgGlassmorphism";
import SelectStepsForm from "../VehicleSelection/SelectStepsForm";
import SectionSuggestionBox from "../../components/SectionSuggestBox";
import Step2FormSection1 from "../VehicleSelection/Step2FormSection1";
import Step2FormSection2 from "../VehicleSelection/Step2FormSection2";
import StepsNavigator from "../VehicleSelection/StepsNavigatorSection";
import "styles/__extra-styles.scss";
import VehicleSearchForm from "../VehicleSelection/VehicleSearchForm";
import BookNowStickyBar from "../customerDataForm/BookNowStickyBar";
import axios from "axios";
import { REACT_APP_REST_RESOURCE_BASE_END_POINT } from "AFolder/constants/apiEndpoints";
import validator from "validator";

const defaultState = {
  // User Data
  fName: "",
  lName: "",
  email: "",
  countryCode: "",
  phoneNumber: "",

  // Route Data
  arrFlightNumber: "",
  landingTime: "",
  dropAddress: "",
  addReturn: false,
  depFilghtNumber: "",
  pickUpTime: "",
  returnDate: "",
  pickUpAddress: "",

  // Extra Data
  extrasArr: [
    {
      checked: false,
      label: "Child Seat",
      price: "5.00",
      count: 0,
    },
    {
      checked: false,
      label: "Skis / Snowboard",
      price: "2.00",
      count: 0,
    },
    {
      checked: false,
      label: "Note For Driver",
      note: "",
    },
    {
      checked: false,
      label: "Infant Seat",
      price: "5.00",
      count: 0,
    },
    {
      checked: false,
      label: "Booster Seat",
      price: "5.00",
      count: 0,
    },
    {
      checked: false,
      label: "Bicycle",
      price: "10.00",
      count: 0,
    },
    {
      checked: false,
      label: "Wheelchair",
      price: "Free",
      count: 0,
    },
  ],
  errors: {
    fName: "",
    lName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    landingTime: "",
    pickUpTime: "",
    returnDate: "",
    pickUpAddress: "",
  },
  error: null,
  processing: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FIRST_NAME":
      return {
        ...state,
        fName: action.fName,
      };
    case "LAST_NAME":
      return {
        ...state,
        lName: action.lName,
      };
      break;
    case "EMAIL":
      return {
        ...state,
        email: action.email,
      };
    case "COUNTRY_CODE":
      return {
        ...state,
        countryCode: action.countryCode,
      };
    case "PHONE_NUMBER":
      return {
        ...state,
        phoneNumber: action.phoneNumber,
      };
    case "ARR_FLIGHT_NUMBER":
      return {
        ...state,
        arrFlightNumber: action.arrFlightNumber,
      };
    case "LANDING_TIME":
      return {
        ...state,
        landingTime: action.landingTime,
      };
    case "DROP_ADDRESS":
      return {
        ...state,
        dropAddress: action.dropAddress,
      };
    case "ADD_RETURN":
      return {
        ...state,
        addReturn: !state.addReturn,
      };
    case "DEP_FLIGHT_NUMBER":
      return {
        ...state,
        depFilghtNumber: action.depFilghtNumber,
      };
    case "PICK_UP_TIME":
      return {
        ...state,
        pickUpTime: action.pickUpTime,
      };
    case "RETURN_DATE":
      return {
        ...state,
        returnDate: action.returnDate,
      };
    case "PICK_UP_ADDRESS":
      return {
        ...state,
        pickUpAddress: action.pickUpAddress,
      };
    case "EXTRA_ARR_CHECKED":
      return {
        ...state,
        extrasArr: action.extrasArr,
      };
    case "EXTRA_ARR_COUNT":
      return {
        ...state,
        extrasArr: action.extrasArr,
      };
    case "EXTRA_ARR_NOTE":
      return {
        ...state,
        extrasArr: action.extrasArr,
      };
    case "SET_PREVIOUS_DATA":
      return {
        ...state,
        fName: action.previousData.fName,
        lName: action.previousData.lName,
        email: action.previousData.email,
        countryCode: action.previousData.countryCode,
        phoneNumber: action.previousData.phoneNumber,
        arrFlightNumber: action.previousData.arrFlightNumber,
        landingTime: action.previousData.landingTime,
        dropAddress: action.previousData.dropAddress,
        addReturn: action.previousData.addReturn,
        depFilghtNumber: action.previousData.depFilghtNumber,
        pickUpTime: action.previousData.pickUpTime,
        returnDate: action.previousData.returnDate,
        pickUpAddress: action.previousData.pickUpAddress,
        extrasArr: action.previousData.extrasArr,
      };
    case "PROCESSING":
      return {
        ...state,
        processing: state.processing,
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    default:
      throw new Error();
  }
};

const CustomerDataForm = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const scrollAnchor = useRef(null);
  const [routeData, setRoutData] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleSubmit = () => {
    dispatch({ type: "PROCESSING", processing: true });

    let errors = {};
    if (!state.landingTime) {
      errors.landingTime = "missing";
    }
    if (state.addReturn && !state.pickUpTime) {
      errors.pickUpTime = "missing";
    }
    if (state.addReturn && !state.returnDate) {
      errors.returnDate = "missing";
    }
    if (state.addReturn && !state.pickUpAddress) {
      errors.pickUpAddress = "missing";
    }
    if (!state.fName.trim()) {
      errors.fName = "missing";
    }
    if (!state.lName.trim()) {
      errors.lName = "missing";
    }
    if (!state.email) {
      errors.email = "missing";
    } else if (!validator.isEmail(state.email)) {
      errors.email = "is invalid";
    }
    if (!state.countryCode) {
      errors.countryCode = true;
    } else if (!state.countryCode.replace(/[^\d]/g, "")) {
      errors.countryCode = true;
    }
    if (!state.phoneNumber) {
      errors.phoneNumber = "missing";
    } else if (!validator.isMobilePhone(state.phoneNumber)) {
      errors.phoneNumber = "is invalid";
    }

    dispatch({ type: "SET_ERRORS", errors: { ...state.errors, ...errors } });

    if (Object.keys(errors).length === 0) {
      const data = {
        fName: state.fName,
        lName: state.lName,
        email: state.email,
        countryCode: state.countryCode,
        phoneNumber: state.phoneNumber,
        arrFlightNumber: state.arrFlightNumber,
        landingTime: state.landingTime,
        dropAddress: state.dropAddress,
        addReturn: state.addReturn,
        depFilghtNumber: state.depFilghtNumber,
        pickUpTime: state.pickUpTime,
        returnDate: state.returnDate,
        pickUpAddress: state.pickUpAddress,
        extrasArr: state.extrasArr,
      };

      setTimeout(() => {
        localStorage.setItem("formState", JSON.stringify(data));
        navigate("/checkout");
        dispatch({ type: "PROCESSING", processing: false });
      }, 2000);
    } else {
      dispatch({ type: "PROCESSING", processing: false });
      document
        .getElementById(`${Object.keys(errors)[0]}`)
        .scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    const routeDetailsAndPrices = JSON.parse(
      localStorage.getItem("routeDetailsAndPrices")
    );
    const vehicleDetail = JSON.parse(localStorage.getItem("selectedVehicle"));
    const customerData = JSON.parse(localStorage.getItem("formState"));

    if (customerData) {
      dispatch({ type: "SET_PREVIOUS_DATA", previousData: customerData });
    }
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

      //Create Intent
      let data = JSON.stringify({
        uuid: Math.random(),
        price: vehicleDetail?.price,
        paymentMethod: "card",
      });

      axios
        .post(
          `${REACT_APP_REST_RESOURCE_BASE_END_POINT}/create-payment-intent`,
          data,
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => localStorage.setItem("clientSecret", res.data));

      axios
        .get("https://ipapi.co/json/")
        .then((response) => {
          let data = response.data;
          dispatch({
            type: "COUNTRY_CODE",
            countryCode: data.country_calling_code.replace("+", ""),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (scrollAnchor && window.innerWidth < 640) {
      scrollAnchor.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  }, []);

  const checkUpdates = () => {
    const routeDetailsAndPrices = JSON.parse(
      localStorage.getItem("routeDetailsAndPrices")
    );
    const vehicleDetail = JSON.parse(localStorage.getItem("selectedVehicle"));

    if (
      !routeDetailsAndPrices ||
      !routeDetailsAndPrices.origin ||
      !routeDetailsAndPrices.destination ||
      !routeDetailsAndPrices.date ||
      !routeDetailsAndPrices.guests ||
      !routeDetailsAndPrices.fetchedPrices
      //|| (localData.date && moment().isAfter(localData.date))
    ) {
      alert("Please Check The Selected Time, Must be at least one hour later");
      localStorage.removeItem("routeDetailsAndPrices");
      // localStorage.removeItem("formState");
      navigate("/");
    } else {
      setRoutData(routeDetailsAndPrices);
      setSelectedVehicle(vehicleDetail);
    }
  };

  return (
    <div
      className={`nc-CustomerDataFormPage flex flex-col-reverse lg:flex-col relative`}
      data-nc-id="CustomerDataFormPage"
    >
      <BgGlassmorphism />
      <div className="container relative space-y-10 mb:space-y-24 mb-4 lg:space-y-32 ">
        {/* SEARCH FORM */}
        <div className="relative z-10 mb-0 md:mb-12 lg:mb-0 lg:mt-20 w-full">
          <VehicleSearchForm
            haveDefaultValue={routeData}
            btnType={"filter"}
            checkUpdates={checkUpdates}
          />
        </div>

        <div className="flex-col items-center w-full relative pt-0 mb:pt-4 pb-4">
          <div className="relative">
            <div ref={scrollAnchor} className="absolute -top-24" />
            <SelectStepsForm
              transferRouteData={routeData}
              className="lg:-mt-10"
              stepNumber={2}
              stepLabel="My Transfer Vehicle"
              errorState={state.errors}
              arrFlightNumber={state.arrFlightNumber}
              landingTime={state.landingTime}
              dropAddress={state.dropAddress}
              addReturn={state.addReturn}
              depFilghtNumber={state.depFilghtNumber}
              pickUpTime={state.pickUpTime}
              returnDate={state.returnDate}
              pickUpAddress={state.pickUpAddress}
              onArrFlightNumberChange={(e) =>
                dispatch({
                  type: "ARR_FLIGHT_NUMBER",
                  arrFlightNumber: e.target.value,
                })
              }
              onLandingTimeChange={(value) =>
                dispatch({ type: "LANDING_TIME", landingTime: value })
              }
              onDropAddressChange={(e) =>
                dispatch({ type: "DROP_ADDRESS", dropAddress: e.target.value })
              }
              onAddReturnChange={(e) =>
                dispatch({ type: "ADD_RETURN", addReturn: e.target.checked })
              }
              onDepFilghtNumberChange={(e) =>
                dispatch({
                  type: "DEP_FLIGHT_NUMBER",
                  depFilghtNumber: e.target.value,
                })
              }
              onPickUpTimeChange={(value) =>
                dispatch({ type: "PICK_UP_TIME", pickUpTime: value })
              }
              onReturnDateChange={(value) =>
                dispatch({ type: "RETURN_DATE", returnDate: value })
              }
              onPickUpAddressChange={(e) =>
                dispatch({
                  type: "PICK_UP_ADDRESS",
                  pickUpAddress: e.target.value,
                })
              }
            />
          </div>

          <div className="relative py-14">
            <SectionSuggestionBox
              addReturn={state.addReturn}
              transferRouteData={routeData}
              vehicleSelected={selectedVehicle}
              onAddReturnChange={(e) =>
                dispatch({ type: "ADD_RETURN", addReturn: e.target.checked })
              }
            />
          </div>

          <div className="relative pb-4">
            <div className="w-full relative mt-2 py-16 px-8 flex flex-col justify-center rounded-lg  shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700  md:divide-y-0">
              <div className="flex-col items-start justify-between space-y-12">
                {/* Section One */}
                <Step2FormSection1
                  extrasArr={state.extrasArr}
                  onExtrasArrCheckChange={(id) => {
                    const item = state.extrasArr[id];
                    const newData = [...state.extrasArr];
                    newData[id] = {
                      ...item,
                      checked: !item.checked,
                    };
                    dispatch({ type: "EXTRA_ARR_CHECKED", extrasArr: newData });
                  }}
                  onExtrasArrCountChange={(id, value) => {
                    const item = state.extrasArr[id];
                    const newData = [...state.extrasArr];
                    newData[id] = {
                      ...item,
                      count: value,
                    };
                    dispatch({ type: "EXTRA_ARR_COUNT", extrasArr: newData });
                  }}
                  onExtrasArrNoteChange={(e) => {
                    const item = state.extrasArr[2];
                    const newData = [...state.extrasArr];
                    newData[2] = {
                      ...item,
                      note: e.target.value,
                    };
                    dispatch({ type: "EXTRA_ARR_NOTE", extrasArr: newData });
                  }}
                />

                {/* Section Two */}
                <Step2FormSection2
                  errorState={state.errors}
                  fName={state.fName}
                  lName={state.lName}
                  email={state.email}
                  countryCode={state.countryCode}
                  phoneNumber={state.phoneNumber}
                  onFirstNameChange={(e) =>
                    dispatch({
                      type: "FIRST_NAME",
                      fName: e.target.value,
                    })
                  }
                  onLastNameChange={(e) =>
                    dispatch({
                      type: "LAST_NAME",
                      lName: e.target.value,
                    })
                  }
                  onEmailChange={(e) =>
                    dispatch({
                      type: "EMAIL",
                      email: e.target.value,
                    })
                  }
                  onCountryCodeChange={(e) =>
                    dispatch({
                      type: "COUNTRY_CODE",
                      countryCode: e.target.value,
                    })
                  }
                  onPhoneNumberChange={(e) =>
                    dispatch({
                      type: "PHONE_NUMBER",
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-16 relative flex flex-col">
            <div className="fixed bottom-0 md:bottom-4 z-40 custom-bottom-nav-styles transition-all  duration-200 ease-in-out">
              <StepsNavigator
                vehicleSelected={selectedVehicle}
                processing={state.processing}
                onNavigateBack={() => {
                  navigate(`/vehicle-selection`);
                }}
                onBookNowClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDataForm;
