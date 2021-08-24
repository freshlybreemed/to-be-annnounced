import * as React from 'react';
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.us';
import { formatPrice } from '../../lib';

interface EventCheckoutProps {
  setMode: any;
  total: number;
  firstName: any;
  setFirstName: any;
  lastName: any;
  setLastName: any;
  phoneNumber: any;
  setPhoneNumber: any;
  emailAddress: any;
  setEmailAddress: any;
  handleFreeCheckout: any;
  offerCode: any;
  setOfferCode: any;
}

export const UserCheckoutForm: React.FunctionComponent<EventCheckoutProps> = ({
  total,
  handleFreeCheckout,
  setMode,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phoneNumber,
  setPhoneNumber,
  emailAddress,
  setEmailAddress,
  offerCode,
  setOfferCode
}) => {
  const validateEmail = (mail: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      console.log('You have entered an valid email address!');
      return true;
    }
    console.log('You have entered an invalid email address!');
    return false;
  };

  return (
    <div className="pv3 w-100">
      <form className="w-100 pt4 mw7 center">
        <div className="dt w-100">
          <div className="mt1 dtc w-48 pb3 ">
            <small className=" db  pb1">First Name</small>

            <input
              value={firstName}
              className="bg-transparent ba-hover white pv2 pl2 mr3 w-90"
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
          </div>
          <div className="mt1 dtc w-48 pb3 ">
            <small className=" db  pb1">Last Name</small>

            <input
              value={lastName}
              className="bg-transparent white ba-hover pv2 pl2 mr3 w-90"
              onChange={(e) => setLastName(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="dt w-100 mb2 pb2">
          <div className="mv3 dtc w-48">
            <small className=" db pb1">Email Address</small>

            <input
              value={emailAddress}
              className="bg-transparent white ba-hover pa2 mr3 w-90"
              onChange={(e) => {
                setEmailAddress(e.currentTarget.value);
                validateEmail(e.currentTarget.value);
              }}
            />
          </div>
          <div className="mv3 dtc w-48">
            <small className=" db  pb1">Phone Number</small>

            <Cleave
              value={phoneNumber}
              style={{ boxSizing: 'initial' }}
              options={{ phone: true, phoneRegionCode: 'US' }}
              className="bg-transparent white ba-hover pa2 mr3 w-90"
              onChange={(e) => setPhoneNumber(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="dt w-100 mt2 pt2 flex">
          <div className="mv3 dtc w-48">
            <small className=" db pb1">Coupon Code</small>
            <input
              value={offerCode}
              className="bg-transparent white ba-hover pa2 mr3 w-90"
              onChange={(e) => {
                setOfferCode(e.currentTarget.value);
                // validateOffer(e.currentTarget.value);
              }}
            />
          </div>
          <div className="mv3 dtc">
            <span
              className="b--white hover-bg-white hover-black ba dib noselect br-100 b--solid pa2 ph3 f5-l f6-m f6 fw6-ns ml fw6 fl"
            >
              Apply
            </span>
          </div>
        </div>
        {
          <div className="dib w-100 ">
            <span className="fl pt2 f3-ns f4 db">
              Total: {formatPrice(total.toString())}
            </span>
            <span
              onClick={handleFreeCheckout}
              className="b--white hover-bg-white hover-black dib noselect br-100 b--solid ba pa2 ph3 f3-l f4-m f5 fw5-ns ml fw6 fr"
            >
              {total > 0 ? `Pay` : `Next`}
            </span>{' '}
            <span
              onClick={() => setMode(1)}
              className="b--white hover-bg-white hover-black dib noselect br-100 b--solid ba pa2 ph3 f3-l f4-m f5 fw5-ns mr2 fw6 fr"
            >
              Back
            </span>
          </div>
        }
      </form>
    </div>
  );
};
