import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import React from "react";
import SiteHeader from "../../containers/SiteHeader";
import Footer from "../../shared/Footer/Footer";
import SEO from "../../seo"
import TourDetailPage from "../tours/TourDetailPage";
import TransferDetailPage from "../transfer/TransferDetailPage";

const TourTemplate = ({pageContext}) => {

    return (
        <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
            <SEO title={pageContext.transfer.name}/>
            <SiteHeader location={"/asd"} />
            <TransferDetailPage pageContext={pageContext}/>
            <Footer />
        </div>
    );
};

export default TourTemplate;