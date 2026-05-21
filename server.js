const express = require('express');
const app = express();

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// /meetup route using built-in fetch (Node 18+)
app.get('/meetup', async (req, res) => {
  try {
    const response = await fetch('https://www.meetup.com/valencia-social-runners/events/rss/');
    if (!response.ok) {
      return res.status(response.status).send(`Upstream error: ${response.statusText}`);
    }

    const body = await response.text(); // RSS XML
    res.type('application/rss+xml').send(body);
  } catch (err) {
    console.error('Error fetching Meetup RSS:', err);
    res.status(500).send('Error retrieving Meetup feed');
  }
});

// Use PORT from env or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
