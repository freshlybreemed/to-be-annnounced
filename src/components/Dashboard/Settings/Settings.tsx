import classnames from 'classnames';
import classNames from 'classnames';
import * as React from 'react';
import { useState } from 'react';
import { PlacesAutoComplete, DateTimePicker, UploadFlyer } from '..';
import settings from '../../../../pages/dashboard/settings';
import { EventProps, UserProps, UserSettingsProps } from '../../../@types/types';
import { validStartDate, validEndDate, timeConstraints } from '../../../lib';
import { BasicInfo } from './BasicInfo';
import { Billing } from './Billing';

interface SettingsProps {
  userProp: UserProps;
}
export const Settings: React.FunctionComponent<SettingsProps> = ({userProp}) => {
// sole.log(user)
    const [user, setUser] = useState<any>(userProp);
    const [mode, setMode] = useState<any>(0);

    const checkForErrors = (item) => {
        return true;
    }
    return (
        <article className="w-100 tc">
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/draft-js/0.11.5/Draft.min.css"
        />
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/draftail@1.3.0/dist/draftail.css"
        />
        <div className="ph4 pb4 mb2 mb0-ns fw5 f1-l f2">
            Account Settings
        </div>
        <div className="pv3 mb4 bb-hover">
          <span
            onClick={() => setMode(0)}
            className={`f4-ns noselect f6 fw6-ns pb2 mr3 
            ${classnames({
              active: mode === 0,
              gray: mode !== 0 ,
            })}
            `}
          >
            Basic Info          
        </span>
          <span
            onClick={() => setMode(1)}
            className={`ml3 noselect f4-ns f6 fw6-ns pb2  ${classnames({
                active: mode === 1,
                gray: mode !== 1 ,
            })}`}
          >
            Billing
          </span>
          <span
            onClick={() => setMode(2)}
            className={`ml3 noselect f4-ns f6 fw6-ns pb2  ${classnames({
                active: mode === 2,
                gray: mode !== 2,
            })}`}
          >
            Preferences
          </span>
        </div>
            {mode === 0 && <BasicInfo userProp={userProp}/>}
            {mode === 1 && <Billing userProp={userProp}/>}
        </article>
    );
}