import Logo from "shared/Logo/Logo";
import SocialsList1 from "shared/SocialsList1/SocialsList1";
import {CustomLink} from "data/types";
import React from "react";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "1",
    title: "Tours In Athens",
    menus: [
      {href: "/tours/athens_by_night", label: "Athens By Night"},
      {href: "/tours/best_of_athens", label: "Best Of Athens In 2 Hours"},
      {href: "/tours/half_day/athens_city", label: "Half-Day Athens Sightseeing"},
      {href: "/tours/full_day/athens_city", label: "Full-Day Athens City Tour"},
      {href: "/tours/full_day/ athens_city_sounio", label: "Full-Day Athens City & Sounio"},
    ],
  },
  {
    id: "2",
    title: "Day Trips",
    menus: [
      {href: "/tours/full_day/meteora", label: "Meteora Day Trip"},
      {href: "/tours/full_day/delphi", label: "Delphi Day Trip"},
      {href: "/tours/full_day/argolida", label: "Argolida Day Trip"},
      {href: "/tours/full_day/olympia", label: "Olympia Day Trip"},
      {href: "/tours/full_day/mycenae_epidaurus_nafplio", label: "Mycenae, Epidaurus & Nafplio"},
    ],
  },
  {
    id: "5",
    title: "Popular Transfer",
    menus: [
      {href: "/transfers/athens_airport", label: "Athens Airport"},
      {href: "/transfers/piraeus_port", label: "Piraeus Port"},
      {href: "/transfers/athens_city", label: "Athens City"},
      {href: "/transfers/lavrio_port", label: "Lavrio Port"},
      {href: "/transfers/rafina_port", label: "Rafina Port"},
    ],
  },
  {
    id: "4",
    title: "Company",
    menus: [
      {href: "/about", label: "About Us"},
      {href: "/#ourFleet", label: "Our Fleet"},
      {href: "#", label: "Contact Us"},
      {href: "/privacy", label: "Privacy Policy"},
      {href: "/terms", label: "Terms & Conditions"},
    ],
  },
];


const Footer: React.FC = () => {

  const onClick = (label: string) => {
    if (label === 'Contact Us' ) {
      window.$crisp.push(['do', 'chat:open'])
    }
  }

  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
        <div key={index} className="text-sm ref-footer">
          <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
            {menu.title}
          </h2>
          <ul className="mt-5 space-y-4">
            {menu.menus.map((item, index) => (
                <li key={index}>
                  <a
                      onClick={() => onClick(item.label)}
                      key={index}
                      className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                      href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
            ))}
          </ul>
        </div>
    );
  };

  return (
      <div className="nc-Footer relative py-24 lg:py-32 border-t border-neutral-200 dark:border-neutral-700">
        <div
            className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo/>
            </div>
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1
                  className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start"/>
            </div>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
      </div>
  );
};

export default Footer;
