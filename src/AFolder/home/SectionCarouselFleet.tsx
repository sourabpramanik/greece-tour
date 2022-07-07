import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import Heading from "../../components/Heading/Heading";
import FleetCard from "./FleetCard";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

//todo Fix the spinner is always true > and the Tabs have no default
const SectionCarouselFleet: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Tours & Activities",
  subHeading = "Popular places to stay that Chisfis recommends for you",
  headingIsCenter,
  tabs = ["Athens", "Thessaloniki", "Mykonos", "Santorini"],
}) => {
  const renderCard = (stay: StayDataType) => {
    return <FleetCard key={stay.id} data={stay} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
        <Heading desc={subHeading}>{heading}</Heading>
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {stayListings.map((stay) => renderCard(stay))}
      </div>
    </div>
  );
};

export default SectionCarouselFleet;
