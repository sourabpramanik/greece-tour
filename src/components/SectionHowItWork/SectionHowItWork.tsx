import Heading from "components/Heading/Heading";
import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import HIW1img from "images/HIW1.png";
import HIW2img from "images/HIW2.png";
import HIW3img from "images/HIW3.png";
import VectorImg from "images/VectorHIW.svg";

export interface SectionHowItWorkProps {
  className?: string;
  data?: {
    id: number;
    title: string;
    desc: string;
    img: string;
    imgDark?: string;
  }[];
}

const DEMO_DATA: SectionHowItWorkProps["data"] = [
  {
    id: 1,
    img: HIW1img,
    title: "Transfers Or Tours",
    desc: "Choose the service you need and select pick-up location, date and number of guests",
  },
  {
    id: 2,
    img: HIW2img,
    title: "Select Your Desired Vehicle",
    desc: "From a plethora of vehicle categories choose the one that suits your needs better",
  },
  {
    id: 3,
    img: HIW3img,
    title: "Contact Details & Payment",
    desc: "Fill in your contact details and complete your payment, after that you will receive a confirmation email from us you are all set",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionHowItWork  ${className}`}
      data-nc-id="SectionHowItWork"
    >
      <Heading isCenter desc="Keep calm & travel on">
        How To Book With Us
      </Heading>
      <div className="mt-20 relative grid md:grid-cols-3 gap-20">
        <img
          className="hidden md:block absolute inset-x-0 top-10"
          src={VectorImg}
          alt=""
        />
        {data.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto"
          >
            {item.imgDark ? (
              <>
                <NcImage
                  containerClassName="dark:hidden block mb-8 max-w-[200px] mx-auto"
                  src={item.img}
                />
                <NcImage
                  containerClassName="hidden dark:block mb-8 max-w-[200px] mx-auto"
                  src={item.imgDark}
                />
              </>
            ) : (
              <NcImage
                containerClassName="mb-8 max-w-[200px] mx-auto"
                src={item.img}
              />
            )}
            <div className="text-center mt-auto">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
