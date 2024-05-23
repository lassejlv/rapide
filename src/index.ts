import { Server } from "./Server";

const app = new Server({ use: { logger: true } });

const PORT = Number(process.env.PORT) || 5173;

app.options("/", (c) => {
  return c.html("<h1>Hello, World!</h1>");
});

app.listen(PORT).then(() => {
  console.log(`Started server on http://localhost:${PORT}`);
});
