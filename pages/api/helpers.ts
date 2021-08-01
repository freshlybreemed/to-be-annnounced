const connect = require('./db');
const cors = require('micro-cors')();
const nodemailer = require('nodemailer');
const pdf = require('html-pdf');

import { EventProps, OrderProps } from '../../src/@types/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { ticketTemplate } from './ticketTemplate';
import { emailTemplates } from './emailTemplates';

export const dev = false;

export const wrapAsync = (handler: any) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const db = await connect();
  return cors(
    handler(req, db)
      .then((result: any) => {
        res.setHeader(
          'cache-control',
          's-maxage=1 maxage=0, stale-while-revalidate'
        );
        return res.send(result);
      })
      .catch((error: any) => res.status(500).json({ error: error.message }))
  );
};

export const createDigitalTicket = (order, event) => {
  return new Promise((resolve, reject) => {
    const tixTemplate = ticketTemplate.content(order, event);
    pdf.create(tixTemplate).toStream((err, buffer: Buffer) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      return resolve(buffer);
    });
  });
};

export const sendEmail = async (
  emails: string[],
  event: EventProps,
  order: OrderProps
) => {
  try {
    // Generate test SMTP service account from ethereal.email
    await createDigitalTicket(order, event).then(async (tix: any) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = await nodemailer.createTransport({
        service: 'SendPulse', 
        auth: {
          user: 'chickenandmumbosauce@gmail.com', // generated ethereal user
          pass: process.env.SENDPULSE, // generad ethereal password
        },
      });
      const message = emailTemplates.content(event, order);
      await transporter.sendMail({
        from: `info@socialticketing.io`, // sender address
        to: emails, // list of receivers
        subject: emailTemplates.subject(event.name), // Subject line
        text: message, // plain text body
        html: message, // html body
        attachments: [
          {
            filename: 'tickets.pdf',
            content: tix,
          },
        ],
      });
      return message;
    });
  } catch (error) {
    console.error('error email',error);
  }
};

export const stripeSecret = dev
  ? process.env.STRIPE_SECRET_DEV
  : process.env.STRIPE_SECRET_PROD;
