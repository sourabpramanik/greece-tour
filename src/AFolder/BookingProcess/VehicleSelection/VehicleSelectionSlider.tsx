import React, { useEffect, useMemo, FC } from "react";
import SubHeading from "components/Heading/SubHeading";
import Glide from "@glidejs/glide";
import NextPrev from "shared/NextPrev/NextPrev";
import { DEMO_CAR_LISTINGS } from "data/listings";
import { CarDataType } from "data/types";
import VehicleCarouselCard from "./VehicleCarouselCard";

export interface VehicleSelectionSliderProps {
  className?: string;
  data?: CarDataType[];
}

const VehicleSelectionSlider: FC<VehicleSelectionSliderProps> = ({
  subHeading,
  uniqueID,
  vehicleList,
  itemPerRow = 4,
  sliderStyle = "style1",
}) => {
  const UNIQUE_CLASS = `gallerySlider__${uniqueID}`;

  let MY_GLIDEJS = useMemo(() => {
    return new Glide(`.${UNIQUE_CLASS}`, {
      type: "slider",
      perView: itemPerRow,
      gap: 32,
      bound: true,
      rewind: false,
      animationDuration: 1000,
      dragThreshold: false,
      // peek: { before: 50, after: 50 },
      perTouch: 2,
      breakpoints: {
        1280: {
          perView: itemPerRow - 1,
        },
        1024: {
          gap: 20,
          perView: itemPerRow - 1,
        },
        768: {
          gap: 20,
          perView: itemPerRow - 2,
        },
        640: {
          gap: 20,
          perView: itemPerRow - 3,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    });
  }, [UNIQUE_CLASS]);

  useEffect(() => {
    if (document.querySelector(`.${UNIQUE_CLASS}`)) {
      setTimeout(() => {
        MY_GLIDEJS.mount();
      }, 100);
    }
  }, [MY_GLIDEJS, UNIQUE_CLASS]);

  // useEffect(() => {
  //     if (document.querySelector(`.${UNIQUE_CLASS}`)) {
  //         new Glide(`.${UNIQUE_CLASS}`, {
  //             type: "slider",
  //             perView: itemPerRow,
  //             gap: 32,
  //             bound: true,
  //             rewind: false,
  //             animationDuration: 1000,
  //             dragThreshold: false,
  //             // peek: { before: 50, after: 50 },
  //             perTouch: 2,
  //             breakpoints: {
  //                 1280: {
  //                     perView: itemPerRow - 1,
  //                 },
  //                 1024: {
  //                     gap: 20,
  //                     perView: itemPerRow - 1,
  //                 },
  //                 768: {
  //                     gap: 20,
  //                     perView: itemPerRow - 2,
  //                 },
  //                 640: {
  //                     gap: 20,
  //                     perView: itemPerRow - 3,
  //                 },
  //                 500: {
  //                     gap: 20,
  //                     perView: 1.3,
  //                 },
  //             },
  //         }).mount();
  //     }
  // }, []);

  return (
    <div className={`nc-SectionSliderNewCategories`}>
      <div className={`${UNIQUE_CLASS} flow-root flex-row items-center`}>
        <SubHeading
          desc={subHeading}
          hasNextPrev={sliderStyle === "style1"}
          isCenter={sliderStyle === "style2"}
        />
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {vehicleList?.map((car) => (
              <VehicleCarouselCard key={car.EnumId} data={car} />
            ))}
          </ul>
        </div>
        <NextPrev className="justify-center mt-10 block md:hidden xl:hidden" />
      </div>
    </div>
  );
};

export default VehicleSelectionSlider;
