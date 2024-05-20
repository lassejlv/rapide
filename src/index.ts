import { Server } from "./Server";

const app = new Server({ use: { logger: true } });

const PORT = Number(process.env.PORT) || 5173;

app.get("/", (c) => {
  return c.json({ message: "Hello, World!" });
});

app.get("/user/:id/settings/:chatId", (c) => {
  console.log(c.params);

  return c.json(c.params);
});

app.listen(PORT).then(() => {
  console.log(`Started server on http://localhost:${PORT}`);
});
