import * as React from 'react';
import { formatDate, formatPrice, formatTime } from '../../lib';
import FadeIn from 'react-fade-in';
import { EventProps, TicketProps } from '../../@types/types';
import { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 32px;
  box-sizing: inherit;
  
  @media (min-width: 80em){
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 80em) and (min-width: 55em){
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 55em) and (min-width: 40em) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const client = algoliasearch(process.env.ALGOLIA_ID, process.env.ALGOLIA_KEY);
const index = client.initIndex('events');

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
interface MyEventsProps {
  events: EventProps[];
}

const getLowestPrice = (ticketTypes: { [ticketName: string]: TicketProps }) => {
  const tickets = Object.keys(ticketTypes).map((curr) => ticketTypes[curr]);
  const lowestPrice = tickets.reduce((acc, curr) =>
    acc.price < curr.price && curr.enabled && curr.sold < curr.quantity
      ? acc
      : curr
  ).price;

  return formatPrice(lowestPrice.toString());
};

const isSalesEnded = (endDate: Date) => new Date() > new Date(endDate);


export const Events: React.FunctionComponent<MyEventsProps> = ({ events }) => {
  const isMounted = useMounted();
  const [eventResults, setEventResults] = useState<EventProps[]>(events);
  const [query, setQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const getEvents = (query) => {
    setIsSearching(true)
    index
      .search(query)
      .then(({ hits }: any) => {
        setIsSearching(false);
        setEventResults(hits);
        console.log(hits);
      })
      .catch((err) => {
        setIsSearching(false);
        console.log(err);
      });
  };

  return (
    <div className={`pv3 relative`}>
      <div className=" ml4-ns ">
        <h1 className="f1-ns f2 font-bold">Find upcoming events near you </h1>
        <div className="bg-near-black overflow-hidden pa2 pa3-ns br3 ">
          <div className="mb4 ph2 ">
            <svg
              className="white mt3 inline mr2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z" />
            </svg>
            <input
              className="pa2 bt-0 br-0 bl-0 input-reset bb bg-transparent white w-70-l w-50-m w-40 mr3"
              placeholder="Search events"
              value={query}
              onChange={(e) => {
                setQuery(e.currentTarget.value);
                getEvents(e.currentTarget.value);
              }}
            />
          </div>
          {isMounted && !isSearching ? (
            <FadeIn>
              <Grid>
                {eventResults.reverse().map((curr: EventProps, ind) => (
                  <div className="w-100 mb3" key={ind}>
                    <a className="white no-underline" href={`/e/${curr.slug}`}>
                      <div
                        className="w-100 relative flex"
                        style={{ boxSizing: 'inherit' }}
                      >
                        <div
                          style={{
                            backgroundImage: `url("${curr.image}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            top: '0px',
                            left: '0px',
                            width: '300px',
                            height: '200px',
                          }}
                          className="o-100  "
                        ></div>
                      </div>
                      <h4 className="f5 fw4 mt2">
                        {formatDate(new Date(curr.startDate))}
                        {' — '}
                        {formatTime(
                          new Date(curr.startDate),
                          curr.location.timeZoneId
                        )}
                      </h4>
                      <h4 className="f4 fw8 mt2 mb0 ttu">{curr.name}</h4>
                      <h4 className="f5 fw6 mt1 pt1 ">
                        {getLowestPrice(curr.ticketTypes)} -{' '}
                        {curr.location.venue}
                      </h4>
                    </a>
                    <div className="mt3">
                      <a
                        href={`/e/${curr.slug}`}
                        className="bg-black white bw1 ba br-100 pa2 tc f4-ns f6 fw6-ns fw5 grow no-underline ph4 b--solid "
                      >
                      {!isSalesEnded(curr.endDate) ?  `Get Tickets`: `Sales Ended`}
                      </a>
                    </div>
                  </div>
                ))}
              </Grid>
            </FadeIn>
          ) : (
            <div className="f1 tc">
              <i className="fa-2x fa fa-spinner fa-spin  " />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
