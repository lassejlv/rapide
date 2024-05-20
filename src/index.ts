import { Server } from "./Server";

const server = new Server({
  use: {
    logger: true,
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET"],
    },
  },
});

server.get("/", async (c) => {
  return c.json({ message: "Hello, World!" });
});

server.listen(5173).then(() => {
  console.log("Server started!");
});
