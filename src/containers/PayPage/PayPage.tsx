import StartRating from "components/StartRating/StartRating";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import React, {useState, FC, useEffect} from 'react';
import {useStripe} from '@stripe/react-stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PayStatus from './PayStatus'


const stripePromise = loadStripe("pk_test_okk0TZerRWR9ZCyiLFGJ1OYK002vAhrkeS");

export interface PayPageProps {
  className?: string;
}

const PayPage: FC<PayPageProps> = ({ className = "" }) => {  

  return (
    
      <div className={`nc-PayPage ${className}`} data-nc-id="PayPage">
        <main className="container mt-11 mb-24 lg:mb-32 ">
          <div className="max-w-4xl mx-auto">
            <Elements stripe={stripePromise}>
              <PayStatus/>
            </Elements>  
          </div>              
        </main>
      </div>
  );
};

export default PayPage;
