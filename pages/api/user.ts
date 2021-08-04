import { wrapAsync } from './helpers';
import { NextApiRequest } from 'next';

const updateUser = async (user: any, db: any) => {
  return await db.collection('user').updateOne(
    { _id: user.firebase.uid },
    {
      $set: { ...user, updatedAt: new Date() },
    },
    { upsert: true, returnOriginal: false }
  );
};

export default wrapAsync(async (req: NextApiRequest, db: any) => {

  switch(req.method){
    case "POST":
      const { data } = req.body;
      return await updateUser(data, db);
    case "GET":
      const { organizerId } = req.query
      const events = await db.collection('event').find({organizerId}).toArray();
      const user = await db.collection('user').find({_id: organizerId}).toArray();
      return { user, events };
  }
});
