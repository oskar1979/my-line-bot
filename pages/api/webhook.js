export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log("收到 LINE 的訊息：", req.body);
    res.status(200).send('OK');
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
