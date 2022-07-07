import React, {useEffect, useState} from "react";
import GuestsInput from "../components/GuestsInput";
import StartRating from "components/StartRating/StartRating";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import LikeSaveBtns from "./LikeSaveBtns";
import ModalPhotos from "./ModalPhotos";
import BackgroundSection from "../components/BackgroundSection";
import SectionSubscribe2 from "../components/SectionSubscribe2";
import {DayPickerSingleDateController} from "react-dates";
import ExperiencesDateSingleInput from "../components/ExperiencesDateSingleInput";
import TourCardGrid from "./TourCardGrid";

const included = [
    {name: "Gas Fess"},
    {name: "Tax & Vat"},
    {name: "Pick-Up & Drop-Off From Hotels In Athens"},
    {name: "Photo Stop At Athenian Riviera"},
    {name: "Mineral Water, Wet & Dry Tissues"},
];

const notIncluded = [
    {name: "Entry/Admission Tickets On Sights/Museums"},
    {name: "Meals & Personal Expenses"},
    {name: "Gratuities (optional)"},
];

let defaultHeight
let defaultWidth

if (typeof window !== `undefined`) {
    defaultHeight = window.innerHeight
    defaultWidth = window.innerWidth
}

const useWindowSize = () => {
    const [dimensions, setDimensions] = useState({
        windowHeight: defaultHeight,
        windowWidth: defaultWidth,
    })

    useEffect(() => {
        const handler = () => setDimensions({
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
        })

        window.addEventListener(`resize`, handler)
        return () => window.removeEventListener(`resize`, handler)
    }, [])

    return dimensions
}

