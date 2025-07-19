export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('✅ 收到 LINE Webhook 請求');
    console.log(JSON.stringify(req.body, null, 2));
    res.status(200).send('OK');
  } else {
    res.status(405).send('Method Not Allowed');
  }
}

