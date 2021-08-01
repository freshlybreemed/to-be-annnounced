import { sendEmail, wrapAsync } from './helpers';
import { OrderProps, EventProps } from '../../src/@types/types';
import { NextApiRequest } from 'next';

const updateTixCount = async (
  order: OrderProps,
  event: EventProps,
  db: any
) => {
  let ops = { gross: Math.floor(order.total * 100) };
  Object.keys(order.cart).forEach((curr) => {
    ops[`ticketTypes.${order.cart[curr]._id}.sold`] = order.cart[curr].quantity;
  });

  order.orderDate = new Date(order.orderDate);
  await db.collection('order').insertOne(order);

  return await db.collection('event').updateOne(
    { slug: event.slug },
    {
      $inc: ops,

      $push: {
        tickets: {
          $each: [order],
          $sort: { date: 1 },
        },
      },
    }
  );
};

export default wrapAsync(async (req: NextApiRequest, db: any) => {
  const { event, order }: { event: EventProps; order: OrderProps } = req.body;
  await updateTixCount(order, event, db);
  await sendEmail([order.emailAddress], event, order);
  return true;
});
