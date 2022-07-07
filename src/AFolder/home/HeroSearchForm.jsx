import React, {useState } from "react";
import "react-dates/initialize";
import ExperiencesSearchForm from "../../components/HeroSearchForm/ExperiencesSearchForm";
import {navigate} from "gatsby";
import TransferSearchForm from "../transfer/TransferSearchForm";

const HeroSearchForm = ({className, currentTab, currentPage}) => {
  const tabs = ["Transfers", "Tours"];
  const [tabActive, setTabActive] = useState(currentTab);

  const renderTab = () => {
    return (
      <ul className="ml-2 sm:ml-6 md:ml-12 flex space-x-5 sm:space-x-8 lg:space-x-11 overflow-x-auto hiddenScrollbar">
        {tabs.map((tab) => {
          const active = tab === tabActive;
          return (
            <li
              onClick={() => {
                if (tab === "Tours") {
                  navigate("/tours")
                } else
                setTabActive(tab)
              }}
              className={`flex-shrink-0 flex items-center cursor-pointer text-sm lg:text-base font-medium ${
                active
                  ? ""
                  : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400"
              } `}
              key={tab}
            >
              {active && (
                <span className="block w-2.5 h-2.5 rounded-full bg-neutral-800 dark:bg-neutral-100 mr-2" />
              )}
              <span>{tab}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderForm = () => {
    const isArchivePage = !!currentPage && !!currentTab;
    switch (tabActive) {
      case "Transfers":
        return <TransferSearchForm haveDefaultValue={null}/>;
      case "Tours":
        return <ExperiencesSearchForm haveDefaultValue={null} />;

      default:
        return null;
    }
  };

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl pb-5 lg:py-0 ${className}`}
      data-nc-id="HeroSearchForm"
    >
      {renderTab()}
      {renderForm()}
    </div>
  );
};

export default HeroSearchForm;
