import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "rc-slider/assets/index.css";
// STYLE
import "../styles/index.scss";
import "../index.css";
import "../fonts/line-awesome-1.3.0/css/line-awesome.css";

import React from "react";
import { Page } from "../routers/types";
import Footer from "../shared/Footer/Footer";
import PageHome from "../AFolder/home/PageHome";
import ListingStayPage from "../containers/ListingStayPage/ListingStayPage";
import ListingStayMapPage from "../containers/ListingStayPage/ListingStayMapPage";
import ListingExperiencesPage from "../containers/ListingExperiencesPage/ListingExperiencesPage";
import ListingExperiencesMapPage from "../containers/ListingExperiencesPage/ListingExperiencesMapPage";
import ListingStayDetailPage from "../containers/ListingDetailPage/ListingStayDetailPage";
import ListingExperiencesDetailPage from "../containers/ListingDetailPage/ListingExperiencesDetailPage";
import ListingCarPage from "../containers/ListingCarPage/ListingCarPage";
import ListingCarMapPage from "../containers/ListingCarPage/ListingCarMapPage";
import ListingCarDetailPage from "../containers/ListingDetailPage/ListingCarDetailPage";
import CheckOutPage from "../containers/CheckOutPage/CheckOutPage";
import PayPage from "../containers/PayPage/PayPage";
import AuthorPage from "../containers/AuthorPage/AuthorPage";
import AccountPage from "../containers/AccountPage/AccountPage";
import AccountPass from "../containers/AccountPage/AccountPass";
import AccountSavelists from "../containers/AccountPage/AccountSavelists";
import AccountBilling from "../containers/AccountPage/AccountBilling";
import PageContact from "../containers/PageContact/PageContact";
import PageAbout from "../containers/PageAbout/PageAbout";
import PageSignUp from "../containers/PageSignUp/PageSignUp";
import PageLogin from "../containers/PageLogin/PageLogin";
import PageSubcription from "../containers/PageSubcription/PageSubcription";
import BlogPage from "../containers/BlogPage/BlogPage";
import BlogSingle from "../containers/BlogPage/BlogSingle";
import PageAddListing1 from "../containers/PageAddListing1/PageAddListing1";
import PageAddListing2 from "../containers/PageAddListing1/PageAddListing2";
import PageAddListing3 from "../containers/PageAddListing1/PageAddListing3";
import PageAddListing4 from "../containers/PageAddListing1/PageAddListing4";
import PageAddListing5 from "../containers/PageAddListing1/PageAddListing5";
import PageAddListing6 from "../containers/PageAddListing1/PageAddListing6";
import PageAddListing7 from "../containers/PageAddListing1/PageAddListing7";
import PageAddListing8 from "../containers/PageAddListing1/PageAddListing8";
import PageAddListing9 from "../containers/PageAddListing1/PageAddListing9";
import PageAddListing10 from "../containers/PageAddListing1/PageAddListing10";
import PageHome2 from "../containers/PageHome/PageHome2";
import ListingRealEstateMapPage from "../containers/ListingRealEstatePage/ListingRealEstateMapPage";
import ListingRealEstatePage from "../containers/ListingRealEstatePage/ListingRealEstatePage";
import SiteHeader from "../containers/SiteHeader";
import ListingFlightsPage from "../containers/ListingFlightsPage/ListingFlightsPage";
import TourMainPage from "../AFolder/tours/TourMainPage";
import TermsAndConditions from "../AFolder/home/TermsAndConditions";
import PrivacyPolicy from "../AFolder/home/PrivacyPolicy";
import Seo from "../seo";
import VehicleSelection from '../AFolder/BookingProcess/pages/vehicleSelection';
import CustomerDataForm from "../AFolder/BookingProcess/pages/CustomerDataForm";

