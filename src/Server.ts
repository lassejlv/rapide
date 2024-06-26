import chalk from "chalk";
import { Logger } from "./Logger";
import Router from "./Router";
import type { Handler, Route, Plugins, NotFound } from "./types";
import { version } from "../package.json";

const start = Date.now();

export class Server {
  routes: Route[];
  use?: Plugins;

  constructor({ use }: { use?: Plugins }) {
    this.routes = [];
    this.use = use;
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

  patch(path: string, handler: Handler) {
    this.routes.push({ method: "PATCH", path, handler });
  }

  delete(path: string, handler: Handler) {
    this.routes.push({ method: "DELETE", path, handler });
  }

  options(path: string, handler: Handler) {
    this.routes.push({ method: "OPTIONS", path, handler });
  }

  notFound(handler: NotFound) {
    this.use = { ...this.use, notFound: handler };
  }

  async listen(port: number) {
    if (this.use?.logger && !this.use.removeSystemLogs) {
      console.log(chalk.bold(`Using Rapide v${version}`));
      console.log(chalk.bold.blue(`Enabled plugins: ${chalk.hex("#18191a")(Object.keys(this.use).join(", "))}`));
    }

    Bun.serve({
      port: port,
      fetch: async (req: Request) => {
        const start = Date.now();
        const router = await Router(req);

        for (const route of this.routes) {
          router.route(route.method, route.path, route.handler);
        }

        const originalResponse = await router.run({
          notFound: this.use?.notFound || (() => new Response("Not Found", { status: 404 })),
        });

        if (this.use?.logger) {
          const pathname = new URL(req.url).pathname;
          const statusCode = originalResponse.status;
          Logger(pathname, req.method, statusCode, start);
        }

        if (this.use?.cors?.origin) {
          originalResponse.headers.set("Access-Control-Allow-Origin", this.use.cors.origin);
          originalResponse.headers.set("Access-Control-Allow-Methods", this.use.cors.methods.join(","));
          originalResponse.headers.set("X-Powered-By", "Rapide");
        }

        // Add custom header
        originalResponse.headers.set("X-Powered-By", "Rapide");

        return originalResponse;
      },
    });
  }
}
