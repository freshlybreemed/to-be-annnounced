import * as React from 'react';
import QRCode from 'qrcode.react';
import { formatPrice, getOrderTicketCount, formatDate, formatEventTime } from '../../../lib';
import { EventProps, OrderProps } from '../../../@types/types';
import Modal from 'react-modal';
import axios from 'axios';
import classnames from 'classnames';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    backgroundColor: 'black',
    color: 'white',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface AttendeesProps {
  event: EventProps;
  order: OrderProps;
}
export const ManageOrder: React.FunctionComponent<AttendeesProps> = ({
  event,
  order,
}) => {
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const [price] = React.useState<string>(
    formatPrice(order.total.toString(), true)
  );
  const [processing, setProcessing] = React.useState<boolean>(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const refundOrder = async () => {
    await axios
      .post('/api/refund', {
        order,
        event,
      })
      .then(() => {
        setIsOpen(false);
      });
  };
  console.log(order);

  return (
    <div className={'w-100'}>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3>Are you sure you want to process a refund?</h3>
        <div className="dtc-l dtc-m v-mid tr f5-l f6 fw5 ">
          <span
            onClick={() => {
              setProcessing(true);
              refundOrder();
            }}
            className="b--white dib no-underline white noselect dim br-100 b--solid pa2 mt2-l ph3 mr2"
          >
            {processing && <i className="fa fa-spinner fa-spin mr2" />}
            {processing ? 'Refunding...' : 'Yes'}
          </span>
          {!processing && (
            <span
              onClick={() => {
                setProcessing(false);
                closeModal();
              }}
              className="b--white dib no-underline white noselect dim br-100 b--solid pa2 mr2 mt2-l ph3 mt2"
            >
              No
            </span>
          )}
        </div>
      </Modal>
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
          </div>
          <div className="w-auto-m dtc" />
        </article>

        <section className="w-100 ">
          <div className="bg-black-80">
            <div className="dtc-l dtc-m v-mid tr f5-l f6 fw5 ">
              <span
                onClick={openModal}
                className="b--white dib no-underline white noselect dim br-100 ba b--solid pa2 mt2-l ph3 mr2"
              >
                {order.refunded ? 'Refunded' : 'Refund'}
              </span>
              <a
                href={`/dashboard/edit/${event.slug}`}
                className="b--white dib no-underline white noselect dim br-100 ba b--solid pa2 mr2 mt2-l ph3 mt2"
              >
                Edit Info
              </a>
            </div>
            <div className="pv4 pr2-ns mr3-ns">
              <table
                className="f6-ns f7 w-100  pb2 center"
                style={{ borderCollapse: 'collapse' }}
              >
                <thead className="bb">
                  <tr className="f5-ns f6 fw7 tl">
                    <th className="pa1  ">Ticket Buyer</th>
                    <th className="pa1 ">Quantity</th>
                    <th className="pa1 ">Total Sales</th>
                  </tr>
                </thead>
                <tbody className="lh-copy f4-l f5-m f6">
                  {
                    <tr className={`dim noselect `}>
                      <td className="pa1">
                        {`${order.firstName} ${order.lastName}`}
                      </td>

                      <td className="pa1">{getOrderTicketCount(order.cart)}</td>
                      <td className="pa1">
                        {order.refunded ? `(${price})` : `${price}`}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <span                 className="b--white dib no-underline white noselect dim br-100 ba b--solid pa2 mr2 mt2-l ph3 mt2">          Tickets
        </span>
        <div className=" mt2 flex flex-wrap">
          {order.tickets.map((curr) => {
            return (
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
                    `linear-gradient(to bottom, ${classnames({'#e84c3d 0%, #e84c3d 26%': curr.checkedIn,'#129238 0%, #177a1c 26%': !curr.checkedIn,  })}, #ecedef 26%, #ecedef 100%)`,
                  }}
                >
                  Social <span className="normal">Ticketing</span>
                </h3>
                <div className="fl">
                  <div className="ttu  mt3">
                    <h4 className="mv0">{event.name}</h4>
                    <span className="normal f7 gray">Event</span>
                  </div>
                  <div className="ttu mt2">
                    <h4 className="mv0">{`${order.firstName} ${order.lastName}`}</h4>
                    <span className="normal f7 gray">Name</span>
                  </div>
                  <div className="ttu fl mt2">
                    <h4 className="mv0">{curr.ticketName}</h4>
                    <span className="normal f7 gray">Ticket</span>
                  </div>
                  <div className="ttu fl mt2 ml2">
                    <h4 className="mv0">{`${formatEventTime(
                      new Date(event.startDate),
                      new Date(event.endDate),
                      event.location.timeZoneId,
                    )}`}
                    </h4>
                    <span className="normal f7 gray">Time</span>
                  </div>
                </div>
                <div className="v-mid fr">
                  <div className="">
                    <QRCode
                      value={`${curr.barCode}`}
                      renderAs="svg"
                      size={80}
                    />
                  </div>
                  <div>{curr.barCode}</div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
