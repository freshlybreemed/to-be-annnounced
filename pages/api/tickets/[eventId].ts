import { wrapAsync } from '../helpers';
import { NextApiRequest } from 'next';

export default wrapAsync(async (req: NextApiRequest, db: any) => {
  const { eventId } = req.query;
  return await db
    .collection('order')
    .find({
      eventId,
    })
    .toArray();
});
