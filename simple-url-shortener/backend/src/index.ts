import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage (simple for testing)
const urls: { [key: string]: string } = {};

app.post('/api/shorten', (req, res) => {
  const { url } = req.body;
  
  // Validate URL
  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  
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

app.listen(5000, () => {
  console.log('✅ API running on http://localhost:5000');
});
