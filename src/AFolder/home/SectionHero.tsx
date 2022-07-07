import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import imagePng from "images/hero-right.png";
import HeroSearchForm from "AFolder/home/HeroSearchForm";

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
  return (
      <div className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`} data-nc-id="SectionHero">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
            <h2 className="font-medium text-3xl md:text-4xl xl:text-5xl !leading-[114%] ">
              Private Transfers & Tours
            </h2>
          <h2 className="font-medium text-2xl md:text-2xl xl:text-3xl !leading-[114%] ">
            Book Now With Us
          </h2>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            With Tour-Greece you will have a trip full of experiences,
            book with us now your private transfer or tour in Greece.
          </span>
        </div>
        <div className="flex-grow">
          <img className="w-full" src={imagePng} alt="hero" />
        </div>
      </div>

      <div className="z-10 mb-12 lg:mb-0 lg:-mt-40 w-full">
        <HeroSearchForm currentTab={"Transfers"} className={undefined} currentPage={undefined} />
      </div>
    </div>
  );
};

export default SectionHero;
