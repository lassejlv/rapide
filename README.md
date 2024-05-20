# Rapide

"Rapide" is the french word for "fast". This is a simple, fast, and easy-to-use web server framework for Bun.js.

## Example Usage

```typescript
import { Server } from "./Server";

const server = new Server({
  use: {
    logger: true,
  },
});

server.get("/", async (c) => {
  return c.json({ message: "Hello, World!" });
});

server.listen(5173).then(() => {
  console.log("Server started!");
});
```

## You know Express.js?

Rapide's syntax is 90% similar to Express.js, so if you have experience with Express.js, you will feel right at home. Rapide is just faster!

## Performance Comparison with Express.js

| Metric              | Rapide (Port 5173) | Express Server (Port 5174) |
| ------------------- | ------------------ | -------------------------- |
| Total Requests      | 1,336,000          | 688,000                    |
| Test Duration       | 10.02 seconds      | 11.02 seconds              |
| Requests per Second | 133,132            | 62,434                     |
| Average Latency     | 0.09 ms            | 1.13 ms                    |
| Max Latency         | 13 ms              | 42 ms                      |
| Average Throughput  | 18 MB/sec          | 13.5 MB/sec                |

### Conclusion

Rapide is approximately **2.13 times faster** than the Express server in handling requests.

## Type-Safe

Everything is type-safe 😎

https://github.com/lassejlv/rapide/assets/77295879/da4486f0-d218-4a2d-bf38-11c394462cd8

## Helper functions

Easy return something back using build in helper functions

https://github.com/lassejlv/rapide/assets/77295879/82d148e6-0983-478d-891d-57a56851af78
