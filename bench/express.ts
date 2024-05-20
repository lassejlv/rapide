import express from "express";

const app = express();

const PORT = Number(process.env.PORT) || 5174;

app.get("/", async (req, res) => {
  return res.json({ message: "Hello, World!" });
});

app.listen(PORT, () => {
  console.log(`Started server on http://localhost:${PORT}`);
});
