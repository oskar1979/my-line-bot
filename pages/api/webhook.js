// pages/api/webhook.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('收到 LINE webhook 事件:', req.body);
    res.status(200).json({ message: '事件接收成功' });
  } else {
    res.status(405).json({ message: '只接受 POST 請求' });
  }
}
