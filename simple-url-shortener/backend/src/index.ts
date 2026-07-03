import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage (simple for testing)
const urls: { [key: string]: string } = {};

app.post('/api/shorten', (req, res) => {
  const { url } = req.body;
  const shortCode = Math.random().toString(36).substring(7);
  urls[shortCode] = url;
  res.json({ shortCode, shortUrl: `http://localhost:3000/${shortCode}` });
});

app.get('/:shortCode', (req, res) => {
  const originalUrl = urls[req.params.shortCode];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.get('/api/urls', (req, res) => {
  res.json(urls);
});

app.listen(3000, () => {
  console.log('✅ API running on http://localhost:3000');
});
