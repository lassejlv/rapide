import { Server } from "./Server";

const app = new Server({ use: { logger: true, cors: { origin: "*", methods: ["POST"] } } });

const PORT = Number(process.env.PORT) || 5173;

app.get("/", async (c) => {
  const html = await c.readHtml("test.html");

  return c.html(html);
});

app.listen(PORT).then(() => {
  console.log(`Started server on http://localhost:${PORT}`);
});
