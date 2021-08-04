import * as React from 'react';
import { NextPage } from 'next';
import { Dashboard } from '../../src/components/Dashboard/';
import { Layout } from '../../src/components/Layout/';
import SecuredPage from '../../src/hoc/securedPage';
import { EventProps, UserProps } from '../../src/@types/types';
import useRequest from '../../src/lib/useRequest';
import { getCookie } from '../../src/lib';

const Page: NextPage = () => {
  const organizerId = getCookie('id_token', null);
  const {data}: any = useRequest({ url: `/api/user`, params: { organizerId } })
  console.log('dude',data)
  return (
    <Layout>
      <div>
        <div className="mw8 center pv4 ph3" id="dashboard">
            {data? 
          (<section className="flex-m flex-l nl3-m nr3-m nl3-l nr3-l">
            <Dashboard 
            // user={user[0]}
            />
          </section>): (
          <div className="vh-50 dt center">
            <div className="v-mid dtc">
              <i className="fa-6x fa fa-spinner fa-spin mr2" />
            </div>
          </div>
        )}
        </div>
      </div>
    </Layout>
  );
}
export default SecuredPage(Page);
