import Axios from 'axios';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { UserProps } from '../../../@types/types';

interface SettingsProps {
  userProp: UserProps;
}
export const Billing: React.FunctionComponent<SettingsProps> = ({userProp}) => {
    const { settings } = userProp;
    const router = useRouter()

    const { billing } = settings;
    const [accountNumber, setAccountNumber] = useState<string>(billing.accountNumber || "");
    const [accountType, setAccountType] = useState<string>(billing.accountType || "");
    const [routingNumber, setRoutingNumber] = useState<string>(billing.routingNumber || "");
    const [bankName, setBankName] = useState<string>(billing.bankName || "");
    const [companyName, setCompanyName] = useState<string>(settings.companyName || "");
    const [loading, setLoading] = useState<boolean>(false);
    const [focus, setFocus] = useState<string>('');
    const [settingsErrors, setSettingsErrors] = useState<any>({});

    const checkForErrors = (item) => {
        let hasErrors = false;
        const key = Object.keys(item)[0];
        // switch(key){
        //     case "routingNumber": 
        //     const routing = valid.routingNumber(routingNumber);
        //     setSettingsErrors({
        //         ...settingsErrors,
        //         routingNumber: !routing.isValid
        //       });
        // }
        return hasErrors;
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
                    label: 'Tax ID/EIN',
                    name: 'companyName',
                    value: companyName,
                    set: setCompanyName,
                    required: false,
                    error: false,
                    errorText: 'Please enter in a last name'
                },
            ]
        },
     ];

    const handleSubmit = async() => {
        setLoading(true)
        const user:UserProps = {
            ...userProp,
            settings: {
                ...settings,
                billing:{
                    ...billing,
                    accountType,
                    accountNumber,
                    routingNumber,
                    companyName,
                    bankName,
                }
            }
        }
        await Axios.post('/api/user', { data: user
        })
        .then((res)=>{
            console.log(res.data)
            router.reload();

        })
        .catch((err)=>{
        console.log(err)
            router.reload();
        })
    }
    return (

        <div className={'w-100 ph4 pt4 bg-white black'}>
            <div className="w-70-ns w-100 center">
                <div>
                    <h1 className="tl fw7 mb0 pb3">Billing</h1>
                    <p className="tl mt0 pt1 f6">
                    Add you billing information and how you would like to receive payouts
                    </p>
                    <div
                        className={`mt3 mb2 tl`}
                    >
                        <small className="db pl2 pt2 pb1 mid-gray ">
                        Account Type <span className="red">*</span>
                        </small>
                        <input
                            onChange={(e)=>setAccountType(e.target.value)}
                            type="radio" id="dewey" name="drone" value={'checking'}
                            checked={accountType === 'checking'}
                            className="pl2 pb2  input-reset  bn w-90"
                        />
                        <label for="contactChoice1">Checking</label>
                        <input
                            onChange={(e)=>setAccountType(e.target.value)}
                            type="radio" id="dewey" 
                            checked={accountType === 'savings'}
                            name="drone" value={'savings'}
                            className="pl2 pb2  input-reset  bn w-90"
                        />
                        <label for="contactChoice1">Savings</label>

                    </div>
                    <div className="md:my-3 w-100">
                        <div className="dib md:w-2/4 w-full md:mb-0 mb-2 md:pr-2">
                            <div className="tl ba-hover overflow-visible">
                                <small className="db pl2 pt2 pb1 mid-gray ">
                                {'Account Number'} {<span className="red">*</span>}
                                </small>
                                <input
                                    onFocus={()=>setFocus('accountNumber')}
                                    value={focus === 'accountNumber' ? accountNumber: accountNumber.replace(/\d(?=\d{4})/g, "*")}
                                    placeholder={"1203480123123".replace(/\d(?=\d{4})/g, "*")}
                                    onChange={(event) => {
                                    setAccountNumber(event.currentTarget.value);
                                    checkForErrors({name:event.currentTarget.value})
                                    }}
                                    className="pl2 pb2  input-reset  bn w-90"
                                />
                            </div>
                        </div>
                        <div className="dib  md:w-2/4 w-full md:mb-0 mb-2 ">
                            <div className={`tl ${classnames({ 'ba-hover': !settingsErrors["routingNumber"],
                'ba-hover-error': settingsErrors["routingNumber"]})} overflow-visible`}>
                                <small className="db pl2 pt2 pb1 mid-gray ">
                                Routing Number <span className="red">*</span>
                                </small>
                                <input
                                    onFocus={()=>setFocus('routingNumber')}
                                    value={focus === 'routingNumber' ? routingNumber: routingNumber.replace(/\d(?=\d{4})/g, "*")}
                                    onChange={(event) => {
                                        setRoutingNumber(event.currentTarget.value);
                                        checkForErrors({routingNumber:event.currentTarget.value})
                                    }}
                                    className="pl2 pb2  input-reset  bn w-90"
                                />
                            </div>
                            {settingsErrors["routingNumber"] && (
                                <small className="db tl red">{"Invalid Routing Number"}</small>
                                )}
                        </div>
                    </div>
                    {inputConfig.map(fieldGroup=>{
                        const fieldOne = fieldGroup.fields[0]
                        if(fieldGroup.fields.length === 2) {
                            const fieldTwo = fieldGroup.fields[1]
                            return (
                            <div className=" w-100">
                                <div className="dib w-50 pr2">
                                    <div className="tl ba-hover overflow-visible">
                                    <small className="db pl2 pt2 pb1 mid-gray ">
                                    {fieldOne.label} {fieldOne.required && <span className="red">*</span>}
                                    </small>
                                    <input
                                        value={fieldOne.value}
                                        placeholder={"1203480123123".replace(/\d(?=\d{4})/g, "*")}
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
                                    className={`mb2 tl ${classnames({
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