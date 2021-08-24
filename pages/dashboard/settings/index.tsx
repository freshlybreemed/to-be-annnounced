import * as React from 'react';
import { NextPage } from 'next';
import { Layout } from '../../../src/components/Layout/';
import SecuredPage from '../../../src/hoc/securedPage';
// import { EventProps, UserProps } from '../../src/@types/types';
import useRequest from '../../../src/lib/useRequest';
import { getCookie } from '../../../src/lib';
import { Settings } from '../../../src/components/Dashboard/Settings/Settings';
import { EventProps, UserProps } from '../../../src/@types/types'

interface Props {
  events?: EventProps[];
  user?: UserProps;
}
const Page: NextPage = () => {
  const organizerId = getCookie('id_token', null);
  const api = useRequest({ url: `/api/user`, params: { organizerId } })
  const data: Props = api?.data

  const pageInfo = {
    title: `Account Settings`,
    header: 'TBA',
    description: 'Discover lit events.',
  };

  return (
    <Layout data={pageInfo} noPadding={true}>
        {data? 
          (<section className="flex-m flex-l nl3-m nr3-m nl3-l nr3-l">
            <Settings 
              userProp={data.user}
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
