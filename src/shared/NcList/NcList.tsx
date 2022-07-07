import React, { FC, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import twFocusClass from "utils/twFocusClass";
import Input from "shared/Input/Input";
import {AiOutlineCheck} from "react-icons/ai"
import {FiAlertCircle} from "react-icons/fi";
export interface NcListItem {
  id: string;
  name: string;
  icon: string;
}

export interface NcListProps {
  className?: string;
  panelMenusClass?: string;
  iconClass?: string;
  data: NcListItem[];
  renderTrigger?: () => ReactNode;
  renderItem?: (item: NcListItem) => ReactNode;
  title?: string;
  onClick: (item: NcListItem) => void;
  value?: string
}

const NcList: FC<NcListProps> = ({
  className = `h-8 w-8 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center ${twFocusClass()}`,
  iconClass = "h-[18px] w-[18px]",
  panelMenusClass = "origin-top-right",
  title = "More",
  renderTrigger,
  renderItem,
  data,
  onClick,
  value,
  setValue,
}) => {
  const [selectedCountry, setSelectedCountry] = useState();
  const [query, setQuery] = useState('')
  const filteredData = data.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
  return (
    <Listbox
      className="relative inline-block text-left"
      value={value}
      onChange={setValue}
      as="div"          
    >
      <Listbox.Button className={className} as="div">
        {value}
      </Listbox.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      > 
        <div className="absolute z-50 mt-2 shadow-xl dark:shadow-2xl w-max space-y-3 border-neutral-200 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 text-sm rounded-lg">
          <Input value={query} onChange={(e)=>setQuery(e.target.value)} className="my-3" placeholder="Search Country..."/>
          <Listbox.Options className="overflow-y-scroll scrollbar-thin scrollbar scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-900 scrollbar-track-gray-100 h-56 ">
            <div className="relative flex flex-col items-start px-4">
              {filteredData.map((item) => (
                /* Use the `active` state to conditionally style the active option. */
                /* Use the `selected` state to conditionally style the selected option. */
                <Listbox.Option key={item.id} value={item.dial_code}>
                  {({ active, selected }) => (
                    <li
                      className={`${
                        selected
                          ? "bg-primary-6000 text-white rounded-md"
                          : "bg-white dark:bg-neutral-900 text-black dark:text-white"
                      } px-4 mx-2 py-2 flex flex-row items-center justify-between cursor-pointer w-full`}
                    >                  
                      <span className="space-x-2">
                        {item.flag && <span>{item.flag}</span>} 
                        {item.dial_code && <span>{item.dial_code}</span>} 
                        {item.name && <span>{item.name}</span>}                     
                      </span> 
                      {selected && <AiOutlineCheck />}                    
                    </li>
                  )}
                </Listbox.Option>
              ))}
              {filteredData.length===0 && 
                <div className="w-full flex flex-col justify-center items-center h-full py-8 space-y-2 text-neutral-500 text-md">
                  <i>No results found</i>
                  <FiAlertCircle size={30}/>
                </div>
              }
            </div>
          </Listbox.Options>
        </div>        
      </Transition>
    </Listbox>
  );
};
export default NcList;
