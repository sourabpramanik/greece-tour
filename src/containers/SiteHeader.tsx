import React, { FC } from "react";
import Header2 from "components/Header/Header";
import Header from "shared/Header/Header";

export interface SiteHeaderProps {
  location: string
}

const SiteHeader: FC<SiteHeaderProps> = ({ location }) => {

  return location === "/home-1-header-2" ? (
    <Header2 />
  ) : (
    <Header />
  );
};

export default SiteHeader;
