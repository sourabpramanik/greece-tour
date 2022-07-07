import React, { FC, useEffect, useRef, useState } from "react";
import BgGlassmorphism from "AFolder/components/BgGlassmorphism";
import VehicleSelectionSlider from "../VehicleSelection/VehicleSelectionSlider";
import { graphql, useStaticQuery, navigate } from "gatsby";
import SelectStepsForm from "../VehicleSelection/SelectStepsForm";
import cloneDeep from "lodash/cloneDeep";
import VehicleSearchForm from "../VehicleSelection/VehicleSearchForm";

let defaultHeight;
let defaultWidth;

const useWindowSize = () => {
  const [dimensions, setDimensions] = useState({
    windowHeight: defaultHeight,
    windowWidth: defaultWidth,
  });

  useEffect(() => {
    const handler = () =>
      setDimensions({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
      });

    window.addEventListener(`resize`, handler);
    return () => window.removeEventListener(`resize`, handler);
  }, []);

  return dimensions;
};

const VehicleSelection = () => {
  // Graphql
  const query = graphql`
    {
      allStrapiVehicleLists(sort: { fields: Order, order: ASC }) {
        nodes {
          EnumId
          CategoryName
          MaxLuggage
          MaxPeople
          Image {
            url
          }
          Order
          VehicleName
        }
      }
    }
  `;
  const data = useStaticQuery(query);
  const {
    allStrapiVehicleLists: { nodes: vehicles },
  } = data;

  const scrollAnchor = useRef(null);

  // New Logic
  const [state, setState] = useState(null);
  const [suggested, setSuggested] = useState(null);
  const [vehicleList, setVehicleList] = useState(null);
  const [uniqueId, setUniqueId] = useState("web");
  // When Size Is bigger than mobile > Use the cloned list
  const windowSize = useWindowSize();

  useEffect(() => {
    const routeDetailsAndPrices = JSON.parse(
      localStorage.getItem("routeDetailsAndPrices")
    );

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
      // Only Local Storage Data Logic
      vehicles.forEach((vehicle) => {
        const vehicleData =
          routeDetailsAndPrices.fetchedPrices?.priceList?.find(
            (e) => e.vehicleCategory?.id === vehicle.EnumId
          );
        if (vehicleData) {
          vehicle.price = vehicleData.price;
          vehicle.uuid = vehicleData.uuid;
        }
      });

      if (windowSize.windowWidth > 640 || window.innerWidth > 640) {
        setUniqueId("web");
        //Remove Suggested Vehicle From The Carousel
        const clonedList = cloneDeep(vehicles);
        setSuggested(
          routeDetailsAndPrices.guests <= 4 ? vehicles[0] : vehicles[3]
        );

        clonedList.splice(routeDetailsAndPrices.guests <= 4 ? 0 : 1, 1);
        setVehicleList(clonedList);
      } else {
        setUniqueId("mobile");
        setVehicleList(vehicles);
      }

      setState(routeDetailsAndPrices);
      localStorage.removeItem("formState");
    }
  }, [windowSize.windowWidth]);

  useEffect(() => {
    if (scrollAnchor && window.innerWidth < 640) {
      scrollAnchor.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  }, [vehicleList]);

  const checkUpdates = () => {
    const routeDetailsAndPrices = JSON.parse(
      localStorage.getItem("routeDetailsAndPrices")
    );

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
      // Only Local Storage Data Logic
      vehicles.forEach((vehicle) => {
        const vehicleData =
          routeDetailsAndPrices.fetchedPrices?.priceList?.find(
            (e) => e.vehicleCategory?.id === vehicle.EnumId
          );
        if (vehicleData) {
          vehicle.price = vehicleData.price;
          vehicle.uuid = vehicleData.uuid;
        }
      });

      if (windowSize.windowWidth > 640 || window.innerWidth > 640) {
        setUniqueId("web");
        //Remove Suggested Vehicle From The Carousel
        const clonedList = cloneDeep(vehicles);
        setSuggested(
          routeDetailsAndPrices.guests <= 4 ? vehicles[0] : vehicles[3]
        );

        clonedList.splice(routeDetailsAndPrices.guests <= 4 ? 0 : 1, 1);
        setVehicleList(clonedList);
      } else {
        setUniqueId("mobile");
        setVehicleList(vehicles);
      }

      setState(routeDetailsAndPrices);
      localStorage.removeItem("formState");
    }
  };

  return (
    <div
      className={`nc-VehicleSelectionPage flex flex-col-reverse lg:flex-col relative`}
      data-nc-id="VehicleSelection"
    >
      <BgGlassmorphism />
      <div className="container relative space-y-10 mb:space-y-24 mb-6 lg:space-y-32 lg:mb-12">
        {/* SEARCH FORM */}

        <div className="relative z-10 mb-0 md:mb-12 lg:mb-0 lg:mt-20 w-full">
          <div
            className={`nc-HeroSearchForm w-full my-5 lg:py-0`}
            data-nc-id="HeroSearchForm"
          >
            <VehicleSearchForm
              haveDefaultValue={state}
              btnType={"filter"}
              checkUpdates={checkUpdates}
            />
          </div>
        </div>
        <div className="flex-col items-center w-full relative pt-0 mb:pt-4 pb-16">
          <div className="relative">
            <div ref={scrollAnchor} className="absolute -top-24" />
            <SelectStepsForm
              className=" lg:-mt-10"
              vehicle={suggested}
              stepNumber={1}
              stepLabel="My Transfer Vehicle"
            />
          </div>
          <div className="z-10 mb-12 lg:mb-0 mt-6 lg:mt-10 w-full">
            <VehicleSelectionSlider
              uniqueID={uniqueId}
              vehicleList={vehicleList}
              subHeading={"Feeling Curious? Here's More"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSelection;
