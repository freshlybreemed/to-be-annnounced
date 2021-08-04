import { EventProps, OrderProps } from '../../src/@types/types';
import {
  formatEventDateTime,
  formatDate,
  formatPrice,
  getCurrentYear
} from '../../src/lib/index';
export const emailTemplates = {
  subject: (eventName) => `You Just Scored Tickets to ${eventName}`,
  content: (event: EventProps, order: OrderProps) => `<!DOCTYPE html>
<html
  lang="en"
  style="
    -webkit-text-size-adjust: 100%;
    line-height: 1.15;
    box-sizing: border-box;
  "
>
  <head>
    <title> </title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>

  <body
    style="margin: 0; padding: 0; background-color: #eeeeee;"
    bgcolor="#eeeeee"
    data-gr-c-s-loaded="true"
  >
    <!--[if mso]>
      <style type="text/css">
        body,
        table,
        td {
          font-family: Arial, Helvetica, sans-serif !important;
        }
      </style>
    <![endif]-->
    <!-- START EMAIL -->
    <div
      class="Gmail"
      style="
        height: 1px !important;
        margin-top: -1px !important;
        max-width: 600px !important;
        min-width: 600px !important;
        width: 600px !important;
      "
    ></div>
    <div style="display: none; max-height: 0px; overflow: hidden;">
      Your Tickets to ${event.name}
    </div>
    <div itemscope itemtype="http://schema.org/EventReservation">
      <meta itemprop="reservationNumber" content="${order._id}"/>
      <link itemprop="reservationStatus" href="http://schema.org/Confirmed"/>
      <div itemprop="underName" itemscope itemtype="http://schema.org/Person">
        <meta itemprop="name" content="${event.name}"/>
      </div>
      <div itemprop="reservationFor" itemscope itemtype="http://schema.org/Event">
        <meta itemprop="name" content="${event.name}"/>
        <meta itemprop="startDate" content="${event.startDate}"/>
        <meta itemprop="endDate" content="${event.endDate}"/>
        <div itemprop="location" itemscope itemtype="http://schema.org/Place">
          <meta itemprop="name" content="${event.location.venue}"/>
          <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
            <meta itemprop="streetAddress" content="${event.location.address}"/>
            <meta itemprop="addressLocality" content="${event.location.city}"/>
            <meta itemprop="addressRegion" content="${event.location.state}"/>
            <meta itemprop="postalCode" content="${event.location.zip}"/>
            <meta itemprop="addressCountry" content="US"/>
          </div>
        </div>
      </div>
    </div>

    
    <div style="display: none; max-height: 0px; overflow: hidden;">
      &nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      bgcolor="#eeeeee"
    >
      <!-- Insert &zwnj;&nbsp; hack after hidden preview text -->

      <!-- VIEW ONLINE -->
      <tbody>
        <tr>
          <td
            width="100%"
            valign="top"
            align="center"
            class="padding-container"
            style="
              padding: 18px 0px 0px 0px !important;
              mso-padding-alt: 18px 0px 0px 0px;
            "
          >
            <table
              width="600"
              cellpadding="0"
              cellspacing="0"
              border="0"
              align="center"
              class="wrapper"
              bgcolor="#eeeeee"
            >
              <tbody>
                <tr>
                  <td align="center" bgcolor="#eeeeee">
                    <a
                      href="http://paulgoddarddesign.com/emails/material-design"
                      target="_blank"
                      style="
                        font-size: 12px;
                        line-height: 14px;
                        font-weight: 500;
                        font-family: -apple-system, BlinkMacSystemFont,
                          avenir next, avenir, helvetica neue, helvetica, ubuntu,
                          roboto, noto, segoe ui, arial, sans-serif;
                        color: #212121;
                        text-decoration: underline;
                        padding-bottom: 10px;
                        border: 1px solid #eeeeee;
                        display: inline-block;
                      "
                      ><font style="vertical-align: inherit;"
                        ><font style="vertical-align: inherit;"
                          >View In Browser</font
                        ></font
                      ></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <!-- VIEW VIEW ONLINE -->

        <!-- START CARD 1 -->
        <tr>
          <td
            width="100%"
            valign="top"
            align="center"
            class="padding-container"
            style="
              padding-top: 0px !important;
              padding-bottom: 18px !important;
              mso-padding-alt: 0px 0px 18px 0px;
            "
          >
            <table
              width="600"
              cellpadding="0"
              cellspacing="0"
              border="0"
              align="center"
              class="wrapper"
            >
              <tbody>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tbody>
                        <tr>
                          <td
                            style="
                              border-radius: 3px;
                              border-bottom: 2px solid #d4d4d4;
                            "
                            class="card-1"
                            width="100%"
                            valign="top"
                            align="center"
                          >
                            <table
                              style="border-radius: 3px;"
                              width="600"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              align="center"
                              class="wrapper"
                              bgcolor="#ffffff"
                            >
                              <tbody>
                                <tr>
                                  <td align="center">
                                    <table
                                      width="600"
                                      cellpadding="0"
                                      cellspacing="0"
                                      border="0"
                                      class="container"
                                    >
                                      <!-- START HEADER IMAGE -->
                                      <tbody>
                                        <tr>
                                          <td
                                            align="center"
                                            class="hund ripplelink"
                                            width="600"
                                          >
                                            <img
                                              align="center"
                                              width="600"
                                              style="
                                                border-radius: 3px 3px 0px 0px;
                                                width: 100%;
                                                max-width: 600px !important;
                                              "
                                              class="hund"
                                              src="${event.image}"
                                            />
                                          </td>
                                        </tr>
                                        <!-- END HEADER IMAGE -->
                                        <!-- START BODY COPY -->
                                        <tr>
                                          <td
                                            class="td-padding"
                                            align="left"
                                            style="
                                              font-family: -apple-system,
                                                BlinkMacSystemFont, avenir next,
                                                avenir, helvetica neue,
                                                helvetica, ubuntu, roboto, noto,
                                                segoe ui, arial, sans-serif;
                                              color: #212121 !important;
                                              font-size: 24px;
                                              line-height: 30px;
                                              font-weight: 700;
                                              padding-top: 18px;
                                              padding-left: 18px !important;
                                              padding-right: 18px !important;
                                              padding-bottom: 0px !important;
                                              mso-line-height-rule: exactly;
                                              mso-padding-alt: 18px 18px 0px
                                                13px;
                                            "
                                          >
                                            <font
                                              style="vertical-align: inherit;"
                                              ><font
                                                style="vertical-align: inherit;"
                                              >
                                                ${event.name}
                                              </font></font
                                            >
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            class="td-padding"
                                            align="left"
                                            style="
                                              font-family: -apple-system,
                                                BlinkMacSystemFont, avenir next,
                                                avenir, helvetica neue,
                                                helvetica, ubuntu, roboto, noto,
                                                segoe ui, arial, sans-serif;
                                              color: #212121 !important;
                                              font-size: 18px;
                                              line-height: 22px;
                                              padding-top: 18px;
                                              padding-left: 18px !important;
                                              padding-right: 18px !important;
                                              padding-bottom: 0px !important;
                                              mso-line-height-rule: exactly;
                                              mso-padding-alt: 18px 18px 0px
                                                18px;
                                            "
                                          >
                                            <font
                                              style="vertical-align: inherit;"
                                            >
                                              <font
                                                style="vertical-align: inherit;"
                                              >
                                                ${event.location.venue}
                                              </font>
                                            </font>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            class="td-padding"
                                            align="left"
                                            style="
                                              font-family: -apple-system,
                                                BlinkMacSystemFont, avenir next,
                                                avenir, helvetica neue,
                                                helvetica, ubuntu, roboto, noto,
                                                segoe ui, arial, sans-serif;
                                              color: #3f60e7 !important;
                                              font-size: 16px;
                                              line-height: 20px;
                                              padding-left: 18px !important;
                                              padding-right: 18px !important;
                                              padding-bottom: 0px !important;
                                              mso-line-height-rule: exactly;
                                              mso-padding-alt: 18px 18px 0px
                                                18px;
                                            "
                                          >
                                            <font
                                              style="vertical-align: inherit;"
                                            >
                                              <font
                                                style="vertical-align: inherit;"
                                                ><a
                                                  style="
                                                    text-decoration: none;
                                                    color: #3f60e7 !important;
                                                  "
                                                  href="https://www.google.com/maps/place/?q=place_id:${
                                                    event.location.placeId
                                                  }"
                                                  >(Google Maps)</a
                                                > </font
                                              ><font
                                                style="vertical-align: inherit;"
                                                ><a
                                                  style="
                                                    text-decoration: none;
                                                    color: #3f60e7 !important;
                                                  "
                                                  href="http://maps.apple.com/?q=${
                                                    event.location.venue
                                                  }"
                                                  >(Apple Maps)</a
                                                >
                                              </font></font
                                            >
                                          </td>
                                        </tr>

                                        <tr>
                                          <td
                                            class="td-padding"
                                            align="left"
                                            style="
                                              font-family: -apple-system,
                                                BlinkMacSystemFont, avenir next,
                                                avenir, helvetica neue,
                                                helvetica, ubuntu, roboto, noto,
                                                segoe ui, arial, sans-serif;
                                              color: #212121 !important;
                                              font-size: 16px;
                                              line-height: 20px;
                                              padding-left: 18px !important;
                                              padding-right: 18px !important;
                                              padding-bottom: 0px !important;
                                              mso-line-height-rule: exactly;
                                              mso-padding-alt: 18px 18px 0px
                                                18px;
                                            "
                                          >
                                            <font
                                              style="vertical-align: inherit;"
                                            >
                                              <font
                                                style="vertical-align: inherit;"
                                                >${formatEventDateTime(
                                                  new Date(event.startDate),
                                                  new Date(event.endDate),
                                                  event.location.timeZoneId,
                                                )}
                                              </font></font
                                            >
                                          </td>
                                        </tr>
                                       
                                        <!-- END BODY COPY -->
                                        <!-- BUTTON -->
                                        <tr>
                                          <td
                                            align="left"
                                            style="
                                              padding: 18px 18px 18px 18px;
                                              mso-alt-padding: 18px 18px 18px
                                                18px !important;
                                            "
                                          >
                                            <table
                                              width="100%"
                                              border="0"
                                              cellspacing="0"
                                              cellpadding="0"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    <table
                                                      border="0"
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            align="left"
                                                            style="
                                                              border-radius: 3px;
                                                            "
                                                            bgcolor="#17bef7"
                                                          >
                                                            <a
                                                              class="button raised"
                                                              href="https://www.socialticketing.io/dashboard/manage/${
                                                                event._id
                                                              }/order/${
    order._id
  }"
                                                              target="_blank"
                                                              style="
                                                                font-size: 14px;
                                                                line-height: 14px;
                                                                font-weight: 500;
                                                                font-family: Helvetica,
                                                                  Arial,
                                                                  sans-serif;
                                                                color: #ffffff;
                                                                text-decoration: none;
                                                                border-radius: 3px;
                                                                padding: 10px
                                                                  25px;
                                                                border: 1px
                                                                  solid #17bef7;
                                                                display: inline-block;
                                                              "
                                                              ><font
                                                                style="
                                                                  vertical-align: inherit;
                                                                "
                                                                ><font
                                                                  style="
                                                                    vertical-align: inherit;
                                                                  "
                                                                  >View
                                                                  Tickets</font
                                                                ></font
                                                              ></a
                                                            >
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <!-- END BUTTON -->
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <!-- END CARD 1 -->

        <!-- START CARD 2 -->

        <tr>
          <td
            width="100%"
            valign="top"
            align="center"
            class="padding-container"
            style="
              padding-top: 0px !important;
              padding-bottom: 18px !important;
              mso-padding-alt: 0px 0px 18px 0px;
            "
          >
            <table
              width="600"
              cellpadding="0"
              cellspacing="0"
              border="0"
              align="center"
              class="wrapper"
            >
              <tbody>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tbody>
                        <tr>
                          <td
                            style="
                              border-radius: 3px;
                              border-bottom: 2px solid #d4d4d4;
                            "
                            class="card-1"
                            width="100%"
                            valign="top"
                            align="center"
                          >
                            <table
                              style="border-radius: 3px;"
                              width="600"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              align="center"
                              class="wrapper"
                              bgcolor="#ffffff"
                            >
                              <tbody>
                                <tr>
                                  <td align="center">
                                    <table
                                      width="600"
                                      cellpadding="0"
                                      cellspacing="0"
                                      border="0"
                                      class="container"
                                    >
                                      <!-- START HEADER IMAGE -->
                                      <tbody>
                                        <!-- END HEADER IMAGE -->
                                        <!-- START BODY COPY -->
                                        <tr>
                                          <td
                                            class="td-padding"
                                            align="left"
                                            style="
                                              font-family: -apple-system,
                                                BlinkMacSystemFont, avenir next,
                                                avenir, helvetica neue,
                                                helvetica, ubuntu, roboto, noto,
                                                segoe ui, arial, sans-serif;
                                              color: #212121 !important;
                                              font-size: 24px;
                                              line-height: 30px;
                                              padding-top: 18px;
                                              padding-left: 18px !important;
                                              padding-right: 18px !important;
                                              padding-bottom: 0px !important;
                                              font-weight: 700;

                                              mso-line-height-rule: exactly;
                                              mso-padding-alt: 18px 18px 0px
                                                13px;
                                            "
                                          >
                                            <font
                                              style="vertical-align: inherit;"
                                              ><font
                                                style="vertical-align: inherit;"
                                              >
                                                Order Summary
                                              </font></font
                                            >
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            class="td-padding"
                                            align="left"
                                            style="
                                              font-family: -apple-system,
                                                BlinkMacSystemFont, avenir next,
                                                avenir, helvetica neue,
                                                helvetica, ubuntu, roboto, noto,
                                                segoe ui, arial, sans-serif;
                                              color: #212121 !important;
                                              font-size: 16px;
                                              line-height: 24px;
                                              padding-top: 18px;
                                              padding-left: 18px !important;
                                              padding-right: 18px !important;
                                              padding-bottom: 0px !important;
                                              mso-line-height-rule: exactly;
                                              mso-padding-alt: 18px 18px 0px
                                                18px;
                                            "
                                          >
                                            <font
                                              style="vertical-align: inherit;"
                                            >
                                              <font
                                                style="vertical-align: inherit;"
                                              >
                                                Order
                                                <a
                                                  style="
                                                    color: #3f60e7 !important;
                                                  "
                                                  href=""
                                                  >#${order._id}</a
                                                >
                                                - ${formatDate(order.orderDate)}
                                              </font>
                                            </font>
                                          </td>
                                        </tr>
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="0"
                                          width="100%"
                                          style="
                                            padding-top: 18px;
                                            padding-left: 18px !important;
                                            padding-right: 18px !important;
                                            padding-bottom: 0px !important;
                                          "
                                        >
                                          <tbody>
                                          ${Object.keys(order.cart).map(
                                            (curr) => {
                                              return `
                                              <tr>
                                                <td width="25%" valign="top">
                                                  <span
                                                    style="
                                                      font-weight: normal;
                                                      margin: 4px 0;
                                                      font-size: 15px;
                                                      line-height: 21px;
                                                      font-family: 'Helvetica Neue',
                                                        Helvetica, Arial,
                                                        sans-serif;
                                                      color: #6f7287;
                                                      font-weight: normal;
                                                    "
                                                  >
                                                    ${order.firstName} ${
                                                order.lastName
                                              }
                                                  </span>
                                                </td>
                                                <td width="50%" valign="top">
                                                  <span
                                                    style="
                                                      font-weight: normal;
                                                      margin: 4px 0;
                                                      font-size: 15px;
                                                      line-height: 21px;
                                                      font-family: 'Helvetica Neue',
                                                        Helvetica, Arial,
                                                        sans-serif;
                                                      color: #6f7287;
                                                      font-weight: normal;
                                                    "
                                                  >
                                                    ${
                                                      order.cart[curr].quantity
                                                    } x
                                                  </span>
  
                                                  <span
                                                    style="
                                                      font-weight: normal;
                                                      margin: 4px 0;
                                                      font-size: 15px;
                                                      line-height: 21px;
                                                      font-family: 'Helvetica Neue',
                                                        Helvetica, Arial,
                                                        sans-serif;
                                                      color: #1e0a3c;
                                                      font-weight: 600;
                                                    "
                                                  >
                                                   ${curr} Ticket
                                                  </span>
                                                </td>
                                                <td
                                                  width="20%"
                                                  align="right"
                                                  valign="top"
                                                  style="text-align: right;"
                                                >
                                                  <span
                                                    style="
                                                      font-weight: normal;
                                                      margin: 4px 0;
                                                      font-size: 15px;
                                                      line-height: 21px;
                                                      font-family: 'Helvetica Neue',
                                                        Helvetica, Arial,
                                                        sans-serif;
                                                      color: #6f7287;
                                                      font-weight: normal;
                                                    "
                                                  >
                                                    ${formatPrice(
                                                      order.cart[
                                                        curr
                                                      ].price.toString()
                                                    )}
                                                  </span>
                                                </td>
                                              </tr><tr>
                                              <td
                                                style="
                                                  line-height: 6px;
                                                  font-size: 6px;
                                                  background-color: #ffffff;
                                                "
                                                width="600"
                                                height="6"
                                              >
                                                <table
                                                  style="
                                                    line-height: 6px;
                                                    font-size: 6px;
                                                    height: 6px;
                                                    border-collapse: collapse;
                                                    border-spacing: 0;
                                                    border: 0;
                                                    padding: 0;
                                                    width: 100%;
                                                  "
                                                  cellspacing="0"
                                                  cellpadding="0"
                                                  height="6"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          line-height: 12px;
                                                          font-size: 12px;
                                                          height: 12px;
                                                        "
                                                        height="12"
                                                        bgcolor=""
                                                      ></td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                            `;
                                            }
                                          )}
                                          <tr>
                                          <td
                                            class="td-padding"
                                            align="left"
                                            style="
                                              font-family: -apple-system,
                                                BlinkMacSystemFont, avenir next,
                                                avenir, helvetica neue,
                                                helvetica, ubuntu, roboto, noto,
                                                segoe ui, arial, sans-serif;
                                              color: #212121 !important;
                                              font-size: 16px;
                                              line-height: 20px;
                                              padding-left: 18px !important;
                                              padding-right: 18px !important;
                                              padding-bottom: 0px !important;
                                              mso-line-height-rule: exactly;
                                              mso-padding-alt: 18px 18px 0px
                                                18px;
                                            "
                                          >
                                            <font
                                              style="vertical-align: inherit;"
                                            >
                                              <font
                                                style="vertical-align: inherit;"
                                                >${formatPrice(
                                                  order.total.toString(),
                                                  true
                                                )}
                                              </font></font
                                            >
                                          </td>
                                        </tr>
                                       
                                          </tbody>
                                        </table>

                                        <!-- END BODY COPY -->
                                        <!-- BUTTON -->
                                        <tr>
                                          <td
                                            align="left"
                                            style="
                                              padding: 18px 18px 18px 18px;
                                              mso-alt-padding: 18px 18px 18px
                                                18px !important;
                                            "
                                          >
                                            <table
                                              width="100%"
                                              border="0"
                                              cellspacing="0"
                                              cellpadding="0"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    <table
                                                      border="0"
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            align="left"
                                                            style="
                                                              border-radius: 3px;
                                                            "
                                                            bgcolor="#234688"
                                                          >
                                                            <a
                                                              class="button raised"
                                                              href="https://socialticketing.io/dashboard/manage/${event._id}/order/${order._id}"
                                                              target="_blank"
                                                              style="
                                                                font-size: 14px;
                                                                line-height: 14px;
                                                                font-weight: 500;
                                                                font-family: Helvetica,
                                                                  Arial,
                                                                  sans-serif;
                                                                color: #ffffff;
                                                                text-decoration: none;
                                                                border-radius: 3px;
                                                                padding: 10px
                                                                  25px;
                                                                border: 1px
                                                                  solid #234688;
                                                                display: inline-block;
                                                              "
                                                              ><font
                                                                style="
                                                                  vertical-align: inherit;
                                                                "
                                                                ><font
                                                                  style="
                                                                    vertical-align: inherit;
                                                                  "
                                                                  >TICKETS</font
                                                                ></font
                                                              ></a
                                                            >
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <!-- END BUTTON -->
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <!-- END CARD 2 -->

        <!-- START COLUMNS -->
        <tr>
          <td
            width="100%"
            valign="top"
            align="center"
            class="padding-container"
          >
            <table
              width="600"
              cellpadding="0"
              cellspacing="0"
              border="0"
              align="center"
              class="wrapper"
              bgcolor="#eeeeee"
              style="max-width: 600px;"
            >
              <tbody>
                <tr>
                  <td width="100%" align="center">
                    <table
                      width="600"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      class="container"
                    >
                      <!-- 2 COLUMNS -->
                      <tbody>
                        <tr>
                          <td
                            align="center"
                            class="wrapper"
                            style="max-width: 600px !important;"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                            >
                              <tbody>
                                <tr>
                                  <td>
                                    <!-- LEFT COLUMN -->
                                    <table
                                      align="left"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="stack"
                                      width="290px"
                                      bgcolor="#eeeeee"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="padding: 0px 0px 18px 0px;"
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              class="card-1"
                                              style="
                                                border-bottom: 2px solid #d4d4d4;
                                              "
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    class="ripplelink"
                                                    align="left"
                                                    width="600"
                                                  >
                                                    <img
                                                      src="http://paulgoddarddesign.com/emails/images/material-design/material-header-4.jpg"
                                                      width="600"
                                                      style="
                                                        border-radius: 3px 3px
                                                          0px 0px;
                                                        display: block;
                                                        border: 0px;
                                                        width: 100%;
                                                        max-width: 600px;
                                                      "
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    bgcolor="#ffffff"
                                                    class="td-padding"
                                                    align="left"
                                                    style="
                                                      font-family: -apple-system,
                                                        BlinkMacSystemFont,
                                                        avenir next, avenir,
                                                        helvetica neue,
                                                        helvetica, ubuntu,
                                                        roboto, noto, segoe ui,
                                                        arial, sans-serif;
                                                      color: #212121 !important;
                                                      font-size: 24px;
                                                      line-height: 30px;
                                                      padding-top: 18px;
                                                      padding-left: 18px !important;
                                                      padding-right: 18px !important;
                                                      padding-bottom: 0px !important;
                                                      mso-line-height-rule: exactly;
                                                      mso-padding-alt: 18px 18px
                                                        0px 13px;
                                                    "
                                                  >
                                                    <font
                                                      style="
                                                        vertical-align: inherit;
                                                      "
                                                      ><font
                                                        style="
                                                          vertical-align: inherit;
                                                        "
                                                      >
                                                        Questions about this
                                                        event?
                                                      </font></font
                                                    >
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    bgcolor="#ffffff"
                                                    class="td-padding"
                                                    align="left"
                                                    style="
                                                      font-family: -apple-system,
                                                        BlinkMacSystemFont,
                                                        avenir next, avenir,
                                                        helvetica neue,
                                                        helvetica, ubuntu,
                                                        roboto, noto, segoe ui,
                                                        arial, sans-serif;
                                                      color: #212121 !important;
                                                      font-size: 16px;
                                                      line-height: 24px;
                                                      padding-top: 18px;
                                                      padding-left: 18px !important;
                                                      padding-right: 18px !important;
                                                      padding-bottom: 0px !important;
                                                      mso-line-height-rule: exactly;
                                                      mso-padding-alt: 18px 18px
                                                        0px 18px;
                                                    "
                                                  >
                                                    <font
                                                      style="
                                                        vertical-align: inherit;
                                                      "
                                                      ><font
                                                        style="
                                                          vertical-align: inherit;
                                                        "
                                                      >
                                                        Contact the organizer
                                                      </font></font
                                                    >
                                                  </td>
                                                </tr>
                                                <!-- END BODY COPY -->
                                                <!-- BUTTON -->
                                                <tr>
                                                  <td
                                                    bgcolor="#ffffff"
                                                    align="left"
                                                    style="
                                                      padding: 18px 18px 18px
                                                        18px;
                                                      mso-alt-padding: 18px 18px
                                                        18px 18px !important;
                                                    "
                                                  >
                                                    <table
                                                      width="100%"
                                                      border="0"
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td>
                                                            <table
                                                              border="0"
                                                              cellspacing="0"
                                                              cellpadding="0"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    align="left"
                                                                    style="
                                                                      border-radius: 3px;
                                                                    "
                                                                    bgcolor="#fc3f1e"
                                                                  >
                                                                    <a
                                                                      class="button raised"
                                                                      href="http://paulgoddarddesign.com/email-marketing"
                                                                      target="_blank"
                                                                      style="
                                                                        font-size: 14px;
                                                                        line-height: 14px;
                                                                        font-weight: 500;
                                                                        font-family: Helvetica,
                                                                          Arial,
                                                                          sans-serif;
                                                                        color: #ffffff;
                                                                        text-decoration: none;
                                                                        border-radius: 3px;
                                                                        padding: 10px
                                                                          25px;
                                                                        border: 1px
                                                                          solid
                                                                          #fc3f1e;
                                                                        display: inline-block;
                                                                      "
                                                                      ><font
                                                                        style="
                                                                          vertical-align: inherit;
                                                                        "
                                                                        ><font
                                                                          style="
                                                                            vertical-align: inherit;
                                                                          "
                                                                          >Contact</font
                                                                        ></font
                                                                      ></a
                                                                    >
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <!-- END BUTTON -->
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!-- END LEFT -->

                                    <!-- RIGHT COLUMN -->
                                    <table
                                      align="right"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="stack"
                                      width="290px"
                                      bgcolor="#eeeeee"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="padding: 0px 0px 18px 0px;"
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              class="card-1"
                                              style="
                                                border-bottom: 2px solid #d4d4d4;
                                              "
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    class="ripplelink"
                                                    align="left"
                                                    width="600"
                                                  >
                                                    <img
                                                      src="http://paulgoddarddesign.com/emails/images/material-design/material-header-5.jpg"
                                                      width="600"
                                                      style="
                                                        border-radius: 3px 3px
                                                          0px 0px;
                                                        display: block;
                                                        border: 0px;
                                                        width: 100%;
                                                        max-width: 600px;
                                                      "
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    bgcolor="#ffffff"
                                                    class="td-padding"
                                                    align="left"
                                                    style="
                                                      font-family: -apple-system,
                                                        BlinkMacSystemFont,
                                                        avenir next, avenir,
                                                        helvetica neue,
                                                        helvetica, ubuntu,
                                                        roboto, noto, segoe ui,
                                                        arial, sans-serif;
                                                      color: #212121 !important;
                                                      font-size: 24px;
                                                      line-height: 30px;
                                                      padding-top: 18px;
                                                      padding-left: 18px !important;
                                                      padding-right: 18px !important;
                                                      padding-bottom: 0px !important;
                                                      mso-line-height-rule: exactly;
                                                      mso-padding-alt: 18px 18px
                                                        0px 13px;
                                                    "
                                                  >
                                                    <font
                                                      style="
                                                        vertical-align: inherit;
                                                      "
                                                      ><font
                                                        style="
                                                          vertical-align: inherit;
                                                        "
                                                      >
                                                        right Column
                                                      </font></font
                                                    >
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    bgcolor="#ffffff"
                                                    class="td-padding"
                                                    align="left"
                                                    style="
                                                      font-family: -apple-system,
                                                        BlinkMacSystemFont,
                                                        avenir next, avenir,
                                                        helvetica neue,
                                                        helvetica, ubuntu,
                                                        roboto, noto, segoe ui,
                                                        arial, sans-serif;
                                                      color: #212121 !important;
                                                      font-size: 16px;
                                                      line-height: 24px;
                                                      padding-top: 18px;
                                                      padding-left: 18px !important;
                                                      padding-right: 18px !important;
                                                      padding-bottom: 0px !important;
                                                      mso-line-height-rule: exactly;
                                                      mso-padding-alt: 18px 18px
                                                        0px 18px;
                                                    "
                                                  >
                                                    <font
                                                      style="
                                                        vertical-align: inherit;
                                                      "
                                                      ><font
                                                        style="
                                                          vertical-align: inherit;
                                                        "
                                                      >
                                                        However, to explain to
                                                        you how all this
                                                        mistaken idea of
                                                        ​​denouncing pleasure
                                                        and praising pain.
                                                      </font></font
                                                    >
                                                  </td>
                                                </tr>
                                                <!-- END BODY COPY -->
                                                <!-- BUTTON -->
                                                <tr>
                                                  <td
                                                    bgcolor="#ffffff"
                                                    align="left"
                                                    style="
                                                      padding: 18px 18px 18px
                                                        18px;
                                                      mso-alt-padding: 18px 18px
                                                        18px 18px !important;
                                                    "
                                                  >
                                                    <table
                                                      width="100%"
                                                      border="0"
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td>
                                                            <table
                                                              border="0"
                                                              cellspacing="0"
                                                              cellpadding="0"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    align="left"
                                                                    style="
                                                                      border-radius: 3px;
                                                                    "
                                                                    bgcolor="#25e47a"
                                                                  >
                                                                    <a
                                                                      class="button raised"
                                                                      href="http://paulgoddarddesign.com/email-marketing"
                                                                      target="_blank"
                                                                      style="
                                                                        font-size: 14px;
                                                                        line-height: 14px;
                                                                        font-weight: 500;
                                                                        font-family: Helvetica,
                                                                          Arial,
                                                                          sans-serif;
                                                                        color: #ffffff;
                                                                        text-decoration: none;
                                                                        border-radius: 3px;
                                                                        padding: 10px
                                                                          25px;
                                                                        border: 1px
                                                                          solid
                                                                          #25e47a;
                                                                        display: inline-block;
                                                                      "
                                                                      ><font
                                                                        style="
                                                                          vertical-align: inherit;
                                                                        "
                                                                        ><font
                                                                          style="
                                                                            vertical-align: inherit;
                                                                          "
                                                                          >BUTTON</font
                                                                        ></font
                                                                      ></a
                                                                    >
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <!-- END BUTTON -->
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!-- END RIGHT -->
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <!-- END 2 COLUMNS -->
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <!-- END COLUMNS -->

        <!-- SPACER -->
        <!--[if gte mso 9]>
      <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
        <tr>
          <td align="center" valign="top" width="600" height="18">
            <![endif]-->
        <tr>
          <td height="18px"></td>
        </tr>
        <!--[if gte mso 9]>
          </td>
        </tr>
      </table>
      <![endif]-->
        <!-- END SPACER -->

        <!-- FOOTER -->
        <tr>
          <td
            width="100%"
            valign="top"
            align="center"
            class="padding-container"
          >
            <table
              width="600"
              cellpadding="0"
              cellspacing="0"
              border="0"
              align="center"
              class="wrapper"
            >
              <tbody>
                <tr>
                  <td width="100%" valign="top" align="center">
                    <table
                      width="600"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      align="center"
                      class="wrapper"
                      bgcolor="#eeeeee"
                    >
                      <tbody>
                        <tr>
                          <td align="center">
                            <table
                              width="600"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              class="container"
                            >
                              <tbody>
                                <tr>
                                  <!-- SOCIAL -->
                                  <td
                                    align="center"
                                    width="300"
                                    style="
                                      padding-top: 0px !important;
                                      padding-bottom: 18px !important;
                                      mso-padding-alt: 0px 0px 18px 0px;
                                    "
                                  >
                                    <table
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            align="right"
                                            valign="top"
                                            class="social"
                                          >
                                            <a href="#" target="_blank">
                                              <img
                                                src="http://paulgoddarddesign.com/emails/images/material-design/fb-icon.png"
                                                height="24"
                                                alt="facebook"
                                                border="0"
                                                style="
                                                  display: block;
                                                  max-width: 24px;
                                                "
                                              />
                                            </a>
                                          </td>
                                          <td width="20"></td>
                                          <td
                                            align="right"
                                            valign="top"
                                            class="social"
                                          >
                                            <a href="#" target="_blank">
                                              <img
                                                src="http://paulgoddarddesign.com/emails/images/material-design/twitter-icon.png"
                                                height="24"
                                                alt="twitter"
                                                border="0"
                                                style="
                                                  display: block;
                                                  max-width: 24px;
                                                "
                                              />
                                            </a>
                                          </td>
                                          <td width="20"></td>
                                          <td
                                            align="right"
                                            valign="top"
                                            class="social"
                                          >
                                            <a href="#" target="_blank">
                                              <img
                                                src="http://paulgoddarddesign.com/emails/images/material-design/linkedin-icon.png"
                                                height="24"
                                                alt="LinkedIn"
                                                border="0"
                                                style="
                                                  display: block;
                                                  max-width: 24px;
                                                "
                                              />
                                            </a>
                                          </td>
                                          <td width="20"></td>
                                          <td
                                            align="right"
                                            valign="top"
                                            class="social"
                                          >
                                            <a href="#" target="_blank">
                                              <img
                                                src="http://paulgoddarddesign.com/emails/images/material-design/instagram-icon.png"
                                                height="24"
                                                alt="instagram"
                                                border="0"
                                                style="
                                                  display: block;
                                                  max-width: 24px;
                                                "
                                              />
                                            </a>
                                          </td>
                                          <td width="20"></td>
                                          <td
                                            align="right"
                                            valign="top"
                                            class="social"
                                          >
                                            <a href="#" target="_blank">
                                              <img
                                                src="http://paulgoddarddesign.com/emails/images/material-design/youtube-icon.png"
                                                height="24"
                                                alt="YouTube"
                                                border="0"
                                                style="
                                                  display: block;
                                                  max-width: 24px;
                                                "
                                              />
                                            </a>
                                          </td>
                                          <td width="20"></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <!-- END SOCIAL -->
                                </tr>
                                <tr>
                                  <td
                                    class="td-padding"
                                    align="center"
                                    style="
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, avenir next, avenir,
                                        helvetica neue, helvetica, ubuntu,
                                        roboto, noto, segoe ui, arial,
                                        sans-serif;
                                      color: #212121 !important;
                                      font-size: 16px;
                                      line-height: 24px;
                                      padding-top: 0px;
                                      padding-left: 0px !important;
                                      padding-right: 0px !important;
                                      padding-bottom: 0px !important;
                                      mso-line-height-rule: exactly;
                                      mso-padding-alt: 0px 0px 0px 0px;
                                    "
                                  >
                                    <font style="vertical-align: inherit;"
                                      ><font style="vertical-align: inherit;">
                                        © ${getCurrentYear()} TBA, All rights reserved.
                                      </font></font
                                    >
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" bgcolor="#eeeeee">
                                    <a
                                      href="*|UNSUB|*"
                                      target="_blank"
                                      style="
                                        font-size: 12px;
                                        line-height: 14px;
                                        font-weight: 500;
                                        font-family: -apple-system,
                                          BlinkMacSystemFont, avenir next,
                                          avenir, helvetica neue, helvetica,
                                          ubuntu, roboto, noto, segoe ui, arial,
                                          sans-serif;
                                        color: #212121;
                                        text-decoration: underline;
                                        padding: 0px;
                                        border: 1px solid #eeeeee;
                                        display: inline-block;
                                      "
                                      ><font style="vertical-align: inherit;"
                                        ><font style="vertical-align: inherit;"
                                          >unsubscribe</font
                                        ></font
                                      ></a
                                    >
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <!-- FOOTER -->

        <!-- SPACER -->
        <!--[if gte mso 9]>
      <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
        <tr>
          <td align="center" valign="top" width="600" height="36">
            <![endif]-->
        <tr>
          <td height="36px"></td>
        </tr>
        <!--[if gte mso 9]>
          </td>
        </tr>
      </table>
      <![endif]-->
        <!-- END SPACER -->
      </tbody>
    </table>
    <!-- END EMAIL -->
    <div
      style="
        display: none;
        white-space: nowrap;
        font: 15px courier;
        line-height: 0;
      "
    >
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    </div>

    <div class="goog-te-spinner-pos">
      <div class="goog-te-spinner-animation">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="goog-te-spinner"
          width="96px"
          height="96px"
          viewBox="0 0 66 66"
        >
          <circle
            class="goog-te-spinner-path"
            fill="none"
            stroke-width="6"
            stroke-linecap="round"
            cx="33"
            cy="33"
            r="30"
          ></circle>
        </svg>
      </div>
    </div>
  </body>
</html>

`,
};
