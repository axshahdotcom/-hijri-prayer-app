const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE = 'https://hijri.szgmc.ae/api';

app.use(cors());

app.get('/', (req, res) => res.send('Hijri API Proxy is working'));

app.get('/api/country_list', async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/country_list`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch country list' });
  }
});

app.get('/api/city_list', async (req, res) => {
  try {
    const { country_id } = req.query;
    const response = await fetch(`${API_BASE}/city_list?country_id=${country_id}`);
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch city list' });
  }
});

app.get('/api/today_detail', async (req, res) => {
  try {
    const { date } = req.query;
    const response = await fetch(`${API_BASE}/today_detail?date=${date}`);
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch today_detail' });
  }
});

app.get('/api/day_detail', async (req, res) => {
  try {
    const { calendar_id, current_time, city_id } = req.query;
    const url = `${API_BASE}/day_detail?calendar_id=${calendar_id}&current_time=${current_time}&city_id=${city_id}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch day_detail' });
  }
});

app.listen(PORT, () => console.log(`✅ Proxy running on http://localhost:${PORT}`));
