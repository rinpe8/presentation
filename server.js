const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const APP_ID = process.env.APP_ID; // ←ここに注目！

app.use(cors());

app.get('/rakuten-search', async (req, res) => {
  const keyword = req.query.q;
  if (!keyword) return res.status(400).send('キーワード必須');

  const endpoint = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&applicationId=${APP_ID}&keyword=${encodeURIComponent(keyword)}&hits=10`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('検索失敗');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
