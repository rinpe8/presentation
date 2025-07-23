const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// 楽天のアプリケーションID（取得したものをここに入れる）
const appId = '1078956243794572138'; // ←これが有効ならOK

app.get('/', (req, res) => {
  res.send('楽天検索APIへようこそ。例: /rakuten-search?q=青いシャツ');
});

app.get('/rakuten-search', async (req, res) => {
  const query = req.query.q || '';
  const endpoint = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&applicationId=${appId}&keyword=${encodeURIComponent(query)}&hits=10`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: '楽天APIへの接続に失敗しました' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
