import * as React from 'react';
import { UserProps } from '../../@types/types';

interface DashboardProps {
  user: UserProps
}
export const Dashboard: React.FunctionComponent = () => {
  // console.log(user)
  return (
    <article className="w-100 w-75-m w-75-l ph3-m ph3-l">
      <header className="mb3">
        <h1 className="f2-ns f3 mv0">Welcome, Ebrima</h1>
      </header>
      <hr className="o-20" />
      <div className="flex flex-wrap items-center justify-between pt1 mb4">
        <div className="flex flex-wrap  w-100 nr3 mb2">
          <article className="mw8 bg-black-80 br3 w-100 w-48-ns mr1-ns pa3   mv1  bg-green">
            <div className="cf f4-l fw6 f5-m f6 ">
              <div className="fl w-60  tl  ">
                <span className="">Net Revenue</span>
              </div>
              <div className="fl w-40 tr">
                <span className=" ">$1273.50</span>
              </div>
            </div>
          </article>
          <article className="mw8 bg-black-80 br3 w-48-ns w-100 pa3 ml1-ns mv1 bg-purple">
            <div className="cf f4-l fw6 f5-m f6 ">
              <div className="fl w-60  tl ">
                <span className="">Tickets Sold</span>
              </div>
              <div className="fl w-40  tr ">
                <span className="">1073</span>
              </div>
            </div>
          </article>
        </div>
      </div>{' '}
      <div className="flex flex-wrap justify-between w-100 nr3 mb4">
        <section className="fl w-48-l w-100 mb2 ">
          <div className="bg-black-80  pl0 ">
            <span className="f3-l f4 fw6-l fw4 br-100 b--solid pv2 ph3 mv2">
              To-Do List
            </span>
            <div className="pt4 pb0-l pb3  ">
              <article className="br3  w-100 pa3 ml1-ns mv1 bg-near-black noselect">
                <div className="cf  w-100 v-mid f4-l fw6 f5-m f6 ">
                  <span className="mr2">✓</span>

                  <span className="">Create Your First Event</span>
                </div>
              </article>
              <article className="br3 dim w-100 pa3 ml1-ns mv1 bg-dark-gray noselect">
                <div className="cf  w-100 v-mid f4-l fw6 f5-m f6 ">
                  <span className="mr2 ">+</span>

                  <span className="">Setup Payouts</span>
                </div>
              </article>
              <article className="br3 dim w-100 pa3 ml1-ns mv1 bg-dark-gray noselect">
                <div className="cf  w-100 v-mid f4-l fw6 f5-m f6 ">
                  <span className="mr2 ">+</span>

                  <span className="">Connect Social Accounts</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="fl w-48-ns w-100 mb2 ">
          <div className="bg-black-80  ">
            <span className="f3-l f4 fw6-l fw4 br-100 b--solid pv2 ph3 mv2">
              Payouts{' '}
            </span>
            <p className="pt4">
              You currently have no payouts scheduled. Set up one{' '}
              <span className="b">
                <a className="white" href="">
                  here.
                </a>
              </span>
            </p>
          </div>
        </section>
      </div>
      <div className="bg-moon-gray br-pill h1 overflow-y-hidden mb4">
        <div className="bg-green br-pill h1 shadow-1 w-75 progress-bar"></div>
      </div>
      <div className="mb4 bg-moon-gray br-pill h1 overflow-y-hidden">
        <div className="bg-blue progress-bar br-pill h1 shadow-1 w-50"></div>
      </div>
      <div className="bg-moon-gray br-pill h1 overflow-y-hidden">
        <div className="bg-gray br-pill h1 shadow-1 w-third"></div>
      </div>
    </article>
  );
}