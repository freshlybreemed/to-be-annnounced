import { EventProps, OrderProps } from '../../src/@types/types';
import QRCode from 'qrcode.react';
import { renderToStaticMarkup } from 'react-dom/server';

// import {
//   formatEventDateTime,
//   formatDate,
//   formatPrice,
// } from '../../src/lib/index';
export const ticketTemplate = {
  content: (order: OrderProps, event: EventProps) => `<html>
  <head>
    <meta charset="utf8">
    <title>SuitArt Business Card</title>
    <link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/npm/tachyons@4.12.0/css/tachyons.min.css'/>
    <style>


      .page {
        position: relative;
        height: 90mm;
        width: 50mm;
        display: block;
        background: white;
        page-break-after: auto;
        margin: 50px;
        overflow: hidden;
      }

      @media print {
        body {
          background: white;
        }

        .page {
          margin: 0;
          height: 100%;
          width: 100%;
        }
      }

      .page.first {
        border-left: 5px solid green;
      }

      .bottom {
        position: absolute;
        left: 5mm;
        right: 5mm;
        bottom: 5mm;
      }

      .group {
        margin-top: 3mm;
      }

      .line {
        color: black;
        position: relative;
      }

      .center {
        text-align: center;
      }

      .logo {
        position: relative;
        width: 80%;
        left: 10%;
        top: 15%;
      }

    </style>
  </head>
  <body>
  <div class="page">
    ${order.tickets.map((curr) => {
      return renderToStaticMarkup(
        <div className="w-80 ma2 black dib sans-serif">
          <div
            style={{
              borderRadius: '8px',
            }}
            className="bg-light-gray h-25 fl relative pa2 mt1 bt w-80"
          >
            <h3
              className="mv2 pv3"
              style={{
                background:
                  'linear-gradient(to bottom, #e84c3d 0%, #e84c3d 26%, #ecedef 26%, #ecedef 100%)',
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
                <h4 className="mv0">3PM</h4>
                <span className="normal f7 gray">Time</span>
              </div>
            </div>
            <div className="v-mid fr">
              <QRCode
                className="v-mid fr"
                value={`${curr.barCode}`}
                renderAs="svg"
                size={80}
              />
              <h5 className="mt1">{curr.barCode}</h5>
            </div>
          </div>
        </div>
      );
    })}
    </div>
  </body>
</html>`,
};