//todo create a page just to load localStorage and redirect to common logic.
const pages = [
  {
    path: "/",
    exact: true,
    component: PageHome,
    seoTitle: "Private Tours & Transfers",
    seoDescription: "",
  },
  {
    path: "/#",
    exact: true,
    component: PageHome,
    seoTitle: "Private Tours & Transfers",
    seoDescription: "",
  },
  {
    path: "/tours",
    exact: true,
    component: TourMainPage,
    seoTitle: "Private Tours & Sightseeing",
    seoDescription: "",
  },
  {
    path: "/terms",
    exact: true,
    component: TermsAndConditions,
    seoTitle: "Terms And Conditions",
    seoDescription: "",
  },
  {
    path: "/privacy",
    exact: true,
    component: PrivacyPolicy,
    seoTitle: "Privacy Policy",
    seoDescription: "",
  },
  { path: "/vehicle-selection", component: VehicleSelection },
  { path: "/about", component: PageAbout },
  { path: "/customer-data-form", component: CustomerDataForm },

  { path: "/home-1-header-2", exact: true, component: PageHome },
  { path: "/home-2", component: PageHome2 },
  //
  { path: "/listing-stay", component: ListingStayPage },
  { path: "/listing-stay-map", component: ListingStayMapPage },
  { path: "/listing-stay-detail", component: ListingStayDetailPage },
  //
  {
    path: "/listing-experiences",
    component: ListingExperiencesPage,
  },
  {
    path: "/listing-experiences-map",
    component: ListingExperiencesMapPage,
  },
  {
    path: "/listing-experiences-detail",
    component: ListingExperiencesDetailPage,
  },
  //
  { path: "/listing-car", component: ListingCarPage },
  { path: "/listing-car-map", component: ListingCarMapPage },
  { path: "/listing-car-detail", component: ListingCarDetailPage },
  //
  { path: "/listing-real-estate-map", component: ListingRealEstateMapPage },
  { path: "/listing-real-estate", component: ListingRealEstatePage },
  //
  { path: "/listing-flights", component: ListingFlightsPage },
  //
  { path: "/checkout", component: CheckOutPage },
  { path: "/pay-done", component: PayPage },
  //
  { path: "/author", component: AuthorPage },
  { path: "/account", component: AccountPage },
  { path: "/account-password", component: AccountPass },
  { path: "/account-savelists", component: AccountSavelists },
  { path: "/account-billing", component: AccountBilling },
  //
  { path: "/blog", component: BlogPage },
  { path: "/blog-single", component: BlogSingle },
  //
  { path: "/add-listing-1", component: PageAddListing1 },
  { path: "/add-listing-2", component: PageAddListing2 },
  { path: "/add-listing-3", component: PageAddListing3 },
  { path: "/add-listing-4", component: PageAddListing4 },
  { path: "/add-listing-5", component: PageAddListing5 },
  { path: "/add-listing-6", component: PageAddListing6 },
  { path: "/add-listing-7", component: PageAddListing7 },
  { path: "/add-listing-8", component: PageAddListing8 },
  { path: "/add-listing-9", component: PageAddListing9 },
  { path: "/add-listing-10", component: PageAddListing10 },
  //
  { path: "/contact", component: PageContact },
  { path: "/signup", component: PageSignUp },
  { path: "/login", component: PageLogin },
  { path: "/subscription", component: PageSubcription },
  //
];


const Pages = ({ location }) => {
  
  if (
    location.pathname !== "/" &&
    location.pathname.charAt(location.pathname.length - 1) === "/"
  ) {
    location.pathname = location.pathname.slice(0, -1);
  }
  const Page = pages.filter(({ path }) => path === location.pathname)[0];

  return (
   
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 h-full">
      <Seo title={Page?.seoTitle} />
      <SiteHeader location={location.pathname} className="divide-y divide-neutral-200 dark:divide-neutral-700 md:divide-y-0" />
      <Page.component />
      
      {location.pathname !== "/customer-data-form" && location.pathname !== "/vehicle-selection" && location.pathname !== "/checkout" && 
        <Footer />
      }      
    </div>  
  );
};

export default Pages;
