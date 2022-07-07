import BackgroundSection from "AFolder/components/BackgroundSection";
import BgGlassmorphism from "AFolder/components/BgGlassmorphism";
import SectionGridAuthorBox from "AFolder/components/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage";
import SectionSliderNewCategories from "AFolder/components/SectionSliderNewCategories";
import SectionSubscribe2 from "AFolder/components/SectionSubscribe2";
import React, { FC } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";

export interface ListingStayPageProps {
  className?: string;
}

const ListingStayPage: FC<ListingStayPageProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id="ListingStayPage"
    >
      <Helmet>
        <title>Chisfis || Booking React Template</title>
      </Helmet>
      <BgGlassmorphism />

      <div className="container relative overflow-hidden">
        {/* SECTION HERO */}
        <SectionHeroArchivePage
          currentPage="Stays"
          currentTab="Stays"
          className="pt-10 pb-24 lg:pb-32 lg:pt-16 "
        />

        {/* SECTION */}
        <SectionGridFilterCard className="pb-24 lg:pb-32" />

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

export default ListingStayPage;
