import classnames from 'classnames';
import classNames from 'classnames';
import * as React from 'react';
import { useState } from 'react';
import { PlacesAutoComplete, DateTimePicker, UploadImage } from '..';
import settings from '../../../../pages/dashboard/settings';
import { EventProps, UserProps, UserSettingsProps } from '../../../@types/types';
import { validStartDate, validEndDate, timeConstraints } from '../../../lib';

interface SettingsProps {
  userProp: UserProps;
}
export const BasicInfo: React.FunctionComponent<SettingsProps> = ({userProp}) => {
    const { settings } = userProp;
    const [firstName, setFirstName] = useState<any>(settings.firstName || "");
    const [lastName, setLastName] = useState<any>(settings.lastName || "");
    const [phoneNumber, setPhoneNumber] = useState<any>(settings.phoneNumber || "");
    const [instagram, setInstagram] = useState<any>(settings.socials?.instagram || "");
    const [twitter, setTwitter] = useState<any>(settings.socials?.twitter || "");
    const [companyName, setCompanyName] = useState<any>(settings.companyName || "");
    const [emailAddress, setEmailAddress] = useState<any>(settings.emailAddress || "");
    const [website, setWebsite] = useState<any>(settings.website || "");
    const [address1, setAddress1] = useState<any>(settings.address1 || "");
    const [address2, setAddress2] = useState<any>(settings.address2 || "");
    const [city, setCity] = useState<any>(settings.city || "");
    const [zip, setZip] = useState<any>(settings.zip || "");
    const [state, setState] = useState<any>(settings.state || "");
    const [image, setImage] = useState<string>(settings.logo || "");
    const [loading, setLoading] = useState<boolean>(false);
    const [settingsErrors, setSettingsErrors] = useState<any>({});

    const checkForErrors = (item) => {
        return true;
    }

    const inputConfig = [
        {
            fields: [
                {
                    label: 'First Name',
                    name: 'firstName',
                    value: firstName,
                    set: setFirstName,
                    required: true,
                    error: false,
                    errorText: 'Please enter in a first name'
                },
                {
                    label: 'Last Name',
                    name: 'lastName',
                    value: lastName,
                    set: setLastName,
                    required: true,
                    error: false,
                    errorText: 'Please enter in a last name'
                }
            ]
            
        },
        {
            fields: [
                {
                    label: 'Address',
                    name: 'address1',
                    value: address1,
                    set: setAddress1,
                    required: false,
                    error: false,
                    errorText: 'Please enter in a valid address '
                },
                {
                    label: 'Address 2',
                    name: 'address2',
                    value: address2,
                    set: setAddress2,
                    required: false,
                    error: false,
                    errorText: 'Please enter in a valid address '
                }
            ]

        },
        {
            fields: [
                {
                    label: 'City',
                    name: 'city',
                    value: city,
                    set: setCity,
                    required: false,
                    error: false,
                    errorText: 'Please enter in a valid city '
                },
                {
                    label: 'State',
                    name: 'state',
                    value: state,
                    set: setState,
                    required: false,
                    error: false,
                    errorText: 'Please enter in a valid state '
                }
            ]

        },
        {
            fields: [
                {
                    label: 'ZIP',
                    name: 'zip',
                    value: zip,
                    set: setZip,
                    required: false,
                    error: false,
                    errorText: 'Please enter in a valid zip '
                },
                {
                    label: 'Email Address',
                    name: 'emailAddress',
                    value: emailAddress,
                    set: setEmailAddress,
                    required: true,
                    error: false,
                    errorText: 'Please enter in a valid email address '
                }
            ]

        },
        {
            fields: [
                {
                    label: 'Company Name',
                    name: 'companyName',
                    value: companyName,
                    set: setCompanyName,
                    required: false,
                    error: false,
                    errorText: 'Please enter in a valid zip '
                }
            ]

        },
        {
            fields: [
                {
                    label: 'Website',
                    name: 'website',
                    value: website,
                    set: setWebsite,
                    required: false,
                    error: false,
                    errorText: 'Please enter in a valid website'
                }
            ]

        },
        {
            fields: [
                {
                    label: 'Instagram',
                    name: 'instagram',
                    value: instagram,
                    set: setInstagram,
                    required: false,
                    error: false,
                    errorText: 'Please enter in a valid IG handle'
                },
                {
                    label: 'Twitter',
                    name: 'twitter',
                    value: twitter,
                    set: setTwitter,
                    required: false,
                    error: false,
                    errorText: 'Please enter in a valid Twitter handle'
                }
            ]

        }
    ]

    const handleSubmit = () =>{

    };

    return (

        <div className={'w-100 ph4 pt4  bg-white black'}>
            <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Danger
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>Something not ideal might be happening.</p>
                </div>
            </div>
            <div className="w-60-ns w-100 center">
                <div>
                    <h1 className="tl fw7 mb0 pb3">Basic Info</h1>
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
                                        {fieldTwo.label} {fieldTwo.required && <span className="red">*</span>}
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
                                    {settingsErrors[fieldOne.name] && (
                                    <small className="db tl red">{fieldOne.errorText}</small>
                                    )}
                                </>
                            )
                        }   
                    })}
                    <hr className="o-20 " />
                </div>
                <div className="mv4 pv2">
                    <h1 className="tl fw7 mb0 pb3">Event Image</h1>
                    <div className="mb5">
                        {image && <img src={image} className="db w-100" />}
                        <UploadImage setImage={setImage} />
                    </div>
                    <hr className="o-20 " />
                </div>
                <hr className="o-20" />
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