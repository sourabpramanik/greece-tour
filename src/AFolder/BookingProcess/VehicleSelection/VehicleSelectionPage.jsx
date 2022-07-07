import React, {FC, useEffect, useRef, useState} from "react";
import {Helmet} from "react-helmet";
import BgGlassmorphism from "AFolder/components/BgGlassmorphism";
import VehicleSelectionForm from "./VehicleSelectionForm";
import VehicleSelectionSlider from "./VehicleSelectionSlider";
import BackgroundSection from "../../components/BackgroundSection";
import {graphql, useStaticQuery, navigate} from "gatsby";
import SelectStepsForm from "./SelectStepsForm";
import cloneDeep from 'lodash/cloneDeep';
import axios from "axios";
import {REACT_APP_REST_RESOURCE_BASE_END_POINT} from "../../constants/apiEndpoints";
import TransferSearchForm from "../../transfer/TransferSearchForm";
import {setState} from "gatsby/dist/utils/worker/child/state";


let defaultHeight
let defaultWidth

const useWindowSize = () => {
    const [dimensions, setDimensions] = useState({
        windowHeight: defaultHeight,
        windowWidth: defaultWidth,
    })

    useEffect(() => {
        const handler = () => setDimensions({
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
        })

        window.addEventListener(`resize`, handler)
        return () => window.removeEventListener(`resize`, handler)
    }, [])

    return dimensions
}

const VehicleSelectionPage = () => {
    const localTransferData = JSON.parse(localStorage.getItem("localTransferData"));
    const urlSearchParam = new URLSearchParams(window.location.search);
    const paramTransferData = {
        origin: {
            id: urlSearchParam.get('origin_id'),
            title: urlSearchParam.get('origin_title'),
        },
        destination: {
            id: urlSearchParam.get('destination_id'),
            title: urlSearchParam.get('destination_title'),
        },
        date: new Date(urlSearchParam.get('date')).toISOString(),
        guests: parseInt(urlSearchParam.get('guests')),
    }

    const [fetchedPrice, setFetchedPrice] = useState(null)

    const scrollAnchor = useRef(null)
    const data = useStaticQuery(graphql`
    {
     allStrapiVehicleLists(sort: {fields: Order, order: ASC}) {
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
  `);
    const passengers = localTransferData ? localTransferData.guests : paramTransferData.guests;
    let vehicleList = data.allStrapiVehicleLists.nodes;

    data.allStrapiVehicleLists.nodes.forEach((vehicle) => {
        const vehicleData = localTransferData ?
            (localTransferData.fetchedPrices?.priceList?.find((e) => e.vehicleCategory?.id === vehicle.EnumId)) :
            (fetchedPrice?.priceList.find((e) => e.vehicleCategory.id === vehicle.EnumId))

        if (vehicleData) {
            vehicle.price = vehicleData.price;
            vehicle.uuid = vehicleData.uuid;
        }
    });

    let clonedList = cloneDeep(data.allStrapiVehicleLists.nodes);
    //clonedList = clonedList.filter((item) => item.MaxPeople >= localTransferData ? localTransferData.guests : paramTransferData.guests);

    const suggestedVehicle = passengers <= 4 ? clonedList[0] : clonedList[3];
    const indexToRemove = clonedList.indexOf(suggestedVehicle);
    clonedList.splice(indexToRemove, 1);

    useEffect(() => {
        console.log("Test")
        if (!urlSearchParam.get('origin_id') && !localTransferData) {
            navigate("/");
        } else if (urlSearchParam.get('origin_id') !== null && localTransferData === null) {
            if (vehicleList.price) {
                return
            } else {
                handleParamPricelist()
            }
        }
        if (scrollAnchor && window.innerWidth < 640) {
            scrollAnchor.current.scrollIntoView({behavior: 'smooth', block: "center"})
        }

    }, [fetchedPrice])


    const windowSize = useWindowSize();
    if (windowSize.windowWidth > 640) {
        vehicleList = clonedList;
    }

    const handleParamPricelist = () => {
        let data = JSON.stringify({
            transferDateTime: paramTransferData.date,
            originPlaceId: paramTransferData.origin.id,
            destinationPlaceId: paramTransferData.destination.id,
            adultGuests: paramTransferData.guests,
        });
        try {
            axios.post(`${REACT_APP_REST_RESOURCE_BASE_END_POINT}/prices/placeId`, data, {
                headers: {"Content-Type": "application/json"},

            }).then((r) => {
                setFetchedPrice(r.data)

                let saveOnLocal = JSON.stringify({
                    origin: {
                        id: paramTransferData.origin.id,
                        title: paramTransferData.origin.title,
                        // subtitle: origin.subtitle
                    },
                    destination: {
                        id: paramTransferData.destination.id,
                        title: paramTransferData.destination.title,
                        // subtitle: destination.subtitle
                    },
                    date: paramTransferData.date,
                    guests: paramTransferData.guests,
                    fetchedPrices: r.data,
                });

                localStorage.setItem("localTransferData", saveOnLocal);
            })
        } catch (error) {
            //todo need an alert modal
            alert(error.response.data)
        }
    };

    return (
        <div
            className={`nc-VehicleSelectionPage flex flex-col-reverse lg:flex-col relative`}
            data-nc-id="VehicleSelectionPage"
        >
            <BgGlassmorphism/>
            <div ref={scrollAnchor} className="container relative space-y-10 mb:space-y-24 mb-6 lg:space-y-32 lg:mb-12">
                {/* SEARCH FORM */}
                <div className="relative z-10 mb-0 md:mb-12 lg:mb-0 lg:mt-20 w-full">
                    <div className={`nc-HeroSearchForm w-full my-5 lg:py-0`} data-nc-id="HeroSearchForm">
                        <TransferSearchForm haveDefaultValue={localTransferData ? localTransferData : paramTransferData} btnType={"filter"}/>
                    </div>
                </div>
                <div className="flex-col items-center w-full relative pt-0 mb:pt-4 pb-16">
                    {/* <BackgroundSection /> */}
                    <div className="relative">
                        <SelectStepsForm className=" lg:-mt-10" vehicle={suggestedVehicle} stepNumber={1}
                                         stepLabel="My Transfer Vehicle"/>
                    </div>
                    <div className="z-10 mb-12 lg:mb-0 mt-6 lg:mt-10 w-full">
                        <VehicleSelectionSlider data={vehicleList} subHeading={"Feeling Curious? Here's More"}/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default VehicleSelectionPage;
