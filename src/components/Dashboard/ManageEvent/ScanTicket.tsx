import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { EventProps, OrderProps, UserTicketProps } from '../../../@types/types';
import moment from 'moment';
import classnames from 'classnames';
import { formatDate, formatEventDateTime, formatEventTime, getOrderTicketCount, instance } from '../../../lib';
import QRCode from 'qrcode.react';

const importQR = () => import('react-qr-reader');

const QrReader = dynamic(importQR, {
  ssr: false,
});
interface Props {
  event: EventProps;
  orders: OrderProps[];
}

export const ScanTicket: React.FunctionComponent<Props> = ({
  event,
  orders,
}) => {
  const [tickets,setTickets] = useState<UserTicketProps[]>(
    orders.reduce((acc, curr) => {
      return acc.concat(curr.tickets);
    }, [])
  );
  const [live] = useState<boolean>(new Date(event.startDate) > new Date());
  const [facing, setFacing] = useState<boolean>(true);
  const [tixMode, setTixMode] = useState<boolean>(false);
  const [currEvent, setCurrEvent] = useState<EventProps>(event);
  const [error, setError] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderProps>(null);
  const [tix, setTix] = useState<UserTicketProps>(null);

  const [inProgress] = useState<boolean>(
    moment().isBetween(event.startDate, event.endDate)
  );
  const handleScan = (data) => {
    
    if (data) {
      const tix = (tickets.filter((curr) => curr.barCode === data))[0];
      if (tix){
        setTix(tix);
        setError(false);
        const existingOrder = orders.filter((curr)=> curr._id === tix.orderId)[0]
        let checkedIn = true;
        const newOrder: OrderProps = { 
          ...existingOrder,
          tickets: existingOrder.tickets.map(tix=>{
            if((!tix.checkedIn && tix.barCode !== data) && checkedIn){
              checkedIn = false;
            }
            return {
              ...tix,
              checkedIn: tix.barCode === data ? true: tix.checkedIn,
              checkInDate: tix.barCode === data ? new Date(): tix.checkInDate
            }
          }),
          checkedIn
        }
        const updatedEvent = {
          ...currEvent,
          tickets: currEvent.tickets.map(order=>{
            if(order._id === newOrder._id) return newOrder
            return order
          })
        }
        setOrder(existingOrder)
        setTixMode(true)
        setCurrEvent(updatedEvent)
        setTickets(updatedEvent.tickets.reduce((acc, curr) => {
          return acc.concat(curr.tickets);
        }, []))
        instance.post(`/api/scanTix`,{order: newOrder, event: updatedEvent})
        .then(res=>console.log(res.data))
        .catch(err=>console.log('error',err))
      } else {
        setError(true)
      }
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <main className="mw9 ml4-ns ph3-l center">
        <article className="dt tc tl-ns w-90-l w-100-m  pb2 mv2">
          <div className="dtc-l dtc-m  pt2-m pb2 v-mid  fw7">
            <div className="mb3">
              <span className="ba bw2 f3-l f4 fw6-l fw4 br-100 b--solid pv2 ph3 mv2">
                Scan Tickets
              </span>
            </div>
            <div className=" lh-title f3 mb0 mt0-ns underline-hover">
              <a className="white no-underline">{currEvent.name}</a>
            </div>
            <div className="f4-ns f5 fw6 lh-title mv0 underline-hover">
              <a
                className="white no-underline"
                target="_blank"
                href={`https://www.google.com/maps/place/?q=place_id:${currEvent.location.placeId}`}
              >
                {currEvent.location.venue}
              </a>
            </div>
            <div>
              <span className="f4-ns f5 fw6 mv0 gray">
                {`${formatEventDateTime(
                  new Date(currEvent.startDate),
                  new Date(currEvent.endDate),
                  currEvent.location.timeZoneId
                )}`}
              </span>
            </div>
          </div>
          <div className="w-auto-m dtc" />
        </article>
      </main>
      {!tixMode?
      <div className="w-70-ns w-90 center">
        <div className="mb3">
          <span
            onClick={() => setFacing(!facing)}
            className="ba bw2 f3-l f4 fw6-l fw4 br-100 b--solid pv2 ph3 mv2"
          >
            Flip Camera
          </span>
        </div>
        <QrReader
          delay={300}
          resolution={790}
          facingMode={facing ? 'user' : 'environment'}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>:
      <div>
        <main className="mw9 ml4-ns ph3-l center">
          <article className="dt tc tl-ns w-90-l w-100-m  pb2 mv2">
            <div className="dtc-l dtc-m  pt2-m pb2 v-mid  fw7">
              <div className="mb3 bg-black-80">
                <span className="f3-l f4 fw6-l fw4 ba bw2  br-100 b--solid pv2 ph3 mv2">
                  Order Details
                </span>
              </div>
              <div className=" lh-title f3 mb0 mt0-ns underline-hover">
                {`${order.firstName} ${order.lastName}`}
              </div>
              <div className="f4-ns f5 fw6 lh-title mv0 underline-hover">
                {order.emailAddress}
              </div>
              <div>
                <span className="f4-ns f5 fw6 mv0 gray">
                  Purchase Date: {`${formatDate(order.orderDate, 'medium')}`}
                </span>
              </div>
              <h2
                className={`f4-ns f5 fw6 mv0`}
                >
                <span className={`
                ${classnames({
                  green: !tix.checkedIn,
                  red: tix.checkedIn,
                  yellow: inProgress,
                })}`}>
                • {inProgress ? `Partially Scanned` : tix.checkedIn ? `Already scanned` : `Checked In`}
                </span>
              </h2>
            </div>
            <div className="w-auto-m dtc" />
          </article>
        
          <div className=" mt2 flex flex-wrap">
            <div
              className="w-100 center ma2 black bg-light-gray h-25 fl relative pa2 mt1 bt w-80-ns"
              style={{
                borderRadius: '8px',
              }}
            >
              <h3
                className="mv2 pv3"
                style={{
                  background:
                    `linear-gradient(to bottom, ${classnames({'#e84c3d 0%, #e84c3d 26%': tix.checkedIn,'#129238 0%, #177a1c 26%': !tix.checkedIn,  })}, #ecedef 26%, #ecedef 100%)`,
                }}
              >
                Social <span className="normal">Ticketing</span>
              </h3>
              <div className="fl">
                <div className="ttu  mt3">
                  <h4 className="mv0">{currEvent.name}</h4>
                  <span className="normal f7 gray">Event</span>
                </div>
                <div className="ttu mt2">
                  <h4 className="mv0">{`${order.firstName} ${order.lastName}`}</h4>
                  <span className="normal f7 gray">Name</span>
                </div>
                <div className="ttu fl mt2">
                  <h4 className="mv0">{tix.ticketName}</h4>
                  <span className="normal f7 gray">Ticket</span>
                </div>
                <div className="ttu fl mt2 ml2">
                  <h4 className="mv0">{`${formatEventTime(
                  new Date(currEvent.startDate),
                  new Date(currEvent.endDate),
                  currEvent.location.timeZoneId,
                )}`}</h4>
                  <span className="normal f7 gray">Time</span>
                </div>
              </div>
              <div className="v-mid fr">
                <div className="">
                  <QRCode
                    value={`${tix.barCode}`}
                    renderAs="svg"
                    size={80}
                  />
                </div>
                <div>{tix.barCode}</div>
              </div>
            </div>
        </div>
        <div className="dtc-l v-mid tr-l tc f2-l f3 fw6 mt3 pt3">
          <span
            onClick={() => setTixMode(false)}
            className="no-underline white  noselect br-100 tc pa2 mr2 mt2-l ph4 mt2  bg-green"
          >
            Scan Another Tix
          </span>
        </div>
      </main>
      </div>}
    </div>
  );
};
