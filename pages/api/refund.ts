const stripe = require('stripe')(process.env.STRIPE_DEV_SECRET);
import { wrapAsync } from './helpers';
import { NextApiRequest } from 'next';
import { OrderProps, EventProps } from '../../src/@types/types';

const refundOrder = async (order: OrderProps) => {
  const session = await stripe.refunds
    .create({
      payment_intent: order.token.id,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return session;
};

const updateOrder = async (order: OrderProps, event: EventProps, db: any) => {
  order.refunded = true;
  order.status = 'refunded';

  //deduct # of sold tixs
  const tickets = {};
  const { ticketTypes } = event;
  const { cart } = order;
  Object.keys(ticketTypes).forEach((ticket) => {
    const quantity = cart[ticketTypes[ticket].ticketName]
      ? cart[ticketTypes[ticket].ticketName].quantity
      : 0;
    tickets[ticket] = {
      ...ticketTypes[ticket],
      sold: ticketTypes[ticket].sold - quantity,
    };
  });

  const newEvent = {
    ...event,
    tickets: event.tickets.map((curr) => {
      if (curr._id === order._id) {
        return order;
      }
      return curr;
    }),
    ticketTypes: tickets,
    gross: Math.floor(event.gross - order.total * 100),
  };

  await db
    .collection('event')
    .updateOne({ _id: event._id }, { $set: newEvent });
  return await db
    .collection('order')
    .updateOne({ _id: order._id }, { $set: order });
};
export default wrapAsync(async (req: NextApiRequest, db: any) => {
  const { event, order }: { event: EventProps; order: OrderProps } = req.body;

  order.total > 0 && (await refundOrder(order));
  await updateOrder(order, event, db);
  return true;
});
