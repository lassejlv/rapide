# Rapide

"Rapide" is the french word for "fast". This is a simple, fast, and easy-to-use web server framework for Bun.js.

## Example Usage

```typescript
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
```
