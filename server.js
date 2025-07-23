const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('楽天検索APIへようこそ。例: /rakuten-search?q=青いシャツ');
});

app.get('/rakuten-search', async (req, res) => {
  const appId = 1078956243794572138'; // ←ここは本番用に必ず設定
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
