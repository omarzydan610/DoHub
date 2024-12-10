const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
app.use(express.json());

app.use(authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(8081, () => {
  console.log('Server is running on port 8081');
});