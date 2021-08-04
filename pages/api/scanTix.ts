import { wrapAsync } from './helpers';
import { OrderProps, EventProps } from '../../src/@types/types';
import { NextApiRequest } from 'next';

const updateOrder = async (
  order: OrderProps,
  event: EventProps,
  db: any
) => {
  await db
    .collection('event')
    .updateOne({ _id: event._id }, { $set: event });
  return await db
    .collection('order')
    .updateOne({ _id: order._id }, { $set: order });  
};

export default wrapAsync(async (req: NextApiRequest, db: any) => {
  const { event, order }: { event: EventProps; order: OrderProps } = req.body;
  await updateOrder(order, event, db);
  return true;
});
