import { Server } from "./Server";

const app = new Server({ use: { logger: true } });

const PORT = Number(process.env.PORT) || 5173;

app.get("/", (c) => {
  return c.error("Hello, World!", 302);
});

app.listen(PORT).then(() => {
  console.log(`Started server on http://localhost:${PORT}`);
});
