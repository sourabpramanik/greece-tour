import React, { FC } from "react";
import GallerySlider from "AFolder/components/GallerySlider";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import StartRating from "components/StartRating/StartRating";
import { navigate } from "gatsby";

export interface StayCardProps {
  className?: string;
  ratioClass?: string;
  data?: StayDataType;
  size?: "default" | "small";
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const StayCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
  ratioClass,
}) => {
  const {
    galleryImgs,
    listingCategory,
    address,
    title,
    bedrooms,
    href,
    like,
    saleOff,
    isAds,
    price,
    reviewStart,
    reviewCount,
    id,
  } = data;

  const handleCardClickEvent = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'I') {
      navigate(href);
    }
  }

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`stay-v-${id}`}
          ratioClass={ratioClass}
          galleryImgs={galleryImgs}
        />
        {/*<BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" />*/}
        {/*{saleOff && <SaleOffBadge className="absolute left-3 top-3" />}*/}
      </div>
    );
  };

  const renderContent = () => {

    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h2
              className={` font-medium capitalize ${size === "default" ? "text-lg" : "text-base"
                }`}
            >
              <span className="line-clamp-1">{title}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            {size === "default" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span className="">{address}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            From {price}
            {` `}
            {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                € / Up To 18 Persons
              </span>
            )}
          </span>
          {!!reviewStart && (
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="StayCard"
    >
      <div className={`cursor-pointer`} onClick={handleCardClickEvent}>
        {renderSliderGallery()}
        {renderContent()}
      </div>
    </div>
  );
};

export default StayCard;
