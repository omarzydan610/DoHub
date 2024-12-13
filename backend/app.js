const express = require('express');
const app = express();
const { errorHandler } = require("./middlewares/errorHandler");

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require("./routes/tasksRoutes");

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Frontend origin
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allowed headers
  }));
app.use(authRoutes);

app.use("/tasks", taskRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT ?? 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
