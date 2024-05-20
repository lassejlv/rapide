import { Server } from "rapidee";

const app = new Server({ use: { logger: false } });

const PORT = Number(process.env.PORT) || 5173;

app.get("/", async (c) => {
  return c.json({ message: "Hello, World!" });
});

app.listen(PORT).then(() => {
  console.log(`Started server on http://localhost:${PORT}`);
});
