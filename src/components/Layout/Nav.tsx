import * as React from 'react';
import Link from 'next/link'
import { getCookieFromBrowser, removeCookie } from '../../lib';
import Router from 'next/router';
import classnames from 'classnames';

interface NavProps {
  headerHeight: number;
  visible: boolean;
  setVisible: (state: boolean) => void;
}
export const Nav: React.FunctionComponent<NavProps> = ({ headerHeight, visible, setVisible  }) => {
  const isLoggedIn = getCookieFromBrowser('id_token') ? true : false;
  const handleLogout = () => {
    removeCookie('id_token');
    Router.push('/');
  };
  const handleMouseDown = (e) => {
    toggleMenu();

    console.log('clicked');
    e.stopPropagation();
  };

  const toggleMenu = () => {
    setVisible(!visible);
  };
  var visibility = 'hide';

  if (visible) {
    visibility = 'show';
  }
  return (
    <header className="w-full sticky top-0 z-50 ">
      <div
        id="header"
        style={{
          transition: "background-color 0.2s ease",
        }}
        className={` w-full border-black flex absolute items-center pa3-ns pa2 ${classnames(
          {
            "bg-black": headerHeight !== 0 || visible,
          }
        )} justify-between py-3 font-medium gt`}
      >

   
      <a href="/" className="fl f3 fw6 white no-underline">
        tba
      </a>
      <div id="flyoutMenu" className={`${visibility}`} style={{ zIndex: 2 }}>
        <div className="overflow-hidden dt flex fr justify-between relative flex">
          <div
            className="ma3-ns ma2 fw8 f4 dim white"
            onMouseDown={handleMouseDown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              fill="currentColor"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
          </div>
        </div>
        <div className="pa5 pt2 flex flex-wrap justify-between w-100">
          <div className="pv3 w-50-ns w-100">
            <h2
              className="ttu mt0 mb2 f6-ns f7 fw7 gray"
              style={{ letterSpacing: '0.08em' }}
            >
              Social Ticketing
            </h2>
            <a
              href="/about"
              className="white dim no-underline fw6 f4 b db pv1 mv1"
            >
              About
            </a>
            <a
              href="/events"
              className="white dim no-underline fw6 f4 b db pv1 mv1"
            >
              Events
            </a>
            <a
              href="/venues"
              className="white dim no-underline fw6 f4 b db pv1 mv1"
            >
              Venues
            </a>
            {!isLoggedIn ? (
              <a
                href="/signup"
                className="white dim no-underline fw6 f4 b db pv1 mv1"
              >
                Sign Up/Log In
              </a>
            ) : (
              <a
                className="white no-underline fw6 f4 b db pv1 mv1"
                href=""
                onClick={handleLogout}
              >
                Log Out
              </a>
            )}
          </div>

          {isLoggedIn && (
          <div className="pv3 w-50-ns w-100">
            <h2
              className="ttu mt0 mb2 f6 fw7 gray "
              style={{ letterSpacing: '0.08em' }}
            >
              Manage
            </h2>
            <Link
            href="/dashboard">
              <a
                className="white dim no-underline fw6 f4 b db pv1 mv1 "
              >
              Dashboard</a>
            </Link>
            <Link
            href="/dashboard/myevents"
            ><a
            className="white dim no-underline fw6 f4 b db pv1 mv1 "
            >
              My Events</a>
            </Link>
            <a
              href="/dashboard/payouts"
              className="white dim no-underline fw6 f4 b db pv1 mv1"
            >
              Payouts
            </a>
            <a
              href="/dashboard/settings"
              className="white dim no-underline fw6 f4 b db pv1 mv1"
            >
              Settings
            </a>
            <a
              href="/dashboard/create"
              className="white dim no-underline fw6 f4 b db pv1 mv1"
            >
              Create Event
            </a>
          </div>
          )}
          <div className="pv3 w-50-ns w-100">
            <h2
              className="ttu mt0 mb2 f6 fw7 gray "
              style={{ letterSpacing: '0.08em' }}
            >
              Socials
            </h2>
            <a href="" className="white dim no-underline fw6 f4 b db pv1 mv1 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                className="inline mr2"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram
            </a>
            <a href="" className="white dim no-underline fw6 f4 b db pv1 mv1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                fill="currentColor"
                height="15"
                className="inline mr2"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
              Twitter
            </a>
            <a href="" className="white dim no-underline fw6 f4 b db pv1 mv1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                className="inline mr2"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
              Facebook
            </a>
          </div>
        </div>
      </div>
      <ul className="fr f3-l f4-m f5 dtc pa0 ma0 ">
        <li className="white list" onMouseDown={handleMouseDown}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
          </svg>
        </li>
      </ul>
      </div>
    </header>
  );
};
