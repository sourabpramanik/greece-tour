import SectionHero from "./SectionHero";
import SectionSliderNewCategories from "../components/SectionSliderNewCategories";
import React from "react";
import SectionSubscribe2 from "../components/SectionSubscribe2";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "../components/BackgroundSection";
import BgGlassmorphism from "../components/BgGlassmorphism";
import SectionGridAuthorBox from "../components/SectionGridAuthorBox";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionVideos from "../../containers/PageHome/SectionVideos";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import TourCardGrid from "../tours/TourCardGrid";
import { graphql, useStaticQuery } from "gatsby";
import SectionCarouselFleet from "./SectionCarouselFleet";

const DEMO_CATS_2 = [
  {
    id: "1",
    href: "/listing-stay",
    name: "Enjoy the great cold",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "222",
    href: "/listing-stay",
    name: "Sleep in a floating way",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/listing-stay",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/listing-stay",
    name: "Cool in the deep forest",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "5",
    href: "/listing-stay",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

function PageHome() {
  const data = useStaticQuery(graphql`
    {
      transfers: allStrapiTransfers(filter: { showOnHomePage: { eq: true } }) {
        nodes {
          name: Title
          strapiId
          Price {
            Max_Persons
            Prefix
            Price
          }
          MainImage {
            url
          }
        }
      }
      allStrapiTours(filter: { showOnHomePage: { eq: true } }) {
        nodes {
          address: tags
          title
          price
          link: href
          id
          galleryImgs {
            url
          }
          prices {
            Price
          }
        }
      }
      allStrapiClients(filter: { showOnHomePage: { eq: true } }) {
        nodes {
          image {
            url
          }
          name: title
          strapiId
          description
        }
      }
      allStrapiCarouselFleets(sort: { fields: OrderInCarousel, order: ASC }) {
        nodes {
          title: VehicleCategoryName
          galleryImgs: Images {
            url
          }
          OrderInCarousel
          id: strapiId
        }
      }
    }
  `);

  data.allStrapiClients.nodes.forEach((item) => {
    item.thumbnail = item.image[0].url;
  });
  data.allStrapiCarouselFleets.nodes.forEach((vehicle) => {
    vehicle.href = vehicle.id;

    vehicle.listingCategory = {
      count: 2885,
      href: "stay/href",
      id: 17,
      name: "Entire cabin",
      taxonomy: "category",
      thumbnail: vehicle.galleryImgs[0],
    };
  });
  data.allStrapiTours.nodes.forEach((tour) => {
    tour.featuredImage = tour.galleryImgs[0];
    tour.href = `/tours/${tour.link}`;
  });

  data.transfers.nodes.forEach((transfer) => {
    transfer.thumbnail = transfer.MainImage.url;
    transfer.href = "/transfers/" + transfer.strapiId;
    transfer.listingType = "transfer";
    if (transfer.Price[0] != null) {
      transfer.count = transfer.Price[0].Price;
    }
  });

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-32 lg:mb-32">
        {/* SECTION HERO */}
        <SectionHero className="pt-5 md:pt-10 lg:pt-2 pb-16" />

        {/* TRANSFERS */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            categories={data.transfers.nodes}
            heading={"Popular Locations"}
            subHeading={"Choose among the most popular routes"}
          />
        </div>

        {/* TOURS */}
        <div className="relative py-16">
          <TourCardGrid
            heading={"Suggester Tours"}
            subHeading={"You Will Find Bellow Related Tours"}
            stayListings={data.allStrapiTours.nodes}
            headingIsCenter={true}
          />
        </div>

        {/* Fleet */}
        <div className="relative py-16" id="ourFleet">
          <BackgroundSection />
          <SectionCarouselFleet
            stayListings={data.allStrapiCarouselFleets.nodes}
            categoryCardType="card4"
            itemPerRow={4}
            heading="Our Fleet"
            subHeading="Find the right vehicle to feet your every need"
            sliderStyle="style2"
          />
        </div>

        {/* SECTION2 */}
        <SectionOurFeatures />

        {/* SECTION */}
        <SectionHowItWork />

        {/* SECTION 1 */}
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionSliderNewCategories
            categories={DEMO_CATS_2}
            categoryCardType="card4"
            itemPerRow={4}
            heading="Suggestions for discovery"
            subHeading="Popular places to stay that Chisfis recommends for you"
            sliderStyle="style2"
          />
        </div>

        {/* SECTION */}
        <SectionSubscribe2 />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div>

        {/* SECTION */}
        <SectionGridCategoryBox />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        {/* SECTION 1 */}
        <SectionSliderNewCategories
          heading="Explore by types of stays"
          subHeading="Explore houses based on 10 types of stays"
          categoryCardType="card5"
          itemPerRow={5}
        />

        {/* SECTION */}
        <SectionVideos />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div>
      </div>
    </div>
  );
}

export default PageHome;
