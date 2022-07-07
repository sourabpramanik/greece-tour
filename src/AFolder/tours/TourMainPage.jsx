import SectionSubscribe2 from "../components/SectionSubscribe2";
import React from "react";
import {graphql, useStaticQuery} from "gatsby";
import TourCardGrid from "./TourCardGrid";

const TourMainPage = (args, {className = ""}) => {

    const data = useStaticQuery(graphql`
    {
      allStrapiTours {
        nodes {
          address: tags
          title
          price
          href
          id
          galleryImgs {
            url
          }
          prices {
           Price
         }
        }
      }
    }
  `)

    return (
        <div
            className={`nc-ListingExperiencesPage relative overflow-hidden ${className}`}
            data-nc-id="ListingExperiencesPage"
        >
            <div className="container relative">

                <div
                    className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative pt-10 lg:pt-20 pb-16`}
                    data-nc-id="SectionHero"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center">
                    </div>
                    <TourCardGrid
                        homePage={false}
                        stayListings={data.allStrapiTours.nodes}
                        heading={"Please Find Bellow All Of Our Tours"} subHeading={"Select among a vast variety of tours"}
                    />
                    <SectionSubscribe2 className="py-24 lg:py-32"/>
                </div>
            </div>
        </div>
    );
};

export default TourMainPage;
