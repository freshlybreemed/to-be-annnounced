import classnames from 'classnames';
import classNames from 'classnames';
import * as React from 'react';
import { useState } from 'react';
import { UploadFlyer } from '..';
import { UserSettingsProps } from '../../../@types/types';

interface SettingsProps {
  userProp: UserSettingsProps;
}
export const Billing: React.FunctionComponent<SettingsProps> = ({userProp}) => {
    const [accountNumber, setAccountNumber] = useState<any>(userProp.billing.accountNumber || "");
    const [lastName, setLastName] = useState<any>(userProp.lastName || "");
    const [accountType, setAccountType] = useState<any>(userProp.billing.accountType || "");
    const [routingNumber, setRoutingNumber] = useState<any>(userProp.billing.routingNumber || "");
    const [bankName, setBankName] = useState<any>(userProp.billing.bankName || "");
    const [instagram, setInstagram] = useState<any>(userProp.socials?.instagram || "");
    const [twitter, setTwitter] = useState<any>(userProp.socials?.twitter || "");
    const [companyName, setCompanyName] = useState<any>(userProp.companyName || "");
    const [emailAddress, setEmailAddress] = useState<any>(userProp.emailAddress || "");
    const [website, setWebsite] = useState<any>(userProp.website || "");
    const [address1, setAddress1] = useState<any>(userProp.address1 || "");
    const [address2, setAddress2] = useState<any>(userProp.address2 || "");
    const [city, setCity] = useState<any>(userProp.city || "");
    const [zip, setZip] = useState<any>(userProp.zip || "");
    const [state, setState] = useState<any>(userProp.state || "");
    const [userLocation, setUserLocation] = useState<any>('user');
    const [image, setImage] = useState<string>('user');
    const [loading, setLoading] = useState<boolean>(false);
    const [settingsErrors, setSettingsErrors] = useState<any>({});

    const checkForErrors = (item) => {
        return true;
    }

    const inputConfig = [
        {
            fields: [
                {
                    label: 'Bank Name',
                    name: 'bankName',
                    value: bankName,
                    set: setBankName,
                    required: true,
                    error: false,
                    errorText: 'Please enter in a first name'
                }
            ]
        },
        {
            fields: [
                {
                    label: 'Account Number',
                    name: 'accountNumber',
                    value: accountNumber,
                    set: setAccountNumber,
                    required: true,
                    error: false,
                    errorText: 'Please enter in a last name'
                },
                {
                    label: 'Routing Number',
                    name: 'routingNumber',
                    value: routingNumber,
                    set: setRoutingNumber,
                    required: true,
                    error: false,
                    errorText: 'Please enter in a last name'
                },
            ]
        },
     ];

    const handleSubmit = () => {

    }
    return (

        <div className={'w-100 ph4 pt4 bg-white black'}>
            <div className="w-60-ns w-100 center">
                <div>
                    <h1 className="tl fw7 mb0 pb3">Billing</h1>
                    <p className="tl mt0 pt1 f6">
                    Name your event and tell event-goers why they should come. Add
                    details that highlight what makes it unique.
                    </p>
                    <div
                        className={`mt3 mb2 tl`}
                    >
                        <small className="db pl2 pt2 pb1 mid-gray ">
                        Account Type <span className="red">*</span>
                        </small>
                        <input
                            type="radio" id="dewey" name="drone" value="dewey"
                            className="pl2 pb2  input-reset  bn w-90"
                        />
                        <label for="contactChoice1">Checking</label>
                        <input
                            type="radio" id="dewey" name="drone" value="dewey"
                            className="pl2 pb2  input-reset  bn w-90"
                        />
                        <label for="contactChoice1">Savings</label>

                    </div>
                    {inputConfig.map(fieldGroup=>{
                        const fieldOne = fieldGroup.fields[0]
                        if(fieldGroup.fields.length === 2) {
                            const fieldTwo = fieldGroup.fields[1]
                            return (
                            <div className="mv3 w-100">
                                <div className="dib w-50 pr2">
                                    <div className="tl ba-hover overflow-visible">
                                    <small className="db pl2 pt2 pb1 mid-gray ">
                                    {fieldOne.label} {fieldOne.required && <span className="red">*</span>}
                                    </small>
                                    <input
                                        value={fieldOne.value}
                                        onChange={(event) => {
                                        fieldOne.set(event.currentTarget.value);
                                        checkForErrors({name:event.currentTarget.value})
                                        }}
                                        className="pl2 pb2  input-reset  bn w-90"
                                    />
                                    </div>
                                </div>
                                <div className="dib  w-50 ">
                                    <div className="tl ba-hover overflow-visible">
                                        <small className="db pl2 pt2 pb1 mid-gray ">
                                        {fieldTwo.label} <span className="red">*</span>
                                        </small>
                                        <input
                                            value={fieldTwo.value}
                                            onChange={(event) => {
                                                fieldTwo.set(event.currentTarget.value);
                                                checkForErrors({name:event.currentTarget.value})
                                            }}
                                            className="pl2 pb2  input-reset  bn w-90"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                        )} else {
                            return (
                                <>
                                    <div
                                    className={`mt3 mb2 tl ${classNames({
                                    'ba-hover': !settingsErrors.name,
                                    'ba-hover-error': settingsErrors.name,
                                })}`}
                                >
                                    <small className="db pl2 pt2 pb1 mid-gray ">
                                    {fieldOne.label} <span className="red">*</span>
                                    </small>
                                    <input
                                        value={fieldOne.value}
                                        onChange={(event) => {
                                        fieldOne.set(event.currentTarget.value);
                                        checkForErrors({name:event.currentTarget.value})
                                        }}
                                        className="pl2 pb2  input-reset  bn w-90"
                                    />
                                </div>
                                {settingsErrors[fieldOne.name] && (
                                <small className="db tl red">{fieldOne.errorText}</small>
                                )}
                            </>
                            )
                        }   
                    })}

                    <hr className="o-20 " />
                </div>
            </div>
            <div
            className="mv4 b--black ba bw1 dib noselect br-100 b--solid pa2 ph4 f3 fw5"
              onClick={() => handleSubmit()}
            >
            {loading && <i className="fa fa-spinner fa-spin mr2" />}
            {loading ? 'Saving...'
                : 'Save'}
            </div>
        </div>
    );
}