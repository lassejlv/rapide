import { Server } from "./Server";

const server = new Server({
  port: 5173,
  use: {
    logger: true,
  },
});

server.get("/", async (c) => {
  const name = c.query.get("name");
  if (!name) return c.json({ message: "Missing name query parameter" }, 400);

  return c.json({ message: `Hello, ${name}!` });
});

server.start();