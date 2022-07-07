import React, { useEffect, useState, Fragment} from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Dialog, Transition } from '@headlessui/react';
import ButtonClose from "shared/ButtonClose/ButtonClose";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import {MdKeyboardArrowRight} from "react-icons/md"
import Glide from "@glidejs/glide";
import NextPrev from "shared/NextPrev/NextPrev";
import {ImUserTie} from 'react-icons/im'
import {MdFlight} from 'react-icons/md'
import {RiSuitcase3Line} from 'react-icons/ri';
import {BsCalendarX} from 'react-icons/bs';
import { DEMO_CAR_LISTINGS } from "../../data/listings";


const InfoLink = ({contentExtraClass = "w-43", data}) => {
  const [open, setOpen] = useState(false)
  const DEMO_DATA = DEMO_CAR_LISTINGS[0];

  const carsImgs = [
    {
      title: "Suit & tie driver",
      subtitle: "Suited driver for one of a kind VIP experience.",
      icon: <ImUserTie size={50}/>
    },  
    {
      title: "Flight delay",
      subtitle: "There is no extra charges if your flight is delayed.",
      icon: <MdFlight size={50}/>
    },
    {
      title: "Luggage",
      subtitle: "1 suitcase + 1 hand luggage per person is included.",
      icon: <RiSuitcase3Line size={50}/>
    },
    {
      title: "Cancellation",
      subtitle: "You can cancel upto 24 hours in advance without any charges.",
      icon: <BsCalendarX size={50}/>
    },
  ];

  const UNIQUE_CLASS = "glide_Info";

  useEffect(() => {
    if(document.querySelector(`.${UNIQUE_CLASS}`)){
      new Glide(`.${UNIQUE_CLASS}`, {
        perView: 2,  
        gap: 32,
        bound: false,
        rewind: false,
        animationDuration: 1000,
        dragThreshold: true,
        peek: { before: 0, after: 50 },
        perTouch: 2,
        keyboard: false,
      }).mount();
    }
  }, [UNIQUE_CLASS, carsImgs]);



  const handleOpenModal = () => {
    setOpen(prev => !prev );
  }

  const detailModal = () => {
    return(
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" onClose={() => handleOpenModal()} className=" fixed inset-0 z-50">
          <div className="min-h-screen px-1 text-center md:mx-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-10 dark:bg-opacity-40" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className={`${contentExtraClass} w-full md:w-5/12 inline-block my-2 overflow-hidden text-left align-middle transition-all transform bg-white border border-black border-opacity-5 shadow-xl rounded-2xl sm:my-8 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-900 dark:text-neutral-300 `}>
                <div className=" px-6 mx-3 flex flex-col items-start relative">
                  <Dialog.Title className="flex flex-row justify-between items-center w-full border-neutral-600 border-b space-y-2">
                    <h2 className="text-md font-semibold">About this category</h2>
                    <ButtonClose onClick={() => handleOpenModal()}>Close</ButtonClose>
                  </Dialog.Title>                  
                  <Dialog.Description className="">
                    <div className="flex flex-col">
                      {/* Top area */}
                      <div className={"grid grid-cols-2 py-2 overflow-hidden space-x-4 items-center"}>
                        <div className="space-y-1 flex flex-col items-start">
                          <h4 className="pb-3 font-semibold text-md"> Premium Sedan</h4>
                          <p className="pb-1 font-light text-sm text-neutral-500 dark:text-neutral-400">Premium sedan is an experience on its own. A perfect choice for small groups who like to travel in style</p>
                          <i className="text-xs text-neutral-500 dark:text-neutral-400 font-light">Mercedes Benz E-class, BMW 5 Series or similar</i>
                        </div>
                        <div className="justify-self-end">
                          {/*<img src={data?.Image.url} className="object-contain h-48 w-68" />*/}
                          <img src={DEMO_DATA} className="object-contain h-48 w-68" />
                        </div>
                      </div>
                      {/* Bottom area */}
                      <div className="space-y-4 w-96">
                        <h4 className="pb-3 font-semibold text-md">What is included?</h4>
                        <div className={`${UNIQUE_CLASS} flow-root flex-row items-center justify-center w-full relative`}>
                          <div className="glide__track" data-glide-el="track">
                            <ul className="glide__slides">
                              {carsImgs.map((item, index) => (
                                <li key={index} className="glide__slide">
                                  <div className="h-48 w-36 mx-2 space-y-4 mb-4 rounded-2xl px-3 shadow-xl dark:shadow-2xl">
                                    <div>{item.icon}</div>                                  
                                    <p className="text-md font-light">{item.title}</p>
                                    <p className="text-xs text-neutral-500 font-light">{item.subtitle}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="absolute opacity-1 group-hover:opacity-100 transition-opacity flex top-1/2 transform -translate-y-1/2 inset-x-0 justify-between">
                            <NextPrev className="w-full justify-between" btnClassName="w-8 h-8" />
                          </div>                                                      
                        </div>
                      </div>
                    </div>
                  </Dialog.Description>
                  
                  <div className="flex flex-row items-center space-x-3">
                    <ButtonSecondary onClick={() => handleOpenModal()}>Cancel</ButtonSecondary>                    

                    <ButtonPrimary onClick={() => handleOpenModal()}>
                      <span>Choose this vehicle</span>
                      <MdKeyboardArrowRight size={18}/>
                    </ButtonPrimary>
                  </div>
                </div>                
              </div>
            </Transition.Child>
          </div>            
        </Dialog>
      </Transition>      
    )
  }

  return (
    <>    
      <div className="flex items-center text-primary-6000 font-normal text-sm cursor-pointer" onClick={()=>handleOpenModal()}>
        <span className="pr-2">Learn More</span>
        <HiInformationCircle size={20} />            
      </div> 
      <div className="flex justify-start">
        {detailModal()}             
      </div>
    </>
  );
};
export default InfoLink;