const TourDetailPage = ({pageContext}) => {

    const {tour, suggestedTours} = pageContext;
    const filteredSuggestedTours = suggestedTours.data.allStrapiTours.nodes.filter((item) => item.id !== tour.id);

    const [isOpen, setIsOpen] = useState(false);
    const [openFocusIndex, setOpenFocusIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState();
    const [guests, setGuests] = useState(1);

    const windowSize = useWindowSize();

    const getDaySize = () => {
        if (windowSize.width <= 375) {
            return 34;
        }
        if (windowSize.width <= 500) {
            return undefined;
        }
        if (windowSize.width <= 1280) {
            return 56;
        }
        return 48;
    };

    const handleOpenModal = (index) => {
        setIsOpen(true);
        setOpenFocusIndex(index);
    };

    const handleCloseModal = () => setIsOpen(false);

    //todo reviewStart and Count is not the same in Home Page And In Tour Details Page
    const renderSection1 = () => {
        return (
            <div className="listingSection__wrap !space-y-6">
                {/* 1 */}
                <div className="flex justify-between items-center">
                    <Badge color="red" name="Specific Tour"/>
                    <LikeSaveBtns/>
                </div>

                {/* 2 */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                    {tour.title}
                </h2>

                {/* 3 */}
                <div className="flex items-center space-x-4">
                    <StartRating point={tour.reviewStart} reviewCount={tour.reviewCount}/>
                    <span>·</span>
                    <span>
            <i className="las la-map-marker-alt"/>
            <span className="ml-1"> {tour.address}</span>
          </span>
                </div>

                {/* 4 HOSTED BY*/}
                {/*      <div className="flex items-center">*/}
                {/*          <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full"/>*/}
                {/*          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">*/}
                {/*  Hosted by{" "}*/}
                {/*              <span className="text-neutral-900 dark:text-neutral-200 font-medium">*/}
                {/*    Kevin Francis*/}
                {/*  </span>*/}
                {/*</span>*/}
                {/*      </div>*/}

                {/* 5 */}
                <div className="w-full border-b border-neutral-100 dark:border-neutral-700"/>

                {/* 6 */}
                <div
                    className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
                    <div
                        className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
                        <i className="las la-clock text-2xl"/>
                        <span className="">{tour.tourDuration} hours</span>
                    </div>
                    <div
                        className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
                        <i className="las la-user-friends text-2xl"></i>
                        <span className="">{tour.privateShared?.privateShared}</span>
                    </div>
                    <div
                        className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
                        <i className="las la-language text-2xl"></i>
                        <span className="">{tour.languages[0]?.OfferedLanguage}</span>
                    </div>
                </div>
            </div>
        );
    };

    const renderSection3 = () => {
        return (
            <div className="listingSection__wrap">
                <div>
                    <h2 className="text-2xl font-semibold">Include </h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                            Included in the price
                        </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"/>
                {/* 6 */}
                <div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
                    {included
                        .filter((_, i) => i < 12)
                        .map((item) => (
                            <div key={item.name} className="flex items-center space-x-3">
                                <i className="las la-check-circle text-2xl"/>
                                <span>{item.name}</span>
                            </div>
                        ))}
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"/>
                <div>
                    <h2 className="text-2xl font-semibold">Not Included</h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                            Not Included in the price
                        </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"/>
                {/* 6 */}
                <div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
                    {notIncluded
                        .filter((_, i) => i < 12)
                        .map((item) => (
                            <div key={item.name} className="flex items-center space-x-3">
                                <i className="las la-check-circle text-2xl"/>
                                <span>{item.name}</span>
                            </div>
                        ))}
                </div>
            </div>
        );
    };

    const renderSectionCheckIndate = () => {
        return (
            <div className="listingSection__wrap overflow-hidden">
                {/* HEADING */}
                <div>
                    <h2 className="text-2xl font-semibold">Availability</h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"/>
                {/* CONTENT */}

                <div className="listingSection__wrap__DayPickerRangeController flow-root">
                    <div className="-mx-4 sm:mx-auto xl:mx-[-22px]">
                        <DayPickerSingleDateController
                            date={selectedDate}
                            onDateChange={(date) => setSelectedDate(date)}
                            onFocusChange={() => {}}
                            focused
                            initialVisibleMonth={null}
                            numberOfMonths={windowSize.width < 1280 ? 1 : 2}
                            daySize={getDaySize()}
                            hideKeyboardShortcutsPanel
                        />
                    </div>
                </div>
            </div>
        );
    };

    const renderSection5 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold">Host Information</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"/>

                {/* host */}
                <div className="flex items-center space-x-4">
                    <Avatar
                        hasChecked
                        hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
                        sizeClass="h-14 w-14"
                        radius="rounded-full"
                    />
                    <div>
                        <a className="block text-xl font-medium" href="##">
                            Kevin Francis
                        </a>
                        <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                            <StartRating/>
                            <span className="mx-2">·</span>
                            <span> 12 places</span>
                        </div>
                    </div>
                </div>

                {/* desc */}
                <span className="block text-neutral-6000 dark:text-neutral-300">
          Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
          accommodation, an outdoor swimming pool, a bar, a shared lounge, a
          garden and barbecue facilities...
        </span>

                {/* info */}
                <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
                    <div className="flex items-center space-x-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span>Joined in March 2016</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            />
                        </svg>
                        <span>Response rate - 100%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <span>Fast response - within a few hours</span>
                    </div>
                </div>

                {/* == */}
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                <div>
                    <ButtonSecondary href="##">See host profile</ButtonSecondary>
                </div>
            </div>
        );
    };

    const tourDescription = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold">Tour Description</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"/>
                {tour.stopDescription.map((item) =>
                    tourStepsComponent(item.title, item.description))}
            </div>
        );
    };

    const tourStepsComponent = (title, description) => {
        return (
            <div>
                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold">{title}</h4>
                    <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            {description}
          </span>
                </div>
            </div>
        );
    }


    // Things To Know
    const renderSection8 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold">Things to know</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"/>


                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold">Drivers</h4>
                    <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                        All our drivers are professional with high experience and good knowledge of the sights & museums that you are going to visit,
                        they can provide you general information and suggest restaurants and activities during your stay in Greece.
                        </span>
                </div>

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold">How To Book With Us</h4>
                    <div className="prose sm:prose">
                        <ol className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
                            <li>Select the date and the number of guests and click the Book Now button.</li>
                            <li>Fill in the form with the required information (Name, pick-up location and time etc).</li>
                            <li>You have the option to select among a wide range of vehicles the one that fits your needs.</li>
                            <li>Choose the desired payment solution (card or cash to the driver) & complete the booking.</li>
                            <li>You will receive a confirmation e-mail from us with a reference number and the details of your booking & 24/7 contact detail.</li>
                        </ol>
                    </div>
                </div>


                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold">Drivers</h4>
                    <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                        All our drivers are professional with high experience and good knowledge of the sights & museums that you are going to visit,
                        they can provide you general information and suggest restaurants and activities during your stay in Greece.
                        </span>
                </div>

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold">Tour Guides</h4>
                    <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                        As Tour Guides are referred the licenced guides from the Greek Ministry of Tourism with a deep knowledge to our History, Mythology & Culture.
                        Is important for you to know that only Licensed Guides are allowed to escort you inside Sights & Museums and give you insights regarding anything you are interested in.
                        You can distinguish licensed guides from non by the card they wearing around their necks.
                    </span>
                </div>


                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold">Cancellation policy</h4>
                    <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Any tour can be canceled and fully refunded at least 24 hours prior the pick-up time.
          </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"/>

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold">Guest requirements</h4>
                    <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Up to 10 guests ages 4 and up can attend. Parents may also bring
            children under 2 years of age.
          </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"/>

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold">What to bring</h4>
                    <div className="prose sm:prose">
                        <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
                            <li>
                                Formal Wear To Visit Bai Dinh Pagoda Be ready before 7.30 Am.
                            </li>
                            <li>We will pick up from 07.30 to 08.00 AM</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    const renderPrice = () => {
        if (guests <= 4) {
            return tour.prices[0].Price;
        } else if (guests <= 8) {
            return tour.prices[1].Price;
        } else if (guests <= 18) {
            tour.prices[2].Price;
        }
        return null;
    }

    const renderSidebar = () => {
        return (
            <div className="listingSection__wrap shadow-xl">
                {/* PRICE */}
                <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            €{renderPrice()}
              <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              / All Included
            </span>
          </span>
                    <StartRating point={tour.reviewStart} reviewCount={tour.reviewCount}/>
                </div>
                {/* FORM */}
                <form
                    className="flex border divide-x divide-neutral-200 dark:divide-neutral-700 border-neutral-200 dark:border-neutral-700 rounded-3xl ">
                    <div className="flex-1">
                        <ExperiencesDateSingleInput
                            defaultValue={selectedDate}
                            onFocusChange={() => {
                            }}
                            onChange={(date) => setSelectedDate(date)}
                            anchorDirection={windowSize.width > 1400 ? "left" : "right"}
                            fieldClassName="p-4"
                        />
                    </div>
                    <div className="flex-1">
                        <GuestsInput
                            fieldClassName="p-5"
                            onChange={(data) => setGuests(data)}
                            defaultValue={guests}
                        />
                    </div>
                </form>

                {/* SUM */}
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span>Service charge</span>
                        <span>€{Math.round((renderPrice() / 1.13) * 100) / 100}</span>
                    </div>
                    <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span>Vat</span>
                        <span>€{Math.round((renderPrice() * 0.13) * 100) / 100}</span>
                    </div>
                    <div className="border-b border-neutral-200 dark:border-neutral-700"/>
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>€{renderPrice()}</span>
                    </div>
                </div>

                {/* SUBMIT */}
                {renderPrice() == null ?
                    <ButtonPrimary onClick={() => alert("Request a qyert")}>Request A Query</ButtonPrimary>
                    : <ButtonPrimary>Book Now</ButtonPrimary>}
            </div>
        );
    };

    const stepLocations = (location, time) => {
        return (
            <div className="flex flex-col space-y-2">
              <span className=" text-neutral-500 dark:text-neutral-400">
                {location}
              </span>
                <span className=" font-semibold">
                {time}
              </span>
            </div>
        );
    };

    const renderSidebarDetail = () => {
        return (
            <div className="listingSection__wrap shadow-xl">
        <span className="text-2xl font-semibold block">
          Suggested Route
            </span>
                <div className="mt-8 flex">
                    <div className="flex-shrink-0 flex flex-col items-center py-2">
                        <span className="block w-6 h-6 rounded-full border border-neutral-400"/>
                        <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"/>
                        <span className="block w-6 h-6 rounded-full border border-neutral-400"/>
                    </div>

                    <div className="ml-4 space-y-14 text-sm">
                        {tour.stopDescription.map((item) =>
                            stepLocations("Duration: " + item.duration + " Minutes", item.title))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div
            className={`nc-ListingExperiencesDetailPage  €{className}`}
            data-nc-id="TourTemplate"
        >
            {/* SINGLE HEADER */}
            <>
                <header className="container 2xl:px-14 rounded-md sm:rounded-xl">
                    <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
                        <div
                            className="col-span-3 row-span-3 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                            onClick={() => handleOpenModal(0)}
                        >
                            <NcImage
                                containerClassName="absolute inset-0"
                                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                                src={tour.imageList[0].url}
                                prevImageHorizontal
                            />
                            <div
                                className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"/>
                        </div>
                        {tour.imageList.filter((_, i) => i >= 1 && i < 4).map((item, index) => (
                            <div
                                key={index}
                                className={`relative rounded-md sm:rounded-xl overflow-hidden €{
                                    index >= 2 ? "block" : ""
                                }`}
                            >
                                <NcImage
                                    containerClassName="aspect-w-4 aspect-h-3"
                                    className="object-cover w-full h-full rounded-md sm:rounded-xl "
                                    src={item.url || ""}
                                    prevImageHorizontal
                                />

                                {/* OVERLAY */}
                                <div
                                    className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                                    onClick={() => handleOpenModal(index + 1)}
                                />
                            </div>
                        ))}

                        <div
                            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
                            onClick={() => handleOpenModal(0)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                />
                            </svg>
                            <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
                        </div>
                    </div>
                </header>
                {/* MODAL PHOTOS */}
                <ModalPhotos
                    imgs={tour.imageList}
                    isOpen={isOpen}
                    onClose={handleCloseModal}
                    initFocus={openFocusIndex}
                />
            </>

            {/* MAIn */}
            <main className="container mt-11 flex ">
                {/* CONTENT */}
                <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
                    {renderSection1()}
                    <div className="block lg:hidden">{renderSidebarDetail()}</div>
                    {tourDescription()}
                    {renderSection3()}
                    {renderSectionCheckIndate()}

                    {/*Host Information*/}
                    {/*{renderSection5()}*/}

                    {/*Reviews*/}
                    {/*{renderSection6()}*/}

                    {/*MAP*/}
                    {/*{renderSection7()}*/}

                    {renderSection8()}
                </div>

                {/* SIDEBAR */}
                <div className="hidden lg:block flex-grow">
                    {renderSidebarDetail()}
                    <div className="mt-10 sticky top-24">{renderSidebar()}</div>
                </div>
            </main>

            {/* STICKY FOOTER MOBILE */}
            <div
                className="block lg:hidden fixed bottom-0 inset-x-0 py-4 bg-white text-neutral-900 border-t border-neutral-200 z-20">
                <div className="container flex items-center justify-between">
          <span className="text-2xl font-semibold">
            €311
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                / All Included
            </span>
          </span>

                    <ButtonPrimary href="##">Book Now</ButtonPrimary>
                </div>
            </div>

            {/* OTHER SECTION */}
            <div className="container py-24 lg:py-32">
                {/* SECTION 1 */}
                <div className="relative py-16">
                    <BackgroundSection/>
                    <TourCardGrid
                        heading={"Suggester Tours"}
                        subHeading={"You Will Find Bellow Related Tours"}
                        stayListings={filteredSuggestedTours}
                        headingIsCenter={true}
                    />
                </div>

                {/* SECTION */}
                <SectionSubscribe2 className="pt-24 lg:pt-32"/>
            </div>
        </div>
    );
};

export default TourDetailPage;
