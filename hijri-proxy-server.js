// hijri-proxy-server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const API_BASE = 'https://hijri.szgmc.ae/api';

app.get('/api/country_list', async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/country_list`);
    if (!response.ok) throw new Error('Failed to fetch country list');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch country list' });
  }
});

app.get('/api/city_list', async (req, res) => {
  try {
    const { country_id } = req.query;
    const response = await fetch(`${API_BASE}/city_list?country_id=${country_id}`);
    if (!response.ok) throw new Error('Failed to fetch city list');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch city list' });
  }
});

app.get('/api/today_detail', async (req, res) => {
  try {
    const { date } = req.query;
    const response = await fetch(`${API_BASE}/today_detail?date=${date}`);
    if (!response.ok) throw new Error('Failed to fetch today_detail');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch today_detail' });
  }
});

app.get('/api/day_detail', async (req, res) => {
  try {
    const { calendar_id, current_time, city_id } = req.query;
    const url = `${API_BASE}/day_detail?calendar_id=${calendar_id}&current_time=${current_time}&city_id=${city_id}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch day_detail');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch day_detail' });
  }
});

app.get('/', (req, res) => {
  res.send('✅ Hijri Proxy Server is running.');
});

app.listen(PORT, () => {
  console.log(`✅ Hijri proxy server running on http://localhost:${PORT}`);
});
