import BackgroundSection from "../components/BackgroundSection";
import BgGlassmorphism from "../components/BgGlassmorphism";
import SectionGridAuthorBox from "../components/SectionGridAuthorBox";
import SectionSliderNewCategories from "../components/SectionSliderNewCategories";
import SectionSubscribe2 from "../components/SectionSubscribe2";
import React from "react";
import TransferSearchForm from "./TransferSearchForm";
import Heading from "../../shared/Heading/Heading";


const TransferDetailPage = ({ className = "", pageContext }) => {
  const {transfer} = pageContext;

  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id="ListingStayPage"
    >
      <BgGlassmorphism />

      <div className="container relative overflow-hidden">

        {/* SECTION HERO */}
        <div className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 pt-10 pb-24 lg:pb-32 lg:pt-16`} data-nc-id="HeroSearchForm">
          <Heading
              desc={"Private Transfer"}
              hasNextPrev={false}
              isCenter={true}
          >
            {transfer.name}
          </Heading>
          <TransferSearchForm haveDefaultValue={transfer} />
        </div>

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

export default TransferDetailPage;
