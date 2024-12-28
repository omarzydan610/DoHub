const express = require("express");
const cors = require("cors");
const app = express();
const { errorHandler } = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/tasksRoutes");
const userRoutes = require("./routes/userRoutes");
const sseRoutes = require("./routes/sseRoutes");
const tagRoutes = require("./routes/tagsRoutes");
app.use(express.json());

app.use(cors());

app.use(authRoutes);
app.use("/user", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/tags", tagRoutes);
app.use("/sse", sseRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT ?? 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
