import { buffer } from 'micro';
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const buf = await buffer(req);
  const body = buf.toString();
  const signature = req.headers['x-line-signature'];

  const hash = crypto
    .createHmac('SHA256', process.env.LINE_CHANNEL_SECRET)
    .update(body)
    .digest('base64');

  if (hash !== signature) {
    return res.status(401).send('Unauthorized');
  }

  // 成功的 response
  res.status(200).send('OK');
}
