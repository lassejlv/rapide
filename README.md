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

## Type-Safe

Everything is type-safe 😎

https://github.com/lassejlv/rapide/assets/77295879/da4486f0-d218-4a2d-bf38-11c394462cd8

## Helpers functions

Easy return something back using build in helper functions

https://github.com/lassejlv/rapide/assets/77295879/82d148e6-0983-478d-891d-57a56851af78

