import { buffer } from 'micro';
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
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

  // 通過驗證後，你可以進一步解析 JSON 內容
  const events = JSON.parse(body).events;

  for (const event of events) {
    console.log('收到來自 LINE 的事件:', event);
    // 你可以根據 event.type 做進一步處理
  }

  return res.status(200).send('OK');
}


