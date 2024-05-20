import { Server } from "./Server";

const app = new Server({ use: { logger: true } });

const PORT = Number(process.env.PORT) || 5173;

app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    console.log(body);

    return c.json({ body });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.listen(PORT).then(() => {
  console.log(`Started server on http://localhost:${PORT}`);
});
