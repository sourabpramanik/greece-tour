import React, {useCallback, useState} from "react"
import {FC} from "react"
import axios from "axios"
import {useEffect} from "react"
import ClearDataButton from "./ClearDataButton"
import {useRef} from "react"
import {GiCommercialAirplane, GiBattleship} from "react-icons/gi"
import {debounce} from "lodash"
import {REACT_APP_REST_RESOURCE_BASE_END_POINT} from "../constants/apiEndpoints";

const searchPlaceholder2 = [
  {
    id: 1,
    title: "Athens Airport",
    subtitle: 'Athens International Airport "Eleftherios Venizelos", Greece ',
    icon: <GiCommercialAirplane size={25}/>,
  },
  {
    id: 13,
    title: "Athens City",
    subtitle: 'Athens International Airport "Eleftherios Venizelos", Greece ',
    icon: <GiCommercialAirplane size={25}/>,
  },

  {
    id: 2,
    title: "Piraeus Port",
    subtitle: "Piraeus Port (All ferries and Cruises)",
    icon: <GiBattleship size={25}/>,
  },
]

const LocationInput = ({
                         defaultValue,
                         autoFocus = false,
                         onChange,
                         onInputDone,
                         placeHolder = "Location",
                         desc = "Where are you going?",
                         className = "nc-flex-1.5",
                         onFocusChange,
                         searchPlaceholder = searchPlaceholder2
                       }) => {
  const containerRef = useRef < HTMLDivElement > (null)
  const inputRef = useRef < HTMLInputElement > (null)

  const [value, setValue] = useState(defaultValue)
  const [showPopover, setShowPopover] = useState(autoFocus)
  const [searching, setSearching] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    setShowPopover(autoFocus)
  }, [autoFocus])

  const handleDateFocusChange = (focused) => {
    setShowPopover(focused);
    onFocusChange && onFocusChange(focused);
  };

  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv)
    }
    showPopover && document.addEventListener("click", eventClickOutsideDiv)
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv)
    }
  }, [showPopover])

  useEffect(() => {
    onChange && onChange(value)
    // if (value !== "") {
    //   getData()
    // }
  }, [value])

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showPopover])

  const getData = useCallback(debounce((val) => {
    
    setSearching(true)
    setShowPopover(true)
    try {
      axios
          .get(
              `${REACT_APP_REST_RESOURCE_BASE_END_POINT}/prices/autocomplete/${val}`
          )
          .then(res => {
            setData(res.data)
            setSearching(false)
          })
          .catch(err => {
            setSearching(false)
            alert(err)
          })
    } catch (e) {
      console.log(e)
    }
  }, 600), [])

  const eventClickOutsideDiv = (event) => {
    onFocusChange(false);

    if (!containerRef.current) return
    // CLICK IN_SIDE
    if (!showPopover || containerRef.current.contains(event.target)) {
      return
    }

    // CLICK OUT_SIDE
    setShowPopover(false);
  }

  const handleSelectLocation = (item) => {
    setValue(item)
    onInputDone && onInputDone(item)
    setShowPopover(false)
  }

  const handleChange = e => {
    const val = e.currentTarget.value
    setValue(val)
    if (val !== "") {
      getData(val)
    }
  }

  const handlePopover=()=>{
    setShowPopover(true)
    document.getElementById("scroll-anc").scrollIntoView({ behavior: 'smooth', block: "center" })
  }

  const renderRecentSearches = () => {

    // if includes something is true
    //const asd = searchPlaceholder.some((item) => item.title.toLowerCase().includes(value));

    //todo when Search a location > select something > remove > Select preset data > click again show the searched data
    let searchedList = [];

    if (data.length !== 0) {
      data.forEach((item) => {
        var asd = {
          id: item.placeId,
          title: item.description,
          subtitle: '',
          icon: <GiCommercialAirplane size={25}/>,
        };

        searchedList = [...searchedList, asd];
      });

      const asd = searchPlaceholder.filter((item) => item.title.toLowerCase().includes(value));
      if (asd.length !== 0) {
        searchedList = [...asd, ...searchedList];
      }

    } else {
      searchedList = searchPlaceholder;
    }

    return (
        <>
          <div className="mt-2">
            {searchedList.map(item => (
                <span
                    onClick={() => handleSelectLocation(item)}
                    key={item.id}
                    className="flex my-4 md:my-0 px-4 sm:px-8 items-center space-x-2 sm:space-x-4  sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                >
              <div className="flex gap-2 items-center">
                <div>
                  <span className="block text-neutral-400">{item.icon}</span>
                </div>
                <div>
                  <div className=" block font-medium text-neutral-700 dark:text-neutral-200">
                    {item.title}
                  </div>
                  <div className=" text-sm text-gray-400">{item.subtitle}</div>
                </div>
              </div>
            </span>
            ))}
          </div>
        </>
    )
  }

  return (
      <div className={`relative flex ${className}`} ref={containerRef}>
        <div
            onClick={() => handlePopover()}
            id="scroll-anc"
            className={`flex flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${
                showPopover ? "shadow-2xl rounded-full dark:bg-neutral-800" : ""
            }`}
        >
          <div className="text-neutral-300 dark:text-neutral-400">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="nc-icon-field"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div className="flex-grow">
            <input
                className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
                placeholder={placeHolder}
                value={value == null ? "" : value.title}
                // autoFocus={showPopover}
                onChange={e => handleChange(e)}
                ref={inputRef}
            />
            <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
          </span>
            {value && showPopover && (
                <ClearDataButton onClick={() => setValue(null)}/>
            )}

            {searching && showPopover && (
                <span
                    className=" absolute w-5 h-5 lg:w-6 lg:h-6 text-sm bg-transparent rounded-full flex items-center justify-center right-1 lg:right-3 top-1/2 transform -translate-y-1/2">
              <svg
                  className="animate-spin h-8 w-8  absolute border-indigo-600 border-t-2 dark:border-t-[3px] rounded-full"
                  viewBox="0 0 24 24"/>
            </span>
            )}
          </div>
        </div>
        {showPopover && (
            <div
                className="absolute left-0 z-50 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-4 py-3 sm:py-2 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
              {renderRecentSearches()}
            </div>
        )}
      </div>
  )
}

export default LocationInput