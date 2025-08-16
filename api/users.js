import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Hello Bevan, your Node.js API is running (---) 🚀");
});

// Example API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from your Node.js API!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// export default app;

// Export the app for testing purposes
// export { app };