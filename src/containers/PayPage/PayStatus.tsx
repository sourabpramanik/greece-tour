import React, { useState, FC, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import StartRating from "components/StartRating/StartRating";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import { FiUser, FiBriefcase } from "react-icons/fi";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { DEMO_CAR_LISTINGS } from "data/listings";

const PayStatus = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const [paymentDetail, setPaymentDetail] = useState(null);
  const [showItems, setShowItems] = useState(3);
  const [routeData, setRoutData] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formState, setFormState] = useState(null);

  const CarImage = DEMO_CAR_LISTINGS[0].featuredImage;

  useEffect(() => {
    const routeDetailsAndPrices = JSON.parse(
      localStorage.getItem("routeDetailsAndPrices")
    );
    const selectedVehicleDetail = JSON.parse(
      localStorage.getItem("selectedVehicle")
    );
    const formData = JSON.parse(localStorage.getItem("formState"));

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
      navigate("/checkout");
    } else {
      setRoutData(routeDetailsAndPrices);
      setSelectedVehicle(selectedVehicleDetail);
      setFormState(formData);
    }
  }, []);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    // Retrieve the PaymentIntent
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Success! Payment received. 🎉");
          setPaymentDetail(paymentIntent);
          break;

        case "processing":
          setMessage(
            "Payment processing. We'll update you when payment is received."
          );
          break;

        case "requires_payment_method":
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          setMessage("Payment failed. Please try another payment method.");
          break;

        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleExpand = () => {
    showItems === 3 ? setShowItems(10) : setShowItems(3);
  };

  const renderPayMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">{message}</h2>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* ------------------------ */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Your booking</h3>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-shrink-0 w-full sm:w-40">
              <div className="object-contain aspect-h-4  md:aspect-h-1  rounded-2xl overflow-hidden">
                <NcImage src={CarImage} />
              </div>
            </div>
            <div className="pt-5  sm:pb-5 sm:px-5 space-y-3">
              <div>
                {/* <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                  {selectedVehicle.CategoryName}
                </span> */}
                <span className="text-base sm:text-lg font-medium mt-1 block">
                  {selectedVehicle.name}
                </span>
              </div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
                <FiUser size={18} />
                <span className="px-3">Seats 4 people</span>
              </span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
                <FiBriefcase size={18} />
                <span className="px-3">Fits 5 suitcases</span>
              </span>
              <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
              <StartRating />
            </div>
          </div>
        </div>

        {/* ------------------------ */}
        {paymentDetail && (
          <>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Booking detail</h3>
              <div className="flex flex-col space-y-4">
                {formState.arrFlightNumber && (
                  <div className="flex text-neutral-6000 dark:text-neutral-300">
                    <span className="flex-1">Arrival flight number</span>
                    <span className="flex-1 font-normal md:font-medium text-neutral-900 dark:text-neutral-100">
                      {formState.arrFlightNumber}
                    </span>
                  </div>
                )}
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Landing Time</span>
                  <span className="flex-1 font-normal md:font-medium text-neutral-900 dark:text-neutral-100">
                    {new Date(formState.landingTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {formState.dropAddress && (
                  <div className="flex text-neutral-6000 dark:text-neutral-300">
                    <span className="flex-1">Drop Address</span>
                    <span className="flex-1 font-normal md:font-medium text-neutral-900 dark:text-neutral-100">
                      {formState.dropAddress}
                    </span>
                  </div>
                )}
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Name</span>
                  <span className="flex-1 font-normal md:font-medium text-neutral-900 dark:text-neutral-100">
                    {formState.fName} {formState.lName}
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Email</span>
                  <span className="flex-1 truncate font-normal md:font-medium text-neutral-900 dark:text-neutral-100">
                    {formState.email}
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Phone Number</span>
                  <span className="flex-1 font-normal md:font-medium text-neutral-900 dark:text-neutral-100">
                    +{formState.countryCode} {formState.phoneNumber}
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Equipment and Extras</span>
                  <span className="flex-1 text-neutral-900 dark:text-neutral-100">
                    {formState.extrasArr
                      .slice(0, showItems)
                      .map((item, index) => (
                        <div className="pb-3" key={index}>
                          {item.checked && (
                            <div className="flex items-center space-x-3">
                              <span className="font-normal md:font-medium">
                                {item.label}:{" "}
                              </span>
                              {index !== 2 && item.count && (
                                <span className="text-sm">{item.count}x</span>
                              )}
                              {item.note && <span>{item.note}</span>}
                            </div>
                          )}
                        </div>
                      ))}
                    {formState.extrasArr.map((item, index) => (
                      <>
                        {item.count > 0 ||
                          (item.note && (
                            <div onClick={() => handleExpand()}>
                              {showItems === 3 ? (
                                <span className="text-sm text-primary-6000 flex items-center cursor-pointer">
                                  <span>Show more</span>
                                  <MdArrowDropDown size={18} />
                                </span>
                              ) : (
                                <span className="text-sm text-primary-6000 flex items-center cursor-pointer">
                                  <span>Show less</span>
                                  <MdArrowDropUp size={18} />
                                </span>
                              )}
                            </div>
                          ))}
                      </>
                    ))}
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Date</span>
                  <span className="flex-1 font-normal md:font-medium text-neutral-900 dark:text-neutral-100">
                    {new Date(
                      1000 * paymentDetail.created
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Total</span>
                  <span className="flex-1 font-normal md:font-medium text-neutral-900 dark:text-neutral-100">
                    €{paymentDetail.amount / 100}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Payment method</span>
                  <span className="flex-1 font-normal md:font-medium text-neutral-900 dark:text-neutral-100">
                    Credit card
                  </span>
                </div>
              </div>
            </div>
            <div>
              <ButtonPrimary href="/">Explore more stays</ButtonPrimary>
            </div>
          </>
        )}
      </div>
    );
  };

  return <>{selectedVehicle && formState && <div>{renderPayMain()}</div>}</>;
};

export default PayStatus;
