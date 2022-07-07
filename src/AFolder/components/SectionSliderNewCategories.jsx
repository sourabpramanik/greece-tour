import React, {useEffect, useState} from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import CardCategory3 from "components/CardCategory3/CardCategory3";
import CardCategory4 from "components/CardCategory4/CardCategory4";
import NextPrev from "shared/NextPrev/NextPrev";
import CardCategory5 from "components/CardCategory5/CardCategory5";

const SectionSliderNewCategories = ({
                                      heading ,
                                      subHeading,
                                      className = "",
                                      itemClassName = "",
                                      categories = [],
                                      itemPerRow = 4,
                                      categoryCardType = "card3",
                                      sliderStyle = "style1",
                                    }) => {
  // const UNIQUE_CLASS = "glide_" + ncNanoId();

  const UNIQUE_CLASS = "glide_transfers";

  useEffect(() => {
    if (document.querySelector(`.${UNIQUE_CLASS}`)) {
      new Glide(`.${UNIQUE_CLASS}`, {
        perView: itemPerRow,
        gap: 32,
        bound: true,
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
      }).mount();
    }
  }, []);

  const renderCard = (item, index) => {
    switch (categoryCardType) {
      case "card3":
        return <CardCategory3 taxonomy={item} />;
      case "card4":
        return <CardCategory4 taxonomy={item} />;
      case "card5":
        return <CardCategory5 taxonomy={item} />;
      default:
        return <CardCategory3 taxonomy={item} />;
    }
  };

  return (
      <div className={`nc-SectionSliderNewCategories ${className}`}>
        <div className={`${UNIQUE_CLASS} flow-root`}>
          <Heading
              desc={subHeading}
              hasNextPrev={sliderStyle === "style1"}
              isCenter={sliderStyle === "style2"}
          >
            {heading}
          </Heading>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {categories.map((item, index) => (
                  <li key={index} className={`glide__slide ${itemClassName}`}>
                    {renderCard(item, index)}
                  </li>
              ))}
            </ul>
          </div>

          {sliderStyle === "style2" && (
              <NextPrev className="justify-center mt-16" />
          )}
        </div>
      </div>
  );
};

export default SectionSliderNewCategories;
