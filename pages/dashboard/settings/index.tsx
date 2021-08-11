import * as React from 'react';
import { NextPage } from 'next';
import { Layout } from '../../../src/components/Layout/';
import SecuredPage from '../../../src/hoc/securedPage';
// import { EventProps, UserProps } from '../../src/@types/types';
import useRequest from '../../../src/lib/useRequest';
import { getCookie } from '../../../src/lib';
import { Settings } from '../../../src/components/Dashboard/Settings/Settings';
import { UserProps } from '../../../src/@types/types';

const Page: NextPage = () => {
  const organizerId = getCookie('id_token', null);
  const {data}: any = useRequest({ url: `/api/user`, params: { organizerId } })
  const user:UserProps = data?.user[0];
  console.log('dude',data)
  return (
    <Layout data={data} noPadding={true}>
   
            {data? 
          (<section className="flex-m flex-l nl3-m nr3-m nl3-l nr3-l">
            <Settings 

            userProp={user}
            />
          </section>): (
          <div className="vh-50 dt center">
            <div className="v-mid dtc">
              <i className="fa-6x fa fa-spinner fa-spin mr2" />
            </div>
          </div>
        )}
    </Layout>
  );
}
export default SecuredPage(Page);
