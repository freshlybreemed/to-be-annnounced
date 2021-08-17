import { wrapAsync } from './helpers';
import { NextApiRequest } from 'next';
import { EventProps } from '../../src/@types/types';
import algoliasearch from 'algoliasearch';



export default wrapAsync(async (req: NextApiRequest, db: any) => {
  switch ((req.method)) {
    case "POST":
      const event: EventProps = req.body;
      const client = algoliasearch(process.env.ALGOLIA_ID, process.env.ALGOLIA_KEY);
      const index = client.initIndex('events');
      const algoliaEvent = {
        ...event,
        objectID: event._id
      }
      await index
      .partialUpdateObject(algoliaEvent,
        {
          createIfNotExists: true
        })
      .catch((err)=>console.log('error',err));
      await db.collection('user').updateOne({_id: event.organizerId},{$addToSet:{eventIds: event._id}});
      return await db.collection('event').updateOne(
        { slug: event.slug },
        {
          $set: {
            ...req.body,
            publishDate: new Date(event.publishDate),
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),
            updatedAt: new Date(),
          },
        },
        { upsert: true },
      );
    case "GET":
      return await db
      .collection('event')
      .find({})
      .toArray();
    case "DELETE":
      return await db.collection('event').deleteMany();
    default:
      break;
  }
});
