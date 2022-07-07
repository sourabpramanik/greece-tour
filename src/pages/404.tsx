import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "rc-slider/assets/index.css";
// STYLE
import "../styles/index.scss";
import "../index.css";
import "../fonts/line-awesome-1.3.0/css/line-awesome.css";

import React, { FC } from "react";
import Page404 from '../containers/Page404/Page404';
import SiteHeader from "../containers/SiteHeader";
import Footer from "../shared/Footer/Footer";

export interface PagesProps {
    location: {
        pathname: string;
    }
}

const Page404NotFound: FC<PagesProps> = ({ location }) => {
    return (
        <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
            {/* <ScrollToTop /> */}
            <SiteHeader location={location.pathname} />
            <Page404 />
            <Footer />
        </div>
    );
};

export default Page404NotFound;