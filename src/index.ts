import { Server } from "./Server";

const server = new Server({
  port: 5173,
  use: {
    logger: true,
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  },
});

server.get("/", async (c) => {
  const name = c.query.get("name");
  if (!name) return c.json({ message: "Missing name query parameter" }, 400);

  return c.json({ message: `Hello, ${name}!` });
});

server.get("/myfile", (c) => {
  const path = "./src/build.ts";

  return c.sendFile(path);
});

server.get("/not-a-rickroll", (c) => {
  return c.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});

server.start();
