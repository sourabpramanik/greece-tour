import React from "react";
import StartRating from "../../components/StartRating";
import SaleOffBadge from "../../components/SaleOffBadge";
import Badge from "../../components/Badge";
import NcImage from "../../components/NcImage";
import {FiUser, FiBriefcase} from "react-icons/fi"
import InfoLink from "../../components/InfoLink";
import {DEMO_CAR_LISTINGS} from "../../../data/listings";
import ButtonSubmit2 from "../../components/ButtonSubmit2";

const VehicleCarouselCard = ({size = "default", className = "", data}) => {

    const renderSliderGallery = () => {
        return (
            <div className="relative w-full rounded-2xl overflow-hidden">
                <div className="m-4 pb-4">
                    <span
                        className=" text-sm text-neutral-500 dark:text-neutral-400 font-normal">{data.CategoryName}</span>
                </div>
                <div className="aspect-w-16 aspect-h-9 ">
                    <NcImage
                        containerClassName="flex items-center justify-center"
                        className="w-full rounded-2xl"
                        src={data.Image.url}
                        // src={DEMO_DATA.featuredImage}
                    />
                </div>
                {/* <BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" /> */}
                {false && <SaleOffBadge className="absolute right-3 top-3"/>}
            </div>
        );
    };

    const renderContent = () => {
        return (
            <div className={size === "default" ? "p-5  space-y-4" : "p-3  space-y-2"}>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        {false && <Badge name="ADS" color="green"/>}
                        <h2
                            className={`  capitalize ${
                                size === "default"
                                    ? "text-xl font-semibold"
                                    : "text-base font-medium"
                            }`}
                        >
                            <span className="line-clamp-1">{data.VehicleName}</span>
                        </h2>
                    </div>
                    <StartRating reviewCount="333" point="4.9"/>
                    <InfoLink data={data}/>
                    <div className="flex-col text-neutral-500 dark:text-neutral-400 text-sm space-y-2 py-4">
                        <div className="flex items-center"><FiUser size={18}/><span
                            className="px-3">{data.MaxPeople} people</span></div>
                        <div className="flex items-center"><FiBriefcase size={18}/><span
                            className="px-3">{data.MaxLuggage} suitcases</span></div>
                    </div>
                </div>
                <div className="w-14  border-b border-neutral-100 dark:border-neutral-800"/>
                <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            {/* {price} */}
              {` `}
              {size === "default" && (
                  <div className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                      One way price:
                  </div>
              )}
              {data.price == null ? "Request A Quote" : +data.price + " €"}
          </span>
                </div>
                <div className="flex justify-center items-center">
                    <ButtonSubmit2 label={data.price == null ? "Contact Us Now" : "Book Now"} selectedVehicle={data} />
                </div>
                {/*<div className="flex justify-center items-center">*/}
                {/*    <button*/}
                {/*        onClick={onVehicleSelectionSubmit}*/}
                {/*        type="button"*/}
                {/*        className="h-10 md:h-12 rounded-lg w-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none"*/}
                {/*    >*/}
                {/*        <span className="text-base font-semibold">{data.price == null ? "Contact Us Now" : "Book Now"}</span>*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        );
    };

    return (
        <div
            className={`nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-neutral-900 ${className}`}
            data-nc-id="CarCard"
        >
            <div className="flex flex-col">
                {renderSliderGallery()}
                {renderContent()}
            </div>
        </div>
    );
};

export default VehicleCarouselCard;