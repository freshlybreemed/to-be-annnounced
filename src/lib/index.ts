import cookie from 'js-cookie';
import moment from 'moment-timezone';
import { TicketProps, EventCartProps } from '../@types/types';
import { useRouter } from 'next/router';
import axios from 'axios';

export const instance = axios.create({
  headers: { Authorization: 'Bearer ' + process.env.API_KEY },
});

export const stripeClient = process.env.STRIPE_DEV_CLIENT;
var yesterday = moment().subtract(1, 'day');

export const validStartDate = (current: any) => current.isAfter(yesterday);

export const validEndDate = (startDate: Date) => (current: any) =>
  current > moment(startDate).subtract(1, 'day');

export const timeConstraints = (endDate: Date) => {
  return { hours: { min: moment(endDate).hour(), max: 24, step: 1 } };
};

export const validTicketEndDate = (startDate: Date) => (current: any) =>
  startDate !== undefined ? current <= moment(startDate).startOf('day') : true;

export const getOrderTicketCount = (cart: {
  [ticketName: string]: EventCartProps;
}) => {
  const tickets = Object.keys(cart).map((curr) => cart[curr]);
  return tickets.reduce((acc, curr) => acc + curr.quantity, 0);
};

export const getTicketsCount = (ticketTypes: {
  [ticketName: string]: TicketProps;
}) => {
  const tickets = Object.keys(ticketTypes).map((curr) => ticketTypes[curr]);
  return tickets.reduce((acc, curr) => acc + curr.quantity, 0);
};
export const getTicketsSold = (ticketTypes: {
  [ticketName: string]: TicketProps;
}) => {
  const tickets = Object.keys(ticketTypes).map((curr) => ticketTypes[curr]);
  return tickets.reduce((acc, curr) => acc + curr.sold, 0);
};

export const setCookie = (key: string, value: string) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: '/',
    });
  }
};

export const removeCookie = (key: string) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key: string, req: any) => {
  return process.browser || !req
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

export const getCookieFromBrowser = (key: string) => {
  return cookie.get(key);
};

const getCookieFromServer = (key: string, req: any) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find((c: any) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};

export const formatDateTimeWithTimeZone = (
  date: Date,
  type = 'short',
  timeZoneId
) => {
  switch (type) {
    case 'medium':
      return moment.tz(date, timeZoneId).format('llll');
    case 'short':
      return moment
        .tz(date, timeZoneId)
        .format('ddd. MMM Do, YYYY [at] h:mm A');
    case 'shorter':
      return moment.tz(date, timeZoneId).format(' MMMM d');
    default:
      return;
  }
};
export const formatDate = (date: Date, type = 'short') => {
  switch (type) {
    case 'medium':
      return moment(date).format('ddd. MMM Do, YYYY [at] h:mm A');
    case 'short':
      return moment(date).format('ddd. MMM Do, YYYY');
    case 'shorter':
      return moment(date).format('MMMM Do');
    default:
      return;
  }
};

export const formatEventDateTime = (
  startDate: Date,
  endDate: Date,
  timeZone: string
) => {
  var nextDay = moment(startDate).tz(timeZone).add(1, 'day');
  return `${moment(startDate).tz(timeZone).format('llll')} - ${
    nextDay.isAfter(endDate)
      ? moment(endDate).tz(timeZone).format('h:mm A z')
      : moment(endDate).tz(timeZone).format('llll z')
  }`;
};
export const formatEventTime = (
  startDate: Date,
  endDate: Date,
  timeZone: string
) => {
  var nextDay = moment(startDate).tz(timeZone).add(1, 'day');
  return `${moment(startDate).tz(timeZone).format('h:mm A')} - ${
    nextDay.isAfter(moment(endDate).tz(timeZone))
      ? moment(endDate).tz(timeZone).format('h:mm A')
      : moment(endDate).tz(timeZone).format('llll')
  }`;
};

export const formatTime = (date: Date, timeZoneId: string) =>
  moment.tz(date, timeZoneId).format('h:mm A');

// Format price
export const formatPrice = (number: string, showNumber: boolean = false) => {
  const fnumber = parseFloat(number);
  if (fnumber === 0 && !showNumber) return 'FREE';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(fnumber);
};

export function getCurrentYear() {
  return new Date().getFullYear();
}

export const redirect = (context, target) => {
  console.log(context, target);
  if (context.res) {
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    useRouter().replace(target);
  }
};
export const slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
  var to = 'aaaaaeeeeiiiioooouuuunc------';

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};
