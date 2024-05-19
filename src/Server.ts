import { Logger } from "./Logger";
import Router from "./Router";
import type { Handler, Route, Plugins, NotFound, Events } from "./types";

export class Server {
  port: number;
  routes: Route[];
  use?: Plugins;
  whenReady?: Promise<void>;

  constructor({ port, use }: { port: number; use?: Plugins }) {
    this.port = port;
    this.routes = [];
    this.use = use;
    this.whenReady;
  }

  get(path: string, handler: Handler) {
    this.routes.push({ method: "GET", path, handler });
  }

  post(path: string, handler: Handler) {
    this.routes.push({ method: "POST", path, handler });
  }

  put(path: string, handler: Handler) {
    this.routes.push({ method: "PUT", path, handler });
  }

  delete(path: string, handler: Handler) {
    this.routes.push({ method: "DELETE", path, handler });
  }

  notFound(handler: NotFound) {
    this.use = { ...this.use, notFound: handler };
  }

  async start() {
    Bun.serve({
      port: this.port,
      fetch: async (req: Request) => {
        const router = await Router(req);

        for (const route of this.routes) {
          router.route(route.method, route.path, route.handler);
        }

        const originalResponse = await router.run({
          notFound: this.use?.notFound || (() => new Response("Not Found", { status: 404 })),
        });

        this.whenReady = Promise.resolve();

        if (this.use?.logger) {
          const pathname = new URL(req.url).pathname;
          const statusCode = originalResponse.status;
          Logger(pathname, req.method, statusCode);
        }

        return originalResponse;
      },
    });
  }
}
