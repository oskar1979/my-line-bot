export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const signature = req.headers['x-line-signature'];
  const body = JSON.stringify(req.body);

  const crypto = require('crypto');
  const hash = crypto
    .createHmac('SHA256', process.env.LINE_CHANNEL_SECRET)
    .update(body)
    .digest('base64');

  if (hash !== signature) {
    return res.status(401).send('Unauthorized');
  }

  // 如果通過驗證，就可以正常處理訊息
  res.status(200).send('OK');
}
