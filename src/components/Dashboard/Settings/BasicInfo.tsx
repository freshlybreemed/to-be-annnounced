import axios from 'axios';
import classNames from 'classnames';
import Cleave from 'cleave.js/react';
import React, {useEffect, useState} from 'react';
import {  UploadImage } from '..';
import { UserProps } from '../../../@types/types';
import 'cleave.js/dist/addons/cleave-phone.us';
import { useRouter } from 'next/router'

interface SettingsProps {
  userProp: UserProps;
}
export const BasicInfo: React.FunctionComponent<SettingsProps> = ({userProp}) => {
    const { settings } = userProp;
    const router = useRouter()

    const [firstName, setFirstName] = useState<string>(settings.firstName || "");
    const [lastName, setLastName] = useState<string>(settings.lastName || "");
    const [phoneNumber, setPhoneNumber] = useState<string>(settings.phoneNumber || "");
    const [instagram, setInstagram] = useState<string>(settings.socials.instagram || "");
    const [logo, setLogo] = useState<string>(settings.logo || "");
    const [facebook, setFacebook] = useState<string>(settings.socials.facebook || "");
    const [twitter, setTwitter] = useState<string>(settings.socials.twitter || "");
    const [companyName, setCompanyName] = useState<string>(settings.companyName || "");
    const [emailAddress, setEmailAddress] = useState<string>(settings.emailAddress || "");
    const [website, setWebsite] = useState<string>(settings.socials.website || "");
    const [address1, setAddress1] = useState<string>(settings.address1 || "");
    const [address2, setAddress2] = useState<string>(settings.address2 || "");
    const [city, setCity] = useState<string>(settings.city || "");
    const [zip, setZip] = useState<string>(settings.zip || "");
    const [state, setState] = useState<string>(settings.state || "");
    const [loading, setLoading] = useState<boolean>(false);
    const [settingsErrors, setSettingsErrors] = useState<any>({});

    const checkForErrors = (item) => {
        return true;
    }

    const socialsConfig = [
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
                },
                {
                    label: 'Facebook Handle',
                    name: 'facebook',
                    value: facebook,
                    set: setFacebook,
                    required: false,
                    placeholder: '@',
                    error: false,
                    errorText: 'Please enter in a valid website'
                }
            ]

        },
        {
            fields: [
                {
                    label: 'IG Handle',
                    name: 'instagram',
                    value: instagram,
                    set: setInstagram,
                    required: false,
                    placeholder: '@',
                    error: false,
                    errorText: 'Please enter in a valid IG handle'
                },
                {
                    label: 'Twitter Handle',
                    name: 'twitter',
                    value: twitter,
                    set: setTwitter,
                    required: false,
                    error: false,
                    placeholder: '@',
                    errorText: 'Please enter in a valid Twitter handle'
                }
            ]

        }
    ]
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
                    label: 'Phone Number',
                    name: 'phoneNumber',
                    value: phoneNumber,
                    set: setPhoneNumber,
                    required: true,
                    error: false,
                    errorText: 'Please enter in a valid phoneNumber'
                },
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
    ]

    const handleSubmit = async () =>{
        setLoading(true);
        const user: UserProps = {
            ...userProp,
            settings:{
                ...userProp.settings,
                companyName,
                firstName,
                lastName,
                city,
                zip,
                logo,
                phoneNumber,
                emailAddress,
                state,
                address1,
                address2,
                socials: {
                    instagram,
                    twitter,
                    facebook,
                    website
                }
            }
        }
        await axios
        .post('/api/user', {
            data: user
        }).then(()=>{
            router.reload();
        })

    };

    return (
        <div className={'w-100 ph4 pt4  bg-white black'}>
            <div className="w-70-ns w-100 center">
                <h1 className="tl fw7 mb0 pb3">Profile Photo</h1>
                    <div className="mv4 pv2">
                        <div className="">
                            {logo && <img src={logo} className="db w-50-l w-80 m-auto" />}
                            <UploadImage setImage={setLogo} />
                                {/* <div className="py-20 h-screen bg-white px-2"> */}
                                    {/* <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                                        <div className="md:flex">
                                            <div className="w-full p-3">
                                                <div className="relative border-dotted h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
                                                    <div className="absolute">
                                                        <div className="flex flex-col items-center"> <i className="fa fa-folder-open fa-4x text-blue-700"></i> <span className="block text-gray-400 font-normal">Add a Profile Image</span> </div>
                                                    </div> <input type="file" className="h-full w-full opacity-0" name=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                
                        </div>
                        
                        <hr className="o-20 " />
                    </div>
                <div className="mb4 pv2">
                    <h1 className="tl fw7 mb0 pb3">Personal Information</h1>
                    {inputConfig.map(fieldGroup=>{
                        const fieldOne = fieldGroup.fields[0]
                        if(fieldGroup.fields.length === 2) {
                            const fieldTwo = fieldGroup.fields[1]
                            return (
                            <div key={fieldOne.name} className="md:my-3 w-100">
                                <div className="dib md:w-2/4 w-full md:mb-0 mb-2 md:pr-2">
                                    <div className="tl ba-hover overflow-visible">
                                    <small className="db pl2 pt2 pb1 mid-gray ">
                                    {fieldOne.label} {fieldOne.required && <span className="red">*</span>}
                                    </small>
                                    {fieldOne.name==="phoneNumber"?
                                    
                                    <Cleave
                                        options={{ phone: true, phoneRegionCode: 'US' }}

                                        value={fieldOne.value}
                                        onChange={(event) => {
                                        fieldOne.set(event.currentTarget.value);
                                        checkForErrors({name:event.currentTarget.value})
                                        }}
                                        className="pl2 pb2  input-reset  bn w-90"
                                    />:
                                    <input
                                        value={fieldOne.value}
                                        onChange={(event) => {
                                        fieldOne.set(event.currentTarget.value);
                                        checkForErrors({name:event.currentTarget.value})
                                        }}
                                        className="pl2 pb2  input-reset  bn w-90"
                                    />}
                                    </div>
                                </div>
                                <div className="dib  md:w-2/4 w-full md:mb-0 mb-2 ">
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
                                    key={fieldOne.name} 
                                    className={`mb-2 tl ${classNames({
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
                <div className="mb4 pv2">
                    <h1 className="tl fw7 mb0 pb3">Socials</h1>
                    {socialsConfig.map(fieldGroup=>{
                        const { placeholder,name,set,value,label, required, errorText } = fieldGroup.fields[0]
                        if(fieldGroup.fields.length === 2) {
                            const fieldTwo = fieldGroup.fields[1]
                            return (
                            <div key={name}  className="md:my-3 w-100">
                                <div className="dib md:w-2/4 w-full md:mb-0 mb-2 md:pr-2">
                                    <div className="tl ba-hover overflow-visible">
                                    <small className="db pl2 pt2 pb1 mid-gray ">
                                    {label} {required && <span className="red">*</span>}
                                    </small>
                                    <div className="pl2 pb2  input-reset  bn w-90">
                                        {placeholder && <span>{placeholder}</span>}
                                        <input
                                            value={value}
                                            onChange={(event) => {
                                            set(event.currentTarget.value);
                                            checkForErrors({name:event.currentTarget.value})
                                            }}
                                        />
                                        </div>
                                    </div>
                                </div>
                                <div className="dib  md:w-2/4 w-full md:mb-0 mb-2 ">
                                    <div className="tl ba-hover overflow-visible">
                                        <small className="db pl2 pt2 pb1 mid-gray ">
                                        {fieldTwo.label} {fieldTwo.required && <span className="red">*</span>}
                                        </small>
                                        <div className="pl2 pb2  input-reset  bn w-90">
                                                                                                                {fieldTwo.placeholder && <span>{fieldTwo.placeholder}</span>}
                                            <input
                                                value={fieldTwo.value}
                                                onChange={(event) => {
                                                    fieldTwo.set(event.currentTarget.value);
                                                    checkForErrors({name:event.currentTarget.value})
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        )} else {
                            return (
                                <>
                                    <div
                                    key={name} 
                                    className={`mb-2 tl ${classNames({
                                    'ba-hover': !settingsErrors.name,
                                    'ba-hover-error': settingsErrors.name,
                                    })}`}
                                    >
                                        <small className="db pl2 pt2 pb1 mid-gray ">
                                            {label} {required && <span className="red">*</span>}
                                        </small>
                                        <input
                                            value={value}
                                            onChange={(event) => {
                                            set(event.currentTarget.value);
                                            checkForErrors({name:event.currentTarget.value})
                                            }}
                                            className="pl2 pb2  input-reset  bn w-90"
                                        />
                                    </div>
                                    {settingsErrors[name] && (
                                    <small className="db tl red">{errorText}</small>
                                    )}
                                </>
                            )
                        }   
                    })}
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