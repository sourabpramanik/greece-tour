import React, { FC } from "react";
import BackgroundSection from "AFolder/components/BackgroundSection";
import BgGlassmorphism from "AFolder/components/BgGlassmorphism";
import SectionGridAuthorBox from "AFolder/components/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage";
import SectionSliderNewCategories from "AFolder/components/SectionSliderNewCategories";
import SectionSubscribe2 from "AFolder/components/SectionSubscribe2";
import SectionGridHasMap from "./SectionGridHasMap";
import { Helmet } from "react-helmet";

export interface ListingCarMapPageProps {
  className?: string;
}

const ListingCarMapPage: FC<ListingCarMapPageProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-ListingCarMapPage relative ${className}`}
      data-nc-id="ListingCarMapPage"
    >
      <Helmet>
        <title>Chisfis || Booking React Template</title>
      </Helmet>
      <BgGlassmorphism />

      {/* SECTION HERO */}
      <div className="container pt-10 pb-24 lg:pt-16 lg:pb-32">
        <SectionHeroArchivePage
          currentPage="Cars"
          currentTab="Cars"
          listingType={
            <>
              <i className="text-2xl las la-car"></i>
              <span className="ml-2.5">1512 cars</span>
            </>
          }
        />
      </div>

      {/* SECTION */}
      <div className="container pb-24 lg:pb-32 2xl:pl-10 xl:pr-0 xl:max-w-none">
        <SectionGridHasMap />
      </div>

      <div className="container overflow-hidden">
        {/* SECTION 1 */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
          />
        </div>

        {/* SECTION */}
        <SectionSubscribe2 className="py-24 lg:py-32" />

        {/* SECTION */}
        <div className="relative py-16 mb-24 lg:mb-32">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div>
      </div>
    </div>
  );
};

export default ListingCarMapPage;
